import React, { Component } from 'react';
import './App.css';
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';

class QuillEditor extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      changes: [],
    };
    this.onChange = this.onChange.bind(this);
    this.showChanges = this.showChanges.bind(this);
  }

  onChange(editorState) {
    this.setState({editorState});
    this.showChanges();
  }

  componentDidMount(){
    // console.log('the hairy iussue of editing')
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromText(this.props.seedText))
    })
  }


  getChangeStartIdx(ref, curState) {
    var h = 0;
    while (ref[h] === curState[h] && h < curState.length) {
      h++;
    }
    return h
  }

  showChanges() {
    let finalText = this.state.editorState.getCurrentContent().getPlainText()
    var stack = this.state.editorState.getUndoStack();
    var cur = stack._head;

    if (!cur) {
      return 'no changes'
    }

    var textStateAry = [{
      text: finalText,
      changeSnippet: finalText.substr(this.getChangeStartIdx(cur.value.getPlainText(), finalText) - 10, 30)
    }];

    while (cur.next) {
      let curText = cur.value.getPlainText();
      let nextText = cur.next.value.getPlainText();

      textStateAry.push({
        text: curText,
        changeSnippet: curText.substr(this.getChangeStartIdx(nextText, curText) - 10, 30)
      })
      cur = cur.next
    }
    textStateAry.forEach( (o) => {
      console.log(o.changeSnippet);
    });
    this.setState({changes: textStateAry});
    return textStateAry;
  }

  render() {
    const {editorState} = this.state;

    return (
      <div className="App">
        <div className="prompt"> Please Edit Your Text </div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
        />

          { this.state.changes[0] ?
            <ul className="changeList">
              {this.state.changes.map((changeLog, k) => {
                return <li key={k}> "...{changeLog.changeSnippet}..."</li>
              })}
            </ul>
          : <span> You didn't make any changes!!! </span>
          }
      </div>
    );
  }
}


export default QuillEditor;
