import { body, validationResult } from 'express-validator';

// Middleware de validaciones
export const validarSuperHeroe = [
  body('nombreSuperHeroe')
    .trim()
    .notEmpty().withMessage('Nombre del superhéroe es requerido')
    .isLength({ min: 3, max: 60 }).withMessage('El Nombre del superhéroe debe tener entre 3 y 60 caracteres'),

  body('nombreReal')
    .trim()
    .notEmpty().withMessage('Nombre real es requerido')
    .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),

  body('edad')
    .trim()
    .notEmpty().withMessage(' Edad es requerida')
    .isInt({ min: 0 }).withMessage('La edad debe ser un número mayor o igual a 0'),


  body('poderes').notEmpty().withMessage('Poderes es requerido')
  .isArray({ min: 1 }).withMessage('Poderes no es un array o está vacío'),
  body('poderes.*')
  .isString().withMessage('Cada poder debe ser una cadena de texto')
  .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres')
  .trim(),
  
  body('aliados')
  .notEmpty().withMessage('Aliados es requerido')
  .isArray({ min: 1 }).withMessage('Aliados no es un array o está vacío'),
body('aliados.*')
  .isString().withMessage('Cada aliado debe ser una cadena de texto')
  .isLength({ min: 3, max: 60 }).withMessage('Cada aliado debe tener entre 3 y 60 caracteres')
  .trim(),

  body('enemigos')
  .notEmpty().withMessage('Enemigos es requerido')
  .isArray({ min: 1 }).withMessage('Enemigos no es un array o está vacío'),
body('enemigos.*')
  .isString().withMessage('Cada enemigo debe ser una cadena de texto')
  .isLength({ min: 3, max: 60 }).withMessage('Cada enemigo debe tener entre 3 y 60 caracteres')
  .trim(),

  (req, res, next) => {
    console.log('[VALIDACIÓN] Ejecutando validaciones...');
    next();
  }
  
];
//Middleware transformarCamposArray.

export const transformarCamposArray = (req, res, next) => {
  const transformar = campo => {
    if (typeof req.body[campo] === 'string') {
      req.body[campo] = req.body[campo]
        .split(',')
        .map(p => p.trim())
        .filter(p => p !== '');
    }
  };

  ['poderes', 'aliados', 'enemigos'].forEach(transformar);

  console.log('[TRANSFORMAR] Campos convertidos a arrays:', {
    poderes: req.body.poderes,
    aliados: req.body.aliados,
    enemigos: req.body.enemigos,
  });

  next();
};


