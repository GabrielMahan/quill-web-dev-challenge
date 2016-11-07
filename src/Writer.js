import React from 'react';
import './App.css';
import {Editor, EditorState} from 'draft-js';

// Uses Draft.js from Facebook; it's a cool tool. 

class Writer extends React.Component {
  constructor() {
    super();
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.sendUp = this.sendUp.bind(this);
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.moveFocusToEnd(this.state.editorState)
    });
  }

  sendUp() {
    this.props.changeMode(this.state.editorState.getCurrentContent().getPlainText());
  }

  render(){
    return(
      <div>
        <div className="prompt"> Please write some text in the box below</div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />

      <button onClick={this.sendUp} className="next-button"> next 	&#8594; </button>
      </div>
    )
  }
}

export default Writer;
