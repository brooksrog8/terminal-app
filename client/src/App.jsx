import './App.css';
import { useEffect, useState, useRef } from "react";
import commands from './commands.json'
import DOMPurify from 'dompurify';



function App() {
    const [input, setInput] = useState((commands.user) + "");
    const [output, setOutput] = useState("");
    const inputRef = useRef();
    const terminalRef = useRef();
    // const [lastCommandIndex, setLastCommandIndex] = useState(0);
    // const [history, setHistory] = useState([]);


    useEffect(() => {
      // Scroll to the bottom 
      inputRef.current.focus();
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }, [output]);

    const handleTabCompletion = () => {
      //  tab completion logic 

      const possibleCompletions = [
        
        "name",
        "user",
        "ls",
        "help",
        "server",
        "homelab",
        "contact",
        "summary"
      ];
      const currentInput = input.trim().split(" ").pop();
      const matchingCompletions = possibleCompletions.filter(
        (completion) => completion.startsWith(currentInput)
      );

      if (matchingCompletions.length === 1) {
        setInput((prevInput) =>
          prevInput.replace(new RegExp(`${currentInput}$`), matchingCompletions[0])
        );
      }
    };


    // const handleArrowUp = () => {
    //   if (history.length > 0 && lastCommandIndex < history.length - 1) {
    //     setLastCommandIndex((prevIndex) => prevIndex + 1);
    //     setInput(history[lastCommandIndex + 1]);
    //   }
    // };
    
    // const handleArrowDown = () => {
    //   if (history.length > 0) {
    //     if (lastCommandIndex > 0) {
    //       setLastCommandIndex((prevIndex) => prevIndex - 1);
    //       setInput(history[lastCommandIndex - 1]);
    //     } else {
    //       setLastCommandIndex(0);
    //       setInput('');
    //     }
    //   }
    // };
  return ( 
    <div 
    className="App"
    onClick={e=>{inputRef.current.focus();}}
    >
      
       <pre>
        {'\n'}
 {'\n'}  
 Version 0.1{'\n'}  ___________________________________________________
      {'\n'}  /                                                 \
      {'\n'}  |    _________________________________________     |
  {'\n'}  |   |                                         |    |
 {'\n'}  |   |  C:\{'>'} _                                 |    |
      {'\n'}  |   |                                         |    |
      {'\n'}  |   |                                         |    |
      {'\n'}  |   |                                         |    |
      {'\n'}  |   |                                         |    |
          {'\n'}  |   |                                         |    |
        {'\n'}  |   |                                         |    |
         {'\n'}  |   |                                         |    |
           {'\n'}  |   |                                         |    |
          {'\n'}  |   |                                         |    |
           {'\n'}  |   |                                         |    |
          {'\n'}  |   |                                         |    |
            {'\n'}  |   |_________________________________________|    |
             {'\n'}  |                                                  |
             {'\n'}   \_________________________________________________/
                 {'\n'}         \___________________________________/
               {'\n'}       ___________________________________________
           {'\n'}    _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- `-_
           {'\n'}    _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.`-_
           {'\n'}   _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-`__`. .-.-.-.`-_
           {'\n'} _-'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.`-_
           {'\n'}_-'.-.-.-.-.-. .---.-. .-------------------------. .-.---. .---.-.-.-.`-_
           {'\n'}:-------------------------------------------------------------------------:
      {'\n'}`---._.-------------------------------------------------------------._.---'
      </pre>

      <p>
        Type 'summary' to display summary.<br/>
        Type 'help' to see the list of available commands.<br/>
        Type repo or click <u><a style={{ color: 'orange' }} href="https://github.com/brooksrog8/terminal-app" target="_blank" rel="noreferrer">here</a></u> for the code from my Github repository.
      </p>
      
     {/* Sanitize and display the output */}
     <div className="terminal" ref={terminalRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(output) }}></div>


      <input
      ref={inputRef}
       type="text"
      value={input}
      onChange={e=>setInput(e.target.value)}
      onKeyDown={ (e) => {
        const cursorPosition = inputRef.current.selectionStart;

        if (e.key === "Enter") {
          let newOutput = "";
    
          newOutput += `${output}<div style="color: #00ff7f;">${input}</div>`; // Add color styling to user input
            switch (input) { 

                             // commands
                             case commands.user + "contact":
                              newOutput += `CONTACT:
                            -------------
                            <div>Email: <u><a href="mailto:${commands.email}" class="orange-link" target="_blank">${commands.email}</a></u></div>
                            <div>GitHub: <u><a href="https://github.com/brooksrog8" class="orange-link" target="_blank">github.com/brooksrog8</a></u></div>
                            <div>LinkedIn: <u><a href="https://www.linkedin.com/in/brooks-rogers-3b1009255/" class="orange-link" target="_blank">linkedin.com/brooks-rogers</a></u></div>-------------`;
            
                              break;
            
                            case commands.user + "homelab":
                              newOutput += `<div>My repository with information about my homelab: <u><a href="https://github.com/brooksrog8/homeLab" class="orange-link" target="_blank">github.com/homelab</a></u></div>          `;
                              break;
            


                              case commands.user + "help":
                                newOutput += commands.help;
                                break;
                            // name
                            case commands.user + "name":
                              newOutput += commands.name;
                              break;
            
                            case commands.user + "cd":
                              newOutput += commands.cd;
                              break;

                              case commands.user + "cd /home":
                                newOutput += commands.cd;
                                break;

                                case commands.user + "cd /":
                                  newOutput += commands.cd;
                                  break;
            
                            case commands.user + "..":
                              newOutput += "No navigation for u";
                              break;
            
                            case commands.user + "echo":
                              newOutput += commands.echo;
                              break;
            
                            case commands.user + "whoami":
                              newOutput += commands.whoami;
                              break;
                            // ls
                            case commands.user + "ls":
                              newOutput += `You can view my projects in my list of repositories here:
                            <u><a href="https://github.com/brooksrog8?tab=repositories" class="orange-link" target="_blank">github.com/repositries</a></u>                
                            `;
                              break;
            
                            case commands.user + "repo":
                              newOutput += `<div>My repository with this sites code: <u><a href="https://github.com/brooksrog8/terminal-app" class="orange-link" target="_blank">github.com/terminal-app</a></u></div>`;

                              break;
                            // summary
                            case commands.user + "summary":
                              newOutput += commands.summary;
                              break;
                            // pwd
                            case commands.user + "pwd":
                              newOutput += commands.pwd;
                              break;
            
                            // server
                            // case commands.user + "server":
                            // newOutput += commands.server;
                            // break;

                default:
                    newOutput += "unknown command"

            }
         // Add the executed command to the history
        //  setHistory((prevHistory) => [input, ...prevHistory]);

         setOutput(newOutput);
         setInput(commands.user);
        //  setLastCommandIndex(0);
       } else if (e.key === "Backspace" && cursorPosition <= commands.user.length) {
         e.preventDefault();
       } else if (e.key === "Tab") {
         e.preventDefault();
         handleTabCompletion();
       } else if (e.key === "ArrowUp") {
         e.preventDefault();
        //  handleArrowUp();
        //  setInput(history[lastCommandIndex]);
       } else if (e.key === "ArrowDown") {
         e.preventDefault();
        //  handleArrowDown();
        //  setInput(history[lastCommandIndex]);
       }
       }
      // }
    }
    className={input.startsWith(commands.user) ? "user-input" : ""}
    />

    </div>
);
}





export default App;
