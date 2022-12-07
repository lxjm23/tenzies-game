import React  from "react";
import Die from "./Die";

function App(){
return (<main>
  <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="dice-container">
    </div>
    <button className="roll-dice">Roll</button>
    
  </main>)

}
export default App