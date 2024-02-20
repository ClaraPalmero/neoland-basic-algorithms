import { useState } from 'react'

const On = () => {
  const [text, setText] =useState(true) // setText cambia a text. En el setSatet le damos el valor true
  const change = () => { // función que se ejecutará cuando se haga click en el botón
    setText(!text) // al hacer click, se actualizará el el estado y cambiará el valor a false
  }



  return (
    <>
    <div>
      <h2>Este es mi botón</h2>
      <h2>{text ? "TRUE" : "FALSE"}</h2>
      <button onClick={change}>Click</button> 
     
    </div>

    </>
  )
}
export default On