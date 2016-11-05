import React, { Component } from 'react';
import './App.css';
import {Editor, EditorState, RichUtils, ContentState, Modifier} from 'draft-js';

class QuillEditor extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      changes: [],
      diffData: []
    };
    this.onChange = this.onChange.bind(this);
    this.showChanges = this.showChanges.bind(this);
    this.sendUp = () => this.props.changeMode(this.state.changes)
    this.diff = require('diff')
  }

  onChange(editorState) {
    let currentStyle = editorState.getCurrentInlineStyle();
    this.setState({editorState: EditorState.setInlineStyleOverride(editorState, currentStyle.add('SPECIAL'))})
    this.showChanges();
  }

  showChanges() {
    let before = this.props.seedText;
    let after = this.state.editorState.getCurrentContent().getPlainText();
    let diffData = this.diff.diffChars(before, after)
    this.setState({diffData: diffData});

    function wasChanged(value) {
      return value.added || value.removed
    }
    let changes = diffData.filter(wasChanged)
    console.log(changes)
    this.setState({changes: changes})
  }

  componentDidMount(){
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromText(this.props.seedText))
    })
  }



  render() {
    const {editorState} = this.state;
    const styleMap = {'SPECIAL': { color: 'darkorchid', fontWeight: 'bold'},};
    return (
      <div className="App">
        <div className="prompt"> Please Edit Your Text </div>
        <Editor
          ref="editor"
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
        />
        <button onClick={this.sendUp } > next </button>
      </div>
    );
  }
}


export default QuillEditor;
