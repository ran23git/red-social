const {Schema, model} =  require("mongoose");//importo el esquema de mongoose Y el el metodo MODEL de mongoose
const { default: isEmail } = require("validator/lib/isEmail");
//y ahora si ya puedo craer 1 MODELO


const UserSchema = Schema ({ //le paso como parametro 1 objeto JSON con la definicion de todos mis campos
        name: {
            type: String,
            required: true
               },       
        surname: {
            type: String,
            required: true
                },
        nick: {
            type: String,
            required: true
                },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "role_user"
        },
        image: {
            type: String,
            default: "default.png"
        },
        created_at: {
            type: Date,
            default: Date.now
        }
});

//    al metodo model (le pas 3 parametros NOMBRE de mi modelo User, esquema a usar "UserSchema" y decirle en q clecciond e datos voy a guardar en users)
module.exports = model("User", UserSchema, "users");
//SI LA BASE DE DATOS NO ESTA CREADA, SE CREARA RECIEN CUANDO YO GUARDE MI 1° DOCUMENTO EN 1 COLECCION.




