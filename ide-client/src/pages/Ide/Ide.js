import React, { Component } from 'react'
import './Ide.css'
import axios from 'axios'
import secret from '../../secrets/secret'
import MonacoEditor from 'react-monaco-editor';
import {code} from './defaultCode'

export default class Ide extends Component {
    state={
        code: code.java,
        result: 'Compile and run to See output',
        lang: 'java'
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        alert("submit code")
        axios.post(`${secret.url}code/submit`,this.state)
            .then(res=>{
                console.log(res.data)
                const data = res.data
                if(data.err){
                    // Error in user code
                    this.setState({
                        result: data.error
                    })
                }else{
                    this.setState({
                        result: data.output
                    })
                }

            })
            .catch(err=>{
                console.log(err)
            })
    }


    onCodeChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code: newCode
        })
    }
    onInputChangeHandler = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    editorDidMount = (e) => {
        console.log("EDITOR MOUNTED")
    }


    onLangSelectHandler = (e) => {
        const lang = e.target.value
        this.setState({
            lang,
            code: code[lang]
        })
    }

    onClear=(e)=>{
        this.setState({
            code : ""
        })
    }


    render() {
        const options = {
            selectOnLineNumbers: true,
            renderIndentGuides: true,
            colorDecorators: true,
            cursorBlinking: "blink",
            autoClosingQuotes: "always",
            find: {
                autoFindInSelection: "always"
            },
            snippetSuggestions: "inline"
          };
        console.log(this.state)
        return (
            <>          
                <div className="container">
                    {/* <div className="row"> */}
                    <div className="container-editor">  
                        {/* <div className="col-12 mt-5"> */}
                        <div className="top-select">  
                        <select id="lang" onChange={(e) => this.onLangSelectHandler(e)}>
                        
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        </select>
                         <p className="lead d-block my-0">Type code here</p>
                         </div>
                             <div type="text" id="code">
                             <MonacoEditor
                                width="800"
                                height="700"
                                language={this.state.lang}
                                theme="vs-dark"
                                value={this.state.code}
                                options={options}
                                onChange={this.onCodeChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                             </div>
                             <div className="buttons"> 
                    <button className="btn btn-primary" onClick={this.onSubmitHandler}> Build and Run</button>
                    <button className="btn btn-danger" onClick={this.onClear}> Clear</button>
                    </div>
                    </div>
                        {/* </div> */}
                        {/* <div className="col-12 mt-3"> */}
                        <div className="container-io"> 
                            <p className="lead d-block my-0">Inputs</p>
                             <textarea type="text" id="input" value={this.state.input} onChange={this.onInputChangeHandler}>
                             </textarea>
                             {/* <div className="row"> */}
                        {/* <div className="col-12 my-5"> */}
                            <p className="lead d-block my-0">Outputs</p>
                             <textarea type="text" id="result" value={this.state.result} disabled={true}>
                             </textarea>
                        {/* </div> */}
                    </div>
                        
                        {/* </div> */}
                    {/* </div> */}
                    
                    </div>
                    {/* <div className="buttons"> 
                    <button className="btn btn-primary" onClick={this.onSubmitHandler}> Build and Run</button>
                    <button className="btn btn-danger" onClick={this.onClear}> Clear</button>
                    </div> */}
                {/* </div> */}
            </>
        )
    }
}
