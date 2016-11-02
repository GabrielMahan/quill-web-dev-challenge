

import React, { Component } from 'react';
import './App.css';
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      changes: [],
      editMode: false
    };
    this.onChange = this.onChange.bind(this);
    this.showChanges = this.showChanges.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
  }

  onChange(editorState) {
    this.showChanges();
    this.setState({editorState});
  }

  enableEdit() {
    this.setState({
      editMode: true,
      editorState: EditorState.createWithContent(ContentState.createFromText(this.state.editorState.getCurrentContent().getPlainText()))
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
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          placeholder="Please write some text!"
          />

        {this.state.editMode ?
          <div>
            <span> Please make edits to your text! </span>
            { this.state.changes[0] ?
              <ul className="changeList">
                {this.state.changes.map((changeLog, k) => {
                  return <li key={k}> "...{changeLog.changeSnippet}..."</li>
                })}
              </ul>
            : null
            }
          </div>
        : <button className="next-button" onClick={this.enableEdit}> Next -> </button>
        }

      </div>
    );
  }
}


export default App;
