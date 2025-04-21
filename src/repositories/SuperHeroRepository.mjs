import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find( {} );
    }

    async buscarPorAtributo(atributo, valor){
        return await SuperHero.find({[atributo]: valor });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: "Tierra",
            $expr: { $gte: [{ $size: "$poderes" }, 2] }
        });
    }  
    
    //TP1 Sprint3

    async crearSuperHeroe(datosHeroe) {
        console.log("[Repositorio] Insertando en la base de datos:", datosHeroe);
        return await SuperHero.create(datosHeroe);
    }
    
    async actualizarSuperHeroe(id, datosActualizados) {
        console.log("[Repositorio] Actualizando en la base de datos el ID:", id, "con datos:", datosActualizados);
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }
    
    async eliminarSuperHeroePorId(id) {
        console.log("[Repositorio] Eliminando de la base de datos el superhéroe con id:", id);
        return await SuperHero.findByIdAndDelete(id);
    }
    
    async eliminarSuperHeroePorNombre(nombre) {
        console.log("[Repositorio] Eliminando de la base de datos el superhéroe con nombre:", nombre);
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }
    
}

export default new SuperHeroRepository();