const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    (true)
    ? setTimeout(() => resolve(('Haz algo Async'), 3000))
    : reject(new Error('Fracasó Async'))
  });
}

//Ejecutamos la Promesa anterior
const doSomething = async () => {
  const something = await doSomethingAsync();
  console.log(something)
}

console.log('Antes');
doSomething();
console.log('Después');

/*
 * Al ejecutar el código, imprime lo siguiente:
 * Antes
 * Después       
 * Haz algo Async
*/

//Capturamos los errores
const otraFuncion = async () => {
  try {
    const something = await doSomethingAsync();
    console.log(something)
  } catch (err) {
    console.error(error)

  }
}

console.log('Antes de la Otra Función');
otraFuncion();
console.log('Después de la Otra función');

/*
 * Al ejecutar el código, imprime lo siguiente:
 * Antes
 * Después
 * Antes de la Otra Función
 * Después de la Otra función
 * Haz algo Async
 * Haz algo Async
*/
