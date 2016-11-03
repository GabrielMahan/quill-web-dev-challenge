import React, { Component } from 'react';
import './App.css';
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';


class Writer extends React.Component {
  constructor() {
    super();
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.sendUp = this.sendUp.bind(this)
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.moveFocusToEnd(this.state.editorState)
    })
  }
  
  sendUp() {
    this.props.changeMode(this.state.editorState.getCurrentContent().getPlainText())
  }

  render(){
    const {editorState} = this.state;
    return(
      <div>
        <div className="prompt"> Please Write Some Text </div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />

      <button onClick={this.sendUp } > next </button>
      </div>
    )
  }
}


export default Writer;


// {this.state.editMode ?
//   <div>
//     <span> Please make edits to your text! </span>
//
//   </div>
// : <button className="next-button" onClick={this.enableEdit}> Next -> </button>
// }
