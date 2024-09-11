const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

//definir rutas
            //nombre de la url que quiero crear-direccion de pruebaUser -y usar pruebaUSer
router.get("/prueba-usuario", UserController.pruebaUser); 
            
router.post("/register", UserController.register); 

router.post("/login", UserController.login); 

//exportar router
module.exports = router;
