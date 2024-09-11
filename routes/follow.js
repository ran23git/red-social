const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");

//definir rutas
router.get("/prueba-follow", FollowController.pruebaFollow); 
            //nombre de la url que quiero crear-direccion de prueba-Follow -y usar pruebaFollow

//exportar router
module.exports = router;


