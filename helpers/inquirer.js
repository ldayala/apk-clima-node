const inquirer = require("inquirer");
require("colors");

const inquirerMenu = async () => {
  const preguntas = [
    {
      type: "list",
      name: "opcion",
      message: "¿Que desea hacer?",
      choices: [
        {
          value: 1,
          name: `${'1.'.green} Buscar Ciudad`,
        },
        {
          value: 2,
          name: `${'2.'.green} Historial`,
        },
        {
          value: 0,
          name: `${'0.'.green} Salir`,
        },
       
      ],
    },
  ];
  // console.clear();
  console.log("===============================".green);
  console.log("Seleccione una opcion".white);
  console.log("===============================\n".green); // \n es un salto de linea
  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  await inquirer.prompt(question);
};

const leerInput = async(message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const {desc} = await inquirer.prompt(question);
  return desc
};

const listarLugares=async(message,lugares=[])=>{

  const choices= lugares.map((ele,i)=>{
    const id =`${(i+'.').green}`;
    const nombre=ele.nombre;
    const longitud=ele.lng;
    const latitud= ele.lat;
    return {
      value:ele.id,
      name:`${id} ${nombre}`
    }
  })

  const preguntas=[{
    type:"list",
    name:"listar",
    message,
    choices
    }]
   const {listar}= await inquirer.prompt(preguntas)
  return listar;
        
}

const cofirmBorrarTarea= async()=>{
  const pregun=[
    {
      type:"confirm",
      name:"confirmBorrado",
      message:"seguro desea borrar esa tarea"
    }
  ]
  const {confirmBorrado}= await inquirer.prompt(pregun);
 return confirmBorrado
}

const completarTareas=async(message,tareas=[])=>{

  const choices= 
  tareas.map((ele,i)=>{
    return {
      value:ele.id,
      name:`${(i+'.').green}  ${ele["desc"]} `,
      checked: true
    }
  })

  const preguntas=[{
    type:'checkbox',
    name:"completar",
    message,
    choices
    
    }]
   const {completar}= await inquirer.prompt(preguntas)
  return completar;
        
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  
};
