import React from 'react';
import './App.css';

import ConceptSelector from './ConceptSelector.js';
import QuillEditor from './QuillEditor.js';
import Writer from './Writer.js';

// This is the top level component and controls the view
// There are three 'modes', write, edit, and categorize (cat)

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userText: "",
      diffData: [],
      finalEditorState: {},
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
      this.setState({diffData: data.diffData, finalEditorState: data.editorState})
    }
    else if (mode === 'cat') {
      // fetch(url, data)....
      // Here I would connect with the API
      debugger;
    }
    this.state.mode.shift();
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
          <ConceptSelector
            diffData={this.state.diffData}
            originalText={this.state.userText}
            editorState={this.state.finalEditorState}
            changeMode={this.changeMode}
          />
        : null
        }
      </div>
    );
  }
}

export default App;
