import React, { useRef } from 'react';
import Console from './Console';
import './App.css';

function App() {

  const containerRef = useRef(null);

  const clearOnClick = () => {
    containerRef.current.clear();
  }

  const appendText = () => {
    containerRef.current.appendText("man stdin");
  }

  const insertNewLine = () => {
    containerRef.current.insertNewLine();
  }

  const onCommand = (command) => {
    console.clear();
    console.log(command);
    console.log("::::");
  }

  return (
    <div className="App">
      <h2>CONSOLE</h2>
      <br />
      <Console
        prompt="$"
        user="root@domain"
        containerRef={containerRef}
        onCommand={onCommand}
      />
      <br />
      <div>
        <button type="button" onClick={clearOnClick}>Clear console</button>
        <button type="button" onClick={appendText}>Append text</button>
        <button type="button" onClick={insertNewLine}>Insert new line</button>
      </div>
    </div>
  );
}

export default App;
