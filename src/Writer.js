import React, { Component } from 'react';
import './App.css';
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';


class Writer extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.moveFocusToEnd(EditorState.createEmpty())
    }
    this.onChange = (editorState) => {this.setState({editorState})};
  }

  render(){
    return(
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        placeholder="Please write some text!"
      />
    )
  }
}


export default Writer;
