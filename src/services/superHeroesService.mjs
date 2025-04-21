import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
    console.log("[Servicio] Obteniendo superhéroe por ID:", id);
    try {
        const superheroe = await superHeroRepository.obtenerPorId(id);
        console.log("[Servicio] Superhéroe obtenido:", superheroe);
        return superheroe;
    } catch (error) {
        console.error("[Servicio] Error al obtener superhéroe por ID:", error);
        throw error;
    }
}

export async function obtenerTodosLosSuperheroes() {
    console.log("[Servicio] Obteniendo todos los superhéroes...");
    try {
        const superheroes = await superHeroRepository.obtenerTodos();
        console.log("[Servicio] Superhéroes obtenidos:", superheroes);
        return superheroes;
    } catch (error) {
        console.error("[Servicio] Error al obtener todos los superhéroes:", error);
        throw error;
    }
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    console.log("[Servicio] Buscando superhéroes por atributo:", atributo, "Valor:", valor);
    try {
        const superheroes = await superHeroRepository.buscarPorAtributo(atributo, valor);
        console.log("[Servicio] Superhéroes encontrados:", superheroes);
        return superheroes;
    } catch (error) {
        console.error("[Servicio] Error al buscar superhéroes por atributo:", error);
        throw error;
    }
}

export async function obtenerSuperheroesMayoresDe30() {
    console.log("[Servicio] Obteniendo superhéroes mayores de 30...");
    try {
        const superheroes = await superHeroRepository.obtenerMayoresDe30();
        console.log("[Servicio] Superhéroes mayores de 30 obtenidos:", superheroes);
        return superheroes;
    } catch (error) {
        console.error("[Servicio] Error al obtener superhéroes mayores de 30:", error);
        throw error;
    }
}

export async function crearSuperHeroe(datosHeroe) {
    console.log("[Servicio] Creando superhéroe con datos:", datosHeroe);
    try {
        const nuevoSuperheroe = await superHeroRepository.crearSuperHeroe(datosHeroe);
        console.log("[Servicio] Superhéroe creado:", nuevoSuperheroe);
        return nuevoSuperheroe;
    } catch (error) {
        console.error("[Servicio] Error al crear superhéroe:", error);
        throw error;
    }
}

export async function actualizarSuperHeroe(id, datosActualizados) {
    console.log("[Servicio] Actualizando superhéroe con ID:", id, "Datos:", datosActualizados);
    try {
        const superheroeActualizado = await superHeroRepository.actualizarSuperHeroe(id, datosActualizados);
        console.log("[Servicio] Superhéroe actualizado:", superheroeActualizado);
        return superheroeActualizado;
    } catch (error) {
        console.error("[Servicio] Error al actualizar superhéroe:", error);
        throw error;
    }
}

export async function eliminarSuperHeroePorId(id) {
    console.log("[Servicio] Eliminando superhéroe con ID:", id);
    try {
        const superheroeEliminado = await superHeroRepository.eliminarSuperHeroePorId(id);
        console.log("[Servicio] Superhéroe eliminado:", superheroeEliminado);
        return superheroeEliminado;
    } catch (error) {
        console.error("[Servicio] Error al eliminar superhéroe:", error);
        throw error;
    }
}

export async function eliminarSuperHeroePorNombre(nombre) {
    console.log("[Servicio] Intentando eliminar superhéroe con nombre:", nombre);
    try {
        const superheroeEliminado = await superHeroRepository.eliminarSuperHeroePorNombre(nombre);
        console.log("[Servicio] Superhéroe eliminado:", superheroeEliminado);
        return superheroeEliminado;
    } catch (error) {
        console.error("[Servicio] Error al eliminar superhéroe por nombre:", error);
        throw error;
    }
}

