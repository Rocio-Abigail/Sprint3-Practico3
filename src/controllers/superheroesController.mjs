import { validationResult } from 'express-validator';
import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    crearSuperHeroe,
    actualizarSuperHeroe,
    eliminarSuperHeroePorId,
    eliminarSuperHeroePorNombre,
} from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        console.error("[Controlador] Error:", error);
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}
export async function mostrarDashboard(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    const exito = req.query.exito;
    //console.log("[Dashboard] Valor de exito:", exito);
    
    console.log("[Controlador] Mostrando dashboard con superhéroes:", superheroes.length);

    res.render('dashboard', { superheroes, exito });
  } catch (error) {
    console.error("[Controlador] Error al mostrar dashboard:", error.message);
    res.status(500).send("Error al cargar el dashboard");
  }
}
export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }

        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}
 
export const agregarSuperheroeController = async (req, res) => {
    console.log('[CONTROLLER] Datos recibidos del formulario:', req.body);
  
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log('[CONTROLLER] Errores de validación:', errores.array());
      return res.status(400).render('addSuperhero', {
        errores: errores.array(),
        datos: req.body,
      });
    }
  
    try {
      const {
        nombreSuperHeroe,
        nombreReal,
        edad,
        planetaOrigen,
        debilidad,
        poderes,
        aliados,
        enemigos,
        creador,
      } = req.body;
  
      const nuevoSuperheroe = {
        nombreSuperHeroe,
        nombreReal,
        edad: parseInt(edad),
        planetaOrigen,
        debilidad,
        poderes,
        aliados,
        enemigos,
        creador,
      };
  
      const resultado = await crearSuperHeroe(nuevoSuperheroe);
      console.log('[CONTROLLER] Superhéroe creado con éxito:', resultado);
      return res.redirect('/api/dashboard');
      
    } catch (error) {
      console.error('Error al agregar superhéroe:', error);
      return res.status(500).render('addSuperhero', {
        errores: [{ msg: 'Error interno al guardar el superhéroe.' }],
        datos: req.body
      });
   }
 };
  
export async function crearSuperHeroeController(req, res) {
    console.log("[Controlador] Petición recibida para crear un nuevo superhéroe.");
    
    try {
        const nuevoHeroe = await crearSuperHeroe(req.body);  // Llamamos al servicio
        console.log("[Controlador] Superhéroe creado con éxito:", nuevoHeroe);
        res.status(201).json(nuevoHeroe);
    } catch (error) {
        console.error("[Controlador] Error al crear superhéroe:", error);
        res.status(500).json({ mensaje: "Error al crear superhéroe", error: error.message });
    }
}

export async function mostrarFormularioEdicion(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
      return res.status(404).send('Superhéroe no encontrado');
    }

    const exito = req.query.exito === 'true'; //  Leemos el query param

    res.render('editSuperhero', {
      superheroe,
      errores: [],
      exito // Lo pasamos a la vista
    });
  } catch (error) {
    console.error('[Controlador] Error al mostrar formulario de edición:', error.message);
    res.status(500).send('Error al mostrar formulario de edición');
  }
}
  export async function editarSuperHeroeController(req, res) {
    const errores = validationResult(req);
    const { id } = req.params;
  
    if (!errores.isEmpty()) {
      const superheroe = { ...req.body, _id: id };
      return res.status(400).render('editSuperhero', {
        errores: errores.array(),
        superheroe
      });
    }
  
    try {
      const datosActualizados = {
        ...req.body,
        edad: parseInt(req.body.edad),
        poderes: req.body.poderes,
        aliados: req.body.aliados,
        enemigos: req.body.enemigos
      };
  
      const actualizado = await actualizarSuperHeroe(id, datosActualizados);
  
      if (!actualizado) {
        return res.status(404).send('Superhéroe no encontrado');
      }
  
      res.redirect('/api/dashboard'); 

    } catch (error) {
      console.error('[Controlador] Error al editar superhéroe:', error.message);
      res.status(500).render('editSuperhero', {
        errores: [{ msg: 'Error interno al editar el superhéroe.' }],
        superheroe: { ...req.body, _id: id }
      });
    }
  }

  export async function actualizarSuperHeroeController(req, res) {
    console.log("[Controlador] Petición recibida para actualizar un superhéroe.");

    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const superheroeActualizado = await actualizarSuperHeroe(id, datosActualizados);

        if (!superheroeActualizado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        console.log("[Controlador] Superhéroe actualizado con éxito:", superheroeActualizado);
        res.status(200).json(superheroeActualizado);
    } catch (error) {
        console.error("[Controlador] Error al actualizar superhéroe:", error);
        res.status(500).json({ mensaje: "Error al actualizar superhéroe", error: error.message });
    }
}

export async function eliminarSuperHeroePorIdController(req, res) {
  console.log("[Controlador] Petición para eliminar superhéroe con ID:", req.params.id);

  try {
      const superheroeEliminado = await eliminarSuperHeroePorId(req.params.id);

      if (!superheroeEliminado) {
          return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
      }

      console.log("[Controlador] Superhéroe eliminado:", superheroeEliminado);
      
      // Redirigir al dashboard con el mensaje de éxito
      //res.redirect('/api/dashboard?exito=eliminado');
      res.redirect('/api/dashboard');

  } catch (error) {
      console.error("[Controlador] Error al eliminar superhéroe:", error);
      res.status(500).json({ mensaje: "Error al eliminar superhéroe", error: error.message });
  }
}

export async function eliminarSuperHeroePorNombreController(req, res) {
    console.log("[Controlador] Petición para eliminar superhéroe con nombre:", req.params.nombre);

    try {
        const superheroeEliminado = await eliminarSuperHeroePorNombre(req.params.nombre);

        if (!superheroeEliminado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        console.log("[Controlador] Superhéroe eliminado:", superheroeEliminado);
        res.status(200).json({ mensaje: "Superhéroe eliminado", superheroe: superheroeEliminado });

    } catch (error) {
        console.error("[Controlador] Error al eliminar superhéroe:", error);
        res.status(500).json({ mensaje: "Error al eliminar superhéroe", error: error.message });
    }
}
