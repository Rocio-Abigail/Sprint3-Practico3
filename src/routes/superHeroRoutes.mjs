import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    //crearSuperHeroeController,
    actualizarSuperHeroeController,
    eliminarSuperHeroePorIdController,
    eliminarSuperHeroePorNombreController,
    agregarSuperheroeController,
    mostrarFormularioEdicion,
    editarSuperHeroeController,

} from '../controllers/superheroesController.mjs';
import { transformarCamposArray } from '../middlewares/validacionesSuperheroe.mjs';
import { validarSuperHeroe } from '../middlewares/validacionesSuperheroe.mjs';
import { manejarErroresDeValidacion } from '../middlewares/validarErrores.mjs';
import { mostrarDashboard } from '../controllers/superheroesController.mjs';
import methodOverride from 'method-override';

const router = express.Router();

router.use(methodOverride('_method'));

router.get('/dashboard', mostrarDashboard);

router.get("/formulario", (req, res) => {
  const exito = req.query.exito === 'true';
  res.render("addSuperhero", { errores: [], datos: {}, exito });
});

router.get('/heroes/:id/editar', mostrarFormularioEdicion);
router.put('/heroes/:id/editar',transformarCamposArray, validarSuperHeroe, manejarErroresDeValidacion, editarSuperHeroeController);
router.delete("/heroes/:id", eliminarSuperHeroePorIdController);
router.post("/heroes/agregar",transformarCamposArray, validarSuperHeroe, manejarErroresDeValidacion, agregarSuperheroeController);
router.get('/heroes', obtenerTodosLosSuperheroesController);

router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.put('/heroes/actualizar/:id',validarSuperHeroe, manejarErroresDeValidacion, actualizarSuperHeroeController);
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperHeroePorNombreController)
export default router;
