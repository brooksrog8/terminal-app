import './App.css';
import { useEffect, useState, useRef } from "react";
import commands from './commands.json'
function App() {
    const [input, setInput] = useState((commands.user) + "");
    const [output, setOutput] = useState("");
    const inputRef = useRef();
    const terminalRef = useRef();



    useEffect(() => {
      // Scroll to the bottom when output changes
      inputRef.current.focus();   
      
    }, [output]);


// useEffect(() => {
//     // Display initial prompt
//     setOutput(['User@brookscodes']);
//   }, []); // Run this effect only once on component mount


    

  return ( 
    <div 
    className="App"
    onClick={e=>{inputRef.current.focus();}}
    >
      
       <pre>
        Version 1.0{'\n'}
            ___________________________________________________{'\n'}
            /                                                 \{'\n'}
           |    _________________________________________     |{'\n'}
           |   |                                         |    |{'\n'}
           |   |  C:\{'>'} _                                 |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |                                         |    |{'\n'}
           |   |_________________________________________|    |{'\n'}
           |                                                  |{'\n'}
            \_________________________________________________/{'\n'}
                   \___________________________________/{'\n'}
                ___________________________________________{'\n'}
             _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- `-_{'\n'}
          _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.`-_{'\n'}
       _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-`__`. .-.-.-.`-_{'\n'}
    _-'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.`-_{'\n'}
 _-'.-.-.-.-.-. .---.-. .-------------------------. .-.---. .---.-.-.-.`-_{'\n'}
:-------------------------------------------------------------------------:{'\n'}
`---._.-------------------------------------------------------------._.---'{'\n'}
      </pre>

      <p>
        Type 'help' to see the list of available commands.<br/>
        Type 'summary' to display summary.<br/>
        Type 'repo' or click <u><a className="text-light-blue dark:text-dark-blue underline" href="#" target="_blank">here</a></u> for the Github repository.
      </p>
      
      {/* /* //to display the output before the input */ }
    <div className="terminal" ref={terminalRef}> 
      
        {output}
      </div> 

      <input
      ref={inputRef}
       type="text"
      value={input}
      onChange={e=>setInput(e.target.value)}
      onKeyDown={e=>{
        if(e.key==="Enter"){
            let newOutput = "";
            newOutput  += output + "\n" + input + "\n";    // order of the outputs logic

            switch (input) { 

              // commands in config.js

              // name
              case commands.user + "name":
                newOutput += commands.name;
                break;

                // ls
              case commands.user + "ls":
                    newOutput += commands.ls;
                    break;

                    // pwd
                case commands.user + "pwd":
                    newOutput += commands.pwd;
                    break;

                    // about
                case commands.user + "about":
                    newOutput += commands.about;
                    break;

                default:
                    newOutput += "unknown command"

            }
            setOutput(newOutput)
            setInput((commands.user), "")
        }
      }}

       />


    </div>
  );
}





export default App;
