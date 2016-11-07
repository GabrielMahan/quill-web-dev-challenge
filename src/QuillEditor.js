import React from 'react';
import './App.css';
import {Editor, EditorState, ContentState} from 'draft-js';

// Again uses the DraftJS Editor, but also diffs text for use in categorization

class QuillEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      diffData: []
    };
    this.onChange = this.onChange.bind(this);
    this.compileChanges = this.compileChanges.bind(this);
    this.sendUp = () => this.props.changeMode({diffData: this.state.diffData, editorState: this.state.editorState});
    this.diff = require('diff');
  }

  componentDidMount(){
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromText(this.props.seedText))
    })
  }
  onChange(editorState) {
    // Handles changes to the editor state and sets a custom style so the user sees their changes in a different color
    let currentStyle = editorState.getCurrentInlineStyle();
    this.setState({editorState: EditorState.setInlineStyleOverride(editorState, currentStyle.add('EDITS'))});
    this.compileChanges();
  }

  compileChanges() {
    let before = this.props.seedText;
    let after = this.state.editorState.getCurrentContent().getPlainText();

    // diffs text using diff package
    let diffData = this.diff.diffWords(before, after);
    this.setState({diffData: diffData});
  }

  render() {
    const {editorState} = this.state;
    const styleMap = {'EDITS': { color: 'darkorchid', fontWeight: 'bold'},};
    return (
      <div className="App">
        <div className="prompt editAlert" id="editPrompt"> Please edit your text before moving on! </div>
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={this.onChange}
        />
      <button onClick={this.sendUp} className="next-button editAlert"> next 	&#8594;</button>
      </div>
    );
  }
}


export default QuillEditor;
