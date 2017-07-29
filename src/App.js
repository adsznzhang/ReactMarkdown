import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import marked,{Renderer} from 'marked';
import highlight from 'highlight.js'

class App extends Component {
  constructor(){
    super();
    this.state = {content: '### Type Markdown Here!'}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState ( {content: event.target.value} )
  }

  rawMarkup() {
	  marked.setOptions({
		  renderer: new marked.Renderer(),
		  gfm: true,
		  tables: true,
		  breaks: false,
		  pedantic: false,
		  sanitize: true,
		  smartLists: true,
		  smartypants: false,
		  highlight: function (code) {
			  return require('highlight.js').highlightAuto(code).value
		  }
	  })

	  var rawMarkup = marked(this.state.content, {sanitize: true})
	  return {
		  __html: rawMarkup
	  }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="text-center">ReactJS Markdown Editor</h1>
          <div className="col-xs-12 col-sm-6">
            <h3>Markdown</h3>
            <textarea  id="markdown" className="markdown" defaultValue={this.state.content} onChange={this.handleChange}>
            </textarea>
          </div>
          <div className="col-xs-12 col-sm-6">
            <h3>Preview</h3>
            <div id="preview" dangerouslySetInnerHTML={this.rawMarkup()} ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
