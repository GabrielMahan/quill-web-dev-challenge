import React, { Component } from 'react';
import './App.css';
// import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';


class ConceptSelector extends React.Component {
  constructor() {
    super()
    this.state = {
      changes: [],
      concepts: ['Punctuation', 'Capitalization', 'Sentence Clauses', 'Not sure'],
      data: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({changes: this.props.changes})
    // debugger;
  }

  handleSubmit(e) {
    debugger; 
  }

  handleChange(data) {
    this.state.data[data.target.name] = data.target.value
  }
  render(){
    return(
      <div>
        this is the concept selector
        { this.state.changes[0] ?
          <div>

           <ul className="changeList">
             {this.state.changes.map((changeLog, k) => {
               return <li key={k}> "...{changeLog.changeSnippet}..."</li>
             })}
           </ul>
           <div>
             {this.state.changes.map((change, j) => {
               return <select key={j} name={change.changeSnippet} value={this.state.data[change]} onChange={this.handleChange}> { this.state.concepts.map((concept) => {
                   return <option value={concept}> {concept} </option>
                 })}</select>
               })}
           </div>
         </div>
         : null
         }
         <button type="submit" onClick={this.handleSubmit}> Submit Your Changes </button>
      </div>
    )
  }
}

export default ConceptSelector
