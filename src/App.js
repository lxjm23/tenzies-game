import React, { useState, useEffect }  from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

function App(){

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numOfRolls, setNumOfRolls] = useState(0)


  useEffect(() => {
    hasWon()
  }, [dice])

  function trackRolls(){
    
    setNumOfRolls(numOfRolls + 1)
  }

  function hasWon(){
    const isAllHeld = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const valueTheSame = dice.every(die => die.value === firstValue)
    if(isAllHeld && valueTheSame){
      setTenzies(true)
    }
  }
  


  function allNewDice(){
    let numArr = []
    for(let i=0; i < 10; i++){
      const dice = generateNewDie()
      numArr.push(dice)
    }
    return numArr
  }

  
  function rollDice(){
    trackRolls()
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ? {...die} : generateNewDie()
    }))
  }

  function generateNewDie(){
    const die = {
      value : Math.ceil(Math.random()* 6),
      isHeld : false,
      id : nanoid()
    }
    return die
  }
  
  function holdDice(id){
    setDice(oldDice => oldDice.map(die =>{
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function newGame(){
    setDice(allNewDice())
    setTenzies(false)
    setNumOfRolls(0)
  }
  
  
  const diceElements = dice.map(die=> <Die key={die.id} isHeld={die.isHeld} value={die.value} onHold={()=>holdDice(die.id)}/> )
    
  return (
  <main>
  {tenzies && <Confetti />}
  <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <p className="instructions">Number of Rolls: {numOfRolls}</p>
    <div className="dice-container">
      {diceElements}
    </div>
    <button onClick={tenzies ? newGame : rollDice} className="roll-dice">{tenzies ? "New Game" : "Roll"}</button>
    
  </main>)
 

}
export default App