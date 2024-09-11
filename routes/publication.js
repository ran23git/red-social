const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication");

//definir rutas
router.get("/prueba-publication", PublicationController.pruebaPublication); 
            //nombre de la url que quiero crear-direccion de pruebaPublication -y usar pruebaPublication

//exportar router
module.exports = router;