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
    let diffStack = this.props.diffData.filter((node) => !node.value.match(/^\s+$/));
    debugger;
    // Loop: run through the stack,
    // push changes into a changeList arrray until you hit an unchanged element
    // When you hit that unchaned element, empty the changeList, and throw a bunch of info into a changeObject that goes into the changes.
    var unchangedHead = {value: ""};
    var changeNodes = [];
    var compactedChangeList = [];
    var cur = {};

    while (diffStack.length > 0) {
      console.log('DIFF STACK', diffStack)
      cur = diffStack.shift();
      if (diffStack[0]) {
        if ((cur.added || cur.removed) && !diffStack[0].added && !diffStack[0].removed) {
          changeNodes.push(cur);
          compactedChangeList.push({
            unchangedHead: unchangedHead,
            unchangedTail: diffStack[0],
            changeNodes: changeNodes
          })
          unchangedHead = diffStack[0];
          changeNodes = [];
        }
        else if (cur.added || cur.removed) {
          changeNodes.push(cur)
        }
        else {
          unchangedHead = cur;
        }
      }
      else {
        if (cur.added || cur.removed) {
          changeNodes.push(cur);
          compactedChangeList.push({
            unchangedHead: unchangedHead,
            unchangedTail: {value: ""},
            changeNodes: changeNodes
          })
        }
      }
    }


    debugger;


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
    // debugger;

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
