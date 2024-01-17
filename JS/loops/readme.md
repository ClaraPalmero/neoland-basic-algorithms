Bienvenido a Neoland! Por fin ha llegado el momento de ponernos a trabajar. Hoy hemos avanzado mucho con los conceptos de JS y es el momento de ponerlos en práctica.

Antes de comenzar crea un nuevo proyecto en vuestro GitLab o Github, el nombre que debéis utilizar es **neoland-loops** y recuerda realizar un commit por iteración:

```bash
git add .
git commit -m "Iteration#1"
git push origin master
```

### Guía de práctica

---

**Iteración #1: Usa includes**

Haz un bucle y muestra por consola todos aquellos valores del array que incluyan la palabra "Camiseta". Usa la función .***includes*** de javascript.

```jsx
const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta']
```

**Iteración #2: Condicionales avanzados**

Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados y añade la propiedad ***isApproved*** a true o false en consecuencia. Una vez lo tengas compruébalo con un ***console.log***. 

( **Mirar abajo en pistas** ).

Puedes usar este array para probar tu función:

```jsx
const alumns = [
    {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
		{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
		{name: 'Juan Miranda', T1: false, T2: true, T3: true},
		{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
		{name: 'Raquel Benito', T1: true, T2: true, T3: true}
]
```

Para añadir nueva propiedad a un objeto podéis hacerlo de esta forma mas sencilla:

```jsx
objeto.isApproved =true

//donde objeto es el objeto que recorremos (cada alumno en nuestro caso)

//isApproved --- es la propiedad queremos definir o modificar 

// true ---- es el valor que le asignamos a la propiedad 

/////---------Ejemplo-----------

colegios = [
    {name: 'Pilarica', Clase1: 100, Clase1: 80, Clase1: 10}, 
		{name: 'Lorica', Clase1: 89, Clase1: 50, Clase1: 40},	
]

/* recorremos el array de objetos con un forEach para quedarnos en cada uno
de los elementos*/

colegios.forEach((colegios)=>{
	//le añadimos la propiedad nueva llamada "pintada" y el valor = true
	colegios.pintada = true;
})

console.log(colegios);

// -------- CONSOLE--------------

{ name: 'Pilarica', Clase1: 10, pintada: true },
{ name: 'Lorica', Clase1: 40, pintada: true }

```

**Iteración #3: Probando For...of**

Usa un bucle forof para recorrer todos los destinos del array. Imprime en un ***console.log*** sus valores.

Puedes usar este array:

```jsx
const placesToTravel = ['Japon', 'Venecia', 'Murcia', 'Santander', 'Filipinas', 'Madagascar']
```

**Iteración #4: Probando For...in**

Usa un **for...in** para imprimir por consola los datos del alienígena.. Puedes usar este objeto:

```jsx
const alien = {
    name: 'Wormuck',
    race: 'Cucusumusu',
    planet: 'Eden',
    weight: '259kg'
}
```

**Iteración #5: Probando For**

Usa un bucle **for** para recorrer todos los destinos del array y elimina los elementos que tengan el id 11 y 40. Imprime en un ***console log*** el array. Puedes usar este array:

```jsx
const placesToTravel = [{id: 5, name: 'Japan'}, {id: 11, name: 'Venecia'}, {id: 23, name: 'Murcia'}, {id: 40, name: 'Santander'}, {id: 44, name: 'Filipinas'}, {id: 59, name: 'Madagascar'}]
```

**Iteración #6: Mixed For...of e includes**

Usa un bucle **for...of** para recorrer todos los juguetes y elimina los que incluyan la palabra gato. Recuerda que puedes usar la función ***.includes()*** para comprobarlo.Puedes usar este array:

```jsx
const toys = [
{id: 5, name: 'Buzz MyYear'}, 
{id: 11, name: 'Action Woman'}, 
{id: 23, name: 'Barbie Man'}, 
{id: 40, name: 'El gato con Guantes'},
{id: 40, name: 'El gato felix'}
]
```

**Iteración #7: For...of avanzado**

Usa un bucle **for...of** para recorrer todos los juguetes y añade los que tengan más de 15 ventas (sellCount) al array popularToys. Imprimelo por consola.. Puedes usar este array:

```jsx
const popularToys = [];
const toys = [
	{id: 5, name: 'Buzz MyYear', sellCount: 10}, 
	{id: 11, name: 'Action Woman', sellCount: 24}, 
	{id: 23, name: 'Barbie Man', sellCount: 15}, 
	{id: 40, name: 'El gato con Guantes', sellCount: 8},
	{id: 40, name: 'El gato felix', sellCount: 35}
]
```

Happy coding 🌟  & Happy Neolander 💕   

**Concepto para ejercicio Iteración#2 ( Sergio ).**

Para poder recorrer un array con objetos deberás, recorrerlo con un array y por cada posición añadir una nueva propiedad a cada objeto.

- Pista: ( para añadir la propiedad dentro del objeto )

```jsx
//Pista a la hora de recorrer un array y poder meter en el objeto una nueva propiedad
//deberás asignar a ese array por indice una propiedad tal que así

nombreLista[indice].nombrePropiedad = valor;
```