/**
1. Crea una aplicación de ReactJS con vite → name: jsx-basics.
2. Renderiza “Buenos días” [6-12] , “Buenas tardes” [13-19] o “Buenas noches”[20-5] según el valor numérico asignado.
3. Recorrer los elementos de un array y renderizalos ⇒ Si os da un error de keys en la consola podéis usar el index como `key={index}` .
4. Mappea un array de objetos para pintarlos.
5. Crea un botón que modifique un valor de false a true y renderice un contenido cuando este valor se modifique. */

import './App.css'
import On from './components/Button'

const App= () => {
 const x = 13
 const planetas = [ "Luna", "Sol", "Júpiter", "Venus", "Marte"]


  return (
    <>     
     {x >= 6 && x <= 12 ? <h1>Buenos días</h1> : x >= 13 && x <= 19 ? <h1>Buenas tardes</h1> : <p>Buenas noches</p> }    

     <h2>Este es mi array</h2>
    
     {planetas.map((planeta, index) =>(<p key={index}>{planeta}</p>)
      )}
      <On/>
    </> 
  )
 }


export default App
