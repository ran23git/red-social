// Importar dependencias y módulos
//aragon2 es 1 librería para manejar el hash de contraseñas (convierte las contraseñas en 1 cadena alfanumérica)
const bcrypt = require("argon2");
// Importo User q es el Modelo de datos que representa a 1 usuario en la base de datos (para crear y consultar usuarios.)
const User = require("../models/user");

// Acciones de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controller/user.js"
    });
};

// Registro de usuarios-----------------------------------------------------------------------------------------------------------------------
const register = async (req, res) => {
    try {
        // 1° Recoger datos de la petición (valores a guardar)
        let params = req.body; // params guarda los parámetros que llegan del BODY por la 
        //solicitud POST (name, surname, email, password, y nick)

        // 2° Comprobar que me llegan bien (+ validación)
        //si al menos 1 de los campos (name, surname, email, password, o nick) NO tiene un valor VÁLIDO 
        //(es decir, es null, undefined, o una cadena vacía, entre otros), el bloque de código dentro del if se ejecutará.
        if (!params.name || !params.surname || !params.email || !params.password || !params.nick) {
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar"
            });
        } 

        // 3° Controlar usuarios duplicados
        //Busca en la base de datos si ya existe un usuario con el mismo email o nick (convertidos a minúsculas).         
        const users = await User.find({
            $or: [
                { email: params.email.toLowerCase() },
                { nick: params.nick.toLowerCase() }
            ]
        });

        //Si se encuentra 1 usuario duplicado, responde con un mensaje indicando que el usuario ya existe.
        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }

        // 4° Cifrar la contraseña
        //bcrypt.hash toma la contraseña y un número de rondas de hashing (en este caso, 10) y devuelve la contraseña cifrada.
        let hashedPassword = await bcrypt.hash(params.password, 10);
        params.password = hashedPassword;

        // 5° Crear objeto de usuario con los datos validados
        //Crea 1 nueva instancia del modelo User con los datos validados, incluida la contraseña cifrada.
        const userToSave = new User(params);

        // 6° Guardar usuario en la base de datos
        const userStored = await userToSave.save();//espera a que la promesa devuelta por userToSave.save() se resuelva 
        //(mientras el resto del codigo en la funcin ASYNC no se ejecuta)
        //Esto asegura que userStored obtendrá el valor de la operación de guardado solo después de que se complete.


        // 7° Devolver el resultado
        // Responde con un código de estado HTTP 200 (OK) y un mensaje que el usuario fue registrado correctamente.
        return res.status(200).json({
            status: "success",
            message: "Usuario registrado correctamente",
            user: userStored
        });
        //Captura cualquier error que ocurra durante el proceso. Si ocurre un error, responde con un código de estado HTTP 500
        // (Internal Server Error) y un mensaje de error.
    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            status: "error",
            message: "Error en la consulta de usuarios",
            error
        });
    }
};



//------------------------------------------------------------------------------------------------------------------------------------------------
// LOGIN (autenticacion de usuarios)
const login = async (req, res) => {//login es 1 función asíncrona q toma 2 parámetros: req (la solicitud) y res (la respuesta). 
                                   //async permite el uso de await dentro de la función para manejar promesas de manera más sencilla.

    try {//bloque try para manejar cualquier error que pueda ocurrir dentro del bloque. Si ocurre un error, se pasará al bloque catch.

        // 1°-recoger parametros que me lleguen por la peticion POST
        const params = req.body;  // params guarda los parámetros que llegan del BODY por la 
        // solicitud POST (name, surname, email, password, y nick)

        // comprobar si params.email O params.password NO me llega, hago RETURN 400
        if (!params.email || !params.password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        // 2°-buscar en la base datos si existe ese email, el usuario, etc
        // busca UN solo registro (findOne), y le paso como valor a buscar, el email, que está dentro de params.email 
        const user = await User.findOne({ email: params.email }).exec(); //Se realiza 1 búsqueda en la base de datos para encontrar 1 usuario 
        //cuyo email coincida con el valor proporcionado en params.email. La función findOne se utiliza para encontrar UN solo registro. 
        //El uso de AWAIT asegura que la ejecución se detenga HASTA que se obtenga el RESULTADO de la búsqueda.

        if (!user) {//Si --NO SE ENCUENTRA-- ningún usuario con el email proporcionado, se devuelve una respuesta con un estado HTTP 404 (Not Found)
            return res.status(404).send({
                status: "error",
                message: "NO EXISTE el usuario"
            });
        }

        // 3°-comprobar su contraseña
        // Aquí deberías agregar la lógica para comparar la contraseña
        // Por ejemplo:
        // const isPasswordValid = await bcrypt.compare(params.password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).send({
        //         status: "error",
        //         message: "Contraseña incorrecta"
        //     });
        // }

        // 4°-si la contraseña es correcta, en 1 caso: devolver el TOKEN
        // Aquí deberías agregar la lógica para generar y devolver el token si es necesario
        // Por ejemplo:
        // const token = generateToken(user); // función para generar token
        // return res.status(200).send({
        //     status: "success",
        //     message: "Login exitoso",
        //     token
        // });

        // 5°-                         y en otro caso: datos del USUARIO 
        //si la contraseña es correcta (o si la validación de la contraseña se omite por ahora), se devuelve una respuesta con un estado HTTP 200 (OK) 
        return res.status(200).send({
            status: "success",
            message: "Acción de Login",
            user //muestra los datos del usuario.
        });

//Si --OCURRE CUALQUIER ERROR-- del bloque try, el bloque catch se ejecuta, devolviendo una respuesta con un estado HTTP 500 (Internal Server Error) 
    } catch (error) {
        // Manejo de errores
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor"
        });
    }
}


// Exportar acciones
module.exports = { pruebaUser, register, login };
