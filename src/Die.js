import React from "react";

function Die(props){
  const styles ={
    backgroundColor : props.isHeld ? "#59E391" : "white"
  }
  return (
    <div onClick={props.onHold}>
    <h2  style={styles} className="die-face" >{props.value}</h2>
  </div>
  )
  
}

export default Die