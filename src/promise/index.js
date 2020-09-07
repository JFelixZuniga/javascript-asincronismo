const somethingWillHappen = () => {
  return new Promise((resolve, reject) => 
  true ? resolve('Hey!') 
  : reject('Whoops!'));
}

somethingWillHappen()
  .then( response => console.log(response))
  .catch( err => console.log(err));

// const error = newError('Woops!!'); // Error que nos permite ver en consola más detalles del error




const somethingWillHappen2 = () => {
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve('Ejale');
      }, 2000)
    } else {
      const error = new Error('Ups!');
      reject(error);
    }
  });
}

somethingWillHappen2()
  .then( response => console.log(response))
  .then(() => console.log('Funciona!'))
  .catch( err => console.error(err));

// Para correr todas las promesas tenemos el método Promise.all() que nos retornará un array con la respuesta de todas las promesas que pasemos como parámetro.

Promise.all([somethingWillHappen(), somethingWillHappen2()])
  .then( response => {
    console.log('Array de resultado', response)
  })
  .catch(err => console.log(err))

/*
 * La ejecución de todo el código imprime lo siguiente:
 * Hey!
 * Ejale
 * Funciona!
 * Array de resultado [ 'Hey!', 'Ejale' ]
 */