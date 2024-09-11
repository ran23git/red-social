const mongoose = require("mongoose"); //intermedia entre APP y BaseDatos


const connection = async ()=>{//lo hago asyncrono, para q hasta q no se conecte, no siga con el programa
    
try{
    await mongoose.connect("mongodb://localhost:27017/mi_redsocial");//espera a que se consiga esa conexion, y despues continua con el programa

               console.log("conectado correctamentea a BD mi_redsocial");//aviso por CONSOLA que ya estamos conectado

}catch(error){
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos!!");
}

}
//module.exports={connection};
  module.exports= connection;



