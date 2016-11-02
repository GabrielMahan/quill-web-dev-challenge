// import logo from './logo.svg';
// import {Editor, EditorState, RichUtils, ContentState, convertFromHTML, Draft} from 'draft-js';


import React, { Component } from 'react';
import './App.css';
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';


class App extends Component {
  constructor() {
    super();
    // debugger;
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(seedText)),
      changes: [],
      seedText: "please type text"
    };
    this.onChange = this.onChange.bind(this)
    this.showChanges = this.showChanges.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  onChange(editorState) {
    this.showChanges();
    this.setState({editorState});
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
        <button onClick={this._onBoldClick.bind(this)}>Make selected text Bold</button>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          />
          {this.state.changes[0] ?
            <ul className="changeList">
              {this.state.changes.map((changeLog, k) => {
                return <li key={k}> "...{changeLog.changeSnippet}..."</li>
              })}
            </ul>
          : null
        }
      </div>
    );
  }
}

// <button className="showChanges-button" onClick={this.showChanges}> Show Changes </button>
//   // {this.state.changes.map((log) => {
  //   return <li> {log.changeSnippet} </li>
  // })}

  // handleKeyCommand(command) {
  //   // console.log('COMMAND ===>>>>>> ', command)
  //   const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
  //   if (newState) {
  //     // console.log('state handled')
  //     this.onChange(newState);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }
  //
  // _onBoldClick() {
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));


  // debugger;
  // console.log('plain text', this.state.editorState.getCurrentContent().getPlainText());
  // console.log('last block text', this.state.editorState.getCurrentContent().getLastBlock().text);
  // let ustack = this.state.editorState.getUndoStack()
  // console.log('EDITOR STATE UNDO ', EditorState.undo(this.state.editorState))
  // console.log('UNDO STACK ', this.state.editorState.getUndoStack());
  // }

  //  (editorState) => this.setState({editorState});


  // let d = convertFromHTML(seedText)
  // debugger;
  // console.log('=========convertFromHTML=====',d)
export default App;
