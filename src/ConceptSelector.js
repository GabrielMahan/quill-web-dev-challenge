import React from 'react';
import './App.css';

class ConceptSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      changes: [],
      diffData: [],
      concepts: ['Not Sure', 'Punctuation', 'Commas','Capitalization', 'Sentence Clauses'],
      data: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.diff = require('diff')
  }

  componentDidMount() {
    let diffData = this.props.diffData;

    function wasChanged(value) {
      return value.added || value.removed;
    };
    let changes = diffData.filter(wasChanged);

    changes.forEach( (change) => {
      this.setState({data: Object.defineProperty(this.state.data, change.value, {
        value: this.state.concepts[0],
        configurable: true,
        writeable: true
      })})
    })
    this.setState({changes: changes, diffData: diffData})

    debugger;

  }

  handleSubmit(e) {
    debugger;
    this.props.changeMode(this.state.data);
  }

  handleChange(change) {
    this.setState({data: Object.defineProperty(this.state.data, change.target.name, {
      configurable: true,
      value: change.target.value,
      writeable: true
    })})
  }

  render(){
    return(
      <div>
        <div className="prompt"> Review your changes and categorize them </div>
        <div className="changeText" >
          {this.state.diffData.map((chunk, i) => {
            let added = chunk.added;
            let removed = chunk.removed;
            return <span key={i} className={ added || removed ? (added ? "added" : "removed" ) : "constant"} > {chunk.value} </span>
          })}
        </div>


        { this.state.changes[0] ?
          <div className="changeContainer">
            {this.state.changes.map((change, j) => {
               return (
                 <div key={j} className="changeList">
                   {change.added ? <span className="add tag"> Addition: </span> : <span className="del tag"> Deletion </span> }
                   <span className="changeSnippet"> "{change.value}" </span>
                   <select
                     name={change.value}
                     value={this.state.data[change]}
                     onChange={this.handleChange}
                     >
                      { this.state.concepts.map((concept, k) => {
                       return <option key={k} value={concept}> {concept} </option>
                     })}
                   </select>
                 </div>
              )
            })}
         </div>
         : null
         }
         <button className="next-button" type="submit" onClick={this.handleSubmit}> Submit Your Changes 	&#8594;</button>
      </div>
    )
  }
}

export default ConceptSelector

// import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';
// const styleMap = {'EDITS': { color: 'darkorchid', fontWeight: 'bold'},};
// <Editor
//   editorState={this.state.editorState}
//   readOnly={false}
//   customStyleMap={styleMap}
//   />
