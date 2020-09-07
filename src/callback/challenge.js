//Instanciamos 
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

/* ------------------Lo que realizaremos------------------
 * Creamos una función (fechData) pra traer los datos desde 
 * nuestra API, a la cual también le vamos a pasar un callback, y 
 * después vamos a desencadenar los llamados que necesitamos 
 */

  function fetchData(url_api, callback){
    //Ahora construimos la petición por medio de XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    /*LE pasamos por parámetro: 
    * 1.- la petición deseada GET
    * 2.- la url de donde obtendremos los datos
    * 3.- TRUE para que se maneje de manera asíncrona, por defecto está en TRUE
    */
    xhttp.open('GET', url_api, true);
    //Escuchamos lo que genere la conexión anterior. Si el cambio suceder, ejecutamos una función
    xhttp.onreadystatechange = function (event){
      /*Hacemos una validación para saber saber si ejecutamos el callback. La validación se refiere a si el estado en el cual se encunetra es satisfactoio o no.
      Los estados que puede tener son:
        estado 0: inicializado
        estado 1: cargando
        estado 2: ya se cargó
        estado 3: ya hay información
        estado 4: solicitud completa
        PD: recuerda estas trabajando con una API externa, o sea, un servidor por lo que depende del servidor cuanto demore en cada estado haces un pedido por datos (request) y solo es aplicar lógica.
        */
      if(xhttp.readyState === 4){
        /*El siguiente if nos permite saber el estatus en que se enucnetra. Si bien se ha completado la petición, pero no sabemos si es correcta en el sentido de que nos dió un 200.
        Aquí un resumen de los casos mas comunes:
          ESTADO 1xx (100 - 199): Indica que la petición esta siendo procesada.
          ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente.
          ESTADO 3xx (300 - 399): Indica que hay que tomar acciones adicionales para completar la solicitud. Por lo general indican redireccionamiento.
          ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
          ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
          */
        if(xhttp.status === 200){
          //Ahora sí podemos regresar el callback, el que por estándar de NODE, el 1er parámetro es el error, y el 2do es la información que se desencadena (resultado del llamado a la API)
          callback(null, JSON.parse(xhttp.responseText))
        } else {
          const error = new Error('Error' + url_api)
          return callback(error, null)
        }
      }
    }
    xhttp.send()
  }

/*
 * Lo siguiente será realizar una petición a la API, obtener
 * cuántos elementos tiene (personajes), después acceder al 1er
 * personaje, y obtener la ubicación y la dimensión en la que se
 * encuentra. Son en total 3 llamados a la API
 */

fetchData(API, function(error1, data1){
  if (error1) return console.error(error1);
  fetchData(API +data1.results[0].id, function (error2, data2){
    if (error2) return console.error(error2);
    fetchData(data2.origin.url, function (error3, data3){
      if (error3) return console.error(error3);
      console.log('Número de personajes: ' + data1.info.count)
      console.log('Personaje N° 1: ' + data2.name)
      console.log(`Dimensión de ${data2.name} es: ${data3.dimension}`)
    })
  })
})

//Callback hell -> múltiples peticiones encadenadas o anidadas (ejemplo anterior)

