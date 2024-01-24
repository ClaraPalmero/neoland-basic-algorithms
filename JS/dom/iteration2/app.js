//! 2.1 Inserta dinámicamente en un html un div vacio con javascript.
//* mediante APPENDCHILD
const newDiv = document.createElement("div"); //---> creamos el div con el createElement
document.body.appendChild(newDiv); //---> lo insertamos en index HTML
//* mediante TEMPLATE
const template = "<div></div>";
document.body.innerHTML += template;

//! 2.2 Inserta dinámicamente en un html un div que contenga una p con javascript.
const newDivP = document.createElement("div"); //---> creamos el div
const newP = document.createElement("p"); //---> creamos la p
newP.textContent = "Párrafo dentro del div"; //---> añadimos un texto a la p
newDivP.appendChild(newP); //---> añadimos el p al div
document.body.appendChild(newDivP); //---> añadimos el div en el body

/*2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.

2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.

2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.

2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.
const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];

2.7 Elimina todos los nodos que tengan la clase .fn-remove-me

2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div.
	Recuerda que no solo puedes insertar elementos con .appendChild.

2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here
```*/
