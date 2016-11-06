import React from 'react';
import './App.css';
import filterChanges from './filterChanges.js'

class ConceptSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      diffData: [],
      concepts: ['Not Sure', 'Articles', 'Commas', 'Proper Nouns'],
      data: {},
      compactedChangeList: []
    };
    this.handleSubmit = () => this.props.changeMode(this.state.data);
    this.handleChange = this.handleChange.bind(this);
    this.setDefaults = this.setDefaults.bind(this);
    this.diff = require('diff')
  }

  componentDidMount() {
    let diffData = this.props.diffData;
    let compactedChangeList = filterChanges(diffData);
    this.setDefaults(compactedChangeList);
    this.setState({diffData: diffData, compactedChangeList: compactedChangeList})
  }

  setDefaults(changeList) {
    changeList.forEach( (change) => {
      this.setState({data: Object.defineProperty(this.state.data, change.changeNodes.map( (n) => n.value).join(), {
        value: this.state.concepts[0],
        configurable: true,
        writeable: true
      })})
    })
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

         { this.state.compactedChangeList[0] ?
           <div className="changeContainer">
             {this.state.compactedChangeList.map((change, j) => {
                return (
                  <div key={j} className="changeList">
                    <p className="changeItem"> {change.beforeText}  <span className="divider">  //  </span> {change.afterText}</p>
                    <select
                      name={change.changeNodes.map( (n) => n.value).join() }
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
          : <span> You didn't make any changes.... </span>
          }
         <button className="next-button" type="submit" onClick={this.handleSubmit}> Submit Your Changes 	&#8594;</button>
      </div>
    )
  }
}

export default ConceptSelector
