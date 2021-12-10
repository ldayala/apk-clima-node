/*paquete para las variables de entorno, lo pongo al inicion, y me va a leer el archivo .env las variables de entorno como string*/
require('dotenv').config() 

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busqueda=require('./models/busqueda')

//console.log(process.env.MAPBOX_KEY);  acceso a las variables de entorno
const main = async () => {
  let menu = "";
  const busqueda = new Busqueda()
  do {
    menu = await inquirerMenu();

    console.log(menu);
    switch (menu) {
      case 1:
        //mostrar mensaje
        const ciudad = await leerInput("ciudad");
            
        //buscar lugares
        const lugarBus=await busqueda.ciudad(ciudad)
        const id=await listarLugares("Estos son los resultados de su busqueda",lugarBus)
        //Seleccionar el lugar
        const lugar=  lugarBus.find(el=>el.id===id)
        busqueda.guadarHistorial(lugar);
        //clima
        const { descripcion,min,max,tem}= await busqueda.climaLugar(lugar);
      
        //mostrar resultado
        console.log("\nInformación de la ciudad\n".green);
        console.log(`Ciudad: ${lugar.nombre}`);
        console.log(`Latitud: ${lugar.lat}`);
        console.log(`Longitud: ${lugar.lon}`);
        console.log(`Descripción: ${descripcion}`);
        console.log(`Temperatura: ${tem}`);
        console.log(`temperatura mínima: ${min}`);
        console.log(`Temperatura máxima: ${max}`);
       
        break;
      case 2:
        
        busqueda.historialCapitalizado.forEach((ciudad,i)=>{
           console.log(`${i}. ${ciudad}`);
         })
        break;
    }

    await pausa();
  } while (menu !== 0);
};
main();
