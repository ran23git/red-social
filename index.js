//importar DEPENDENCIAS
//const { connection } = require("mongoose"); //este tambien esta bien para hacer la conexion
const connection = require('./database/connection');

const express = require('express'); //permite trabajar con peticiones HTTP en varias URL
const cors = require('cors'); //convierte a JSON antes de ejecutar 1 ruta


//mensaje de bienvenida para avisar que arranco la app de node
console.log("API NODE para RED SOCIAL arrancada!!!");

//1-conexion a la base de datos         
        //A_arrancar el DEMONIO de mongo (creo 1 arrancar-proyecto.bat para no tenr q estar arrancandolo manualmente todas las veces)
        //B-revisar con mongo compass q no este creada la base de datos q kiero usar
        connection();
        
//2-crear servidor node --app ES LA APLICACION Q ESToY CONSTRUYENDO
        const app = express();//permite trabajar con peticiones HTTP en varias URL
        const puerto = 3900;//indico el puerto a utilizar(puede ser cualquier numero)
    
//3-configurar CORS 
        app.use(cors()); //uso 1 middleware--app.use(cors());--, q se ejecutará antes q se ejecuten las rutas

//4-convertir los dtos de body a objetos JS
        app.use(express.json());                       //recibe datos en formato JSON
        app.use(express.urlencoded({extended:true}));  //recibe datos en formato FORMULARIO NORMAL y los convierte a JSON

//5-cargar configuraciones de rutas
const UserRoutes        = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes      = require("./routes/follow");

//app.use se usa para cargar/ejecutar 1 configuracion dentro de EXPRESS
//ahora cargo dentro de EXPRESS la configuracion de la ruta, y le pongo el prefijo "/api" 
          //para c/u de las rutas, seguido del nomre de la ruta "UserRoutes"
app.use("/api/user", UserRoutes);
app.use("/api/publication", PublicationRoutes);
app.use("/api/follow", FollowRoutes);

//ruta de prueba
app.get("/ruta-prueba", (req, res) =>{  //uso GET xq kiero mostrarlo en el NAVEGADOR.  le paso lo q quiero q haga ESA ruta:
        console.log("Se ha ejecutado el EDNPOINT probando");//REQ es la peticion q yo hago, y RES es la respuesta
                                                            //RES    devuelve ese mensaje en CONSOLA
                                                            //RETURN devuelve ese mensaje al NAVEGADOR(es obligatorio)
        return res.status(200).json([{
            curso: "MAster en React1",
            autor: "viscto robles1",
            url: "victorroblesweb.es/master-react1"
        },
        {
            curso: "MAster en React2",
            autor: "viscto robles2",
            url: "victorroblesweb.es/master-react2"
        }
       ]);
    });

//6-poner servidor a escuchar peticiones http
//crear servidor y escuchar peticiones http (al 1°parametro le paso elpuerto, el 2° parametro es 1 callback q envia mensaje)
app.listen(puerto,() =>{
        console.log("servidor corriendo en el puerto"+puerto);
    }); 