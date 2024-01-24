Antes de comenzar crea un nuevo proyecto en vuestro GitLab o Github, el nombre que debéis utilizar es **neoland-dom** y recuerda realizar un commit por iteración:

```bash
git add .
git commit -m "Iteration#1"
git push origin master
```

### Guía de práctica

---

**Iteración #1: Interacción con el DOM**

Dado el siguiente HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button class="showme">Pillame!</button>
    <h1 id="pillado">Aqui estoy 8)</h1>
    <p>Soy el power ranger Amarillo</p>
    <p>Soy el power ranger Rojo</p>
    <p>Soy el power ranger Azul</p>
    <p>Soy el power ranger Negro</p>
    <h4 class="pokemon">Bulbasaur</h4>
    <h4 class="pokemon">Charmander</h4>
    <h4 class="pokemon">Pikachu</h4>
    <h4 class="pokemon">Squirtle</h4>
    <span data-function="testMe">Batman</span>
    <span data-function="testMe">Robin</span>
    <span data-function="testMe">Rick</span>
    <span data-function="testMe">Morty</span>
  </body>
</html>
```

```bash
1.1 Usa querySelector para mostrar por consola el botón con la clase .**showme**

1.2 Usa querySelector para mostrar por consola el h1 con el id #pillado

1.3 Usa querySelector para mostrar por consola todos los p

1.4 Usa querySelector para mostrar por consola todos los elementos con la clase.pokemon

1.5 Usa querySelector para mostrar por consola todos los elementos con el atributo
data-function="testMe".

1.6 Usa querySelector para mostrar por consola el 3 personaje con el atributo
data-function="testMe".

```

**Iteración #2: Modificando el DOM**

Dato el siguiente HTML:

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
	<h2 class="fn-insert-here"></h2>
	<p class="fn-remove-me">Eliminame!</p>
  <p>No me elimines!</p>
  <p>No me elimines!</p>
  <p class="fn-remove-me">Eliminame!</p>
  <p>No me elimines!</p>
  <p class="fn-remove-me">Eliminame!</p>
  <p class="fn-remove-me">Eliminame!</p>
  <p>No me elimines!</p>
	<div></div><div></div>
	<div class="fn-insert-here"></div>
  <div class="fn-insert-here"></div>
</body>
</html>
```

```bash
2.1 Inserta dinamicamente en un html un div vacio con javascript.

2.2 Inserta dinamicamente en un html un div que contenga una p con javascript.

2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.

2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.

2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.

2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.
const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];

2.7 Elimina todos los nodos que tengan la clase .fn-remove-me

2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div.
	Recuerda que no solo puedes insertar elementos con .appendChild.

2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here
```
