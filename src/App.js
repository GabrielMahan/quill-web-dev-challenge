import React, { Component } from 'react';
import './App.css';

import Writer from './Writer.js'
import QuillEditor from './QuillEditor.js'
import ConceptSelector from './ConceptSelector.js'



class App extends Component {
  constructor() {
    super();
    this.state = {
      userText: "",
      changes: [],
      mode: ['write', 'edit', 'cat']
    };
    this.changeMode = this.changeMode.bind(this)
  }

  changeMode(data) {
    // console.log('==================')
    // debugger;
    var mode = this.state.mode[0]
    if (mode === 'write') {
      this.setState({userText: data})
    }
    else if (mode === 'edit') {
      this.setState({changes: data})
    }
    else if (mode === 'cat') {
      // fetch(data)
      // Here I would connect with the API
    }
    this.state.mode.shift();
    // debugger;
  }


  render() {

    return (
      <div className="App">
        {this.state.mode[0] === 'write'  ?
          <Writer changeMode={this.changeMode} />
        : null
        }
        {this.state.mode[0] === 'edit'  ?
          <QuillEditor
            seedText={this.state.userText}
            changeMode={this.changeMode}
          />
        : null
        }
        {this.state.mode[0] === 'cat'   ?
          <ConceptSelector changes={this.state.changes} />
        : null
        }
      </div>
    );
  }
}


export default App;
