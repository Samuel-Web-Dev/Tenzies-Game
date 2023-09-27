import React, { useState, useEffect } from 'react'

import Die from './components/Die'
import Confetti from 'react-confetti'


const App = () => {

  function generateDice(){
   return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: Math.floor(Math.random() * 1000)
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++){
      newDice.push(generateDice())
    }
    return newDice
 }

 const [dice, setDice] = useState(allNewDice())

 const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const getSameValue = dice.every(die => die.value === firstValue)

    if(allHeld && getSameValue){
      setTenzies(true)
      console.log("You Won!");
    }
  }, [dice])
 
 function holdDice(id){
   setDice(oldDice => oldDice.map(die => {
     return die.id === id ? {...die, isHeld: !die.isHeld} : die
   }))  
}


 const diceElements = dice.map(dice =>  {
   return <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} handleClick={() => holdDice(dice.id)} /> 
   
 })

 function rollDice(){
  if(!tenzies){
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDice();
    }))
  } else {
    setTenzies(false)
    setDice(allNewDice())
  }
 }

  const flipBtn = tenzies ? "New Game" : 'Roll'
   const styling = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   }
  return (
    <main className='main_container'>
      {tenzies && <Confetti style={styling} />}
      <h1 className='title'>Tenzies</h1>
       <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='dice_container'>
         {diceElements}
      </div>
      <button className='roll-btn' onClick={rollDice}>{flipBtn}</button>
    </main>
  )
}

export default App