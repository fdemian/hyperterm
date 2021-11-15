import React, { useState, useRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types';
import './Console.css';

const Console = ({ prompt, user, containerRef, onCommand }) => {

  const userAndPrompt = user + prompt;
  const [consoleValue, setConsoleValue] = useState(userAndPrompt + ':');

  // Exported methods.
  const clear = () => setConsoleValue(userAndPrompt + ':');
  const appendText = (text) => setConsoleValue(consoleValue + text);
  const insertNewLine = () => setConsoleValue(consoleValue + '\n' + userAndPrompt + ':');

  const handleEnterKey = (event) => {
    event.preventDefault();
    setConsoleValue(consoleValue + '\n' + userAndPrompt + ':');

    // Register a new command.
    const splitted_string = event.target.value.split(":");
    const command = splitted_string[splitted_string.length-1];
    onCommand(command);
  }

  const handleTextChange = (e) => {
    if(e.target.value.endsWith(userAndPrompt))
       return;

   setConsoleValue(e.target.value)
  }

  /*
    Handles the keypress events to prevent the user to erase the command prompt.
    Relevant keys/events:

    8  - Backspace.
    13 - Enter.
    36 - Init key.
    37 - Arrow back.
    38 - Arrow up.
    39 - Arrow forward (this case is not being handled).
    40 - Arrow down.
    46 - Supress key.

  */
  const handleKeydown = (event) => {

    switch(event.which)
    {
      case 13:
        handleEnterKey(event);
        break;

      case 36:
        event.preventDefault();
        //handleInitKey();
        break;

      case 46:
        //preventPromptErasing(event, true);
        break;

      case 8:
      case 37:
       //preventPromptErasing(event, false);
       break;

      case 38:
        event.preventDefault();
        //applyCommandHistory(true);
        break;

      case 40:
       //applyCommandHistory(false);
       event.preventDefault();
       break;

      default:
        // As of now, nothing is done in this case.
        break;
     }
  }

  /*
  {
     initialize: doInitialize,
     files: _filesInDirectory,
     insertNewLine:_insertNewLine,
     commands: _consoleCommands,
     addCommand: addCommand,
     addCommandList: addCommandList,
     destroy: doDestroy,
     getEnvironmentVariable: getEnvironmentVariable,
     setEnvironmentVariable: setEnvironmentVariable,
		 getAttribute: getAttribute,
		 setAttribute: setAttribute,
		 setStyle: setStyle
    };

   };*/

   // Exposed methods.
   useImperativeHandle(containerRef, () => {
     return {
       clear: clear,
       appendText: appendText,
       insertNewLine: insertNewLine
     };
   });

  return (
  <div id="console-container"
    style={{width:700, height: 300, marginLeft:'25%'}}
    containerRef={containerRef}
  >
    <textarea
      className="console"
      spellCheck="false"
      value={consoleValue}
      onChange={handleTextChange}
      onKeyDown={handleKeydown}
    />
  </div>
  );
}

Console.propTypes = {
  prompt: PropTypes.string,
  user: PropTypes.string
};

export default Console;
