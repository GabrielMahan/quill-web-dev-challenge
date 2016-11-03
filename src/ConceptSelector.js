import React, { Component } from 'react';
import './App.css';
// import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';


class ConceptSelector extends React.Component {
  constructor() {
    super()
    this.state = {
      changes: []
    }
  }

  componentDidMount() {
    this.setState({changes: this.props.changes})
  }

  render(){
    return(
      <div>
        this is the concept selector
        { this.state.changes[0] ?
           <ul className="changeList">
             {this.state.changes.map((changeLog, k) => {
               return <li key={k}> "...{changeLog.changeSnippet}..."</li>
             })}
           </ul>
         : null
         }
      </div>
    )
  }
}

export default ConceptSelector
