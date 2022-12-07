import React, { useEffect, useState } from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'



function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=>{
    hasWon()
  }, [dice])

  function hasWon(){
    const allDiceHeld = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const allValueTheSame = dice.every(die => die.value === firstValue)
    if(allDiceHeld && allValueTheSame){
        setTenzies(true)
    }
  }
  
  function generateNewDie(){
    return {
      value: getRandomNumber(),
      isHeld: false,
      id: nanoid()
     }
  }

  function getRandomNumber(){
    return Math.ceil(Math.random()* 6)
  }
  

  function allNewDice(){
      const newDiceArr = []
      for(let i = 0; i< 10; i++){
       const newDie =  generateNewDie()
       newDiceArr.push(newDie)
      }
      
      return newDiceArr
  }

  

 

  function rollDice(){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ? 
        die: 
        generateNewDie()
    }))
  }

  function holdDice(id){
   setDice(oldDice => oldDice.map(die =>{
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
   }))
  }

 
  const diceElements = dice.map(die => <Die holdDice={()=>holdDice(die.id)} isHeld={die.isHeld} key={die.id} num={die.value }></Die>)

  return (
    <main>
    <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
      {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice }>Roll</button>
      
    </main>
  );
}

export default App;
