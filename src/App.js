import React, { Component } from 'react';
import './App.css';

import Writer from './Writer.js'
import QuillEditor from './QuillEditor.js'
import ConceptSelector from './ConceptSelector.js'
// import JsDiff from 'diff'

const plato = "I went down yesterday to the Piraeus with Glaucon"

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
  }

  componentDidMount() {
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
// Here's the content editable attempt
// <div contentEditable>
//   {this.state.plato}
// </div>


this.setState({
  plato: this.state.plato.split(/\s/).map((word, i) => {
    return `<${i}>${word}</${i}>`
  }).join
})
