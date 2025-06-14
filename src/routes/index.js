import express from 'express';
import usuarios from './usuarios';
import postulantes from './postulantes'
import ofertas from './ofertas'
import empresas from './empresas'
import postulaciones from './postulaciones';
import jornadas from './jornadas';
import contratos from './contratos';
import estudios from './estudios';
import carreras from './carreras';
import provincias from './provincias';
import ciudades from './ciudades';
import idiomas from './idiomas';
import nivelesIdiomas from './nivelesIdiomas';
import files from './files';
import tiposDocumentos from './tiposDocumentos';
import password from './password.js';
import aptitudesPostulantes from './aptitudesPostulantes.js';
import aptitudes from './aptitudes.js';
import aptitudesOfertas from './aptitudesOfertas.js';
import grupos from './grupos.js';
import rubros from './rubros.js';
import abm from './abmModels.js';
import estados from './estados.js';

import {validateToken} from '../middlewares/validador';

const router = express.Router();

router.use('/ofertas', ofertas);
router.use(validateToken);
router.use('/usuarios', usuarios);
router.use('/postulantes', postulantes);
router.use('/empresas', empresas);
router.use('/postulaciones', postulaciones);
router.use('/jornadas', jornadas);
router.use('/contratos', contratos);
router.use('/estudios', estudios);
router.use('/carreras', carreras);
router.use('/provincias', provincias);
router.use('/ciudades', ciudades);
router.use('/idiomas', idiomas);
router.use('/nivelesIdiomas', nivelesIdiomas);
router.use('/files', files);
router.use('/tiposDocumento', tiposDocumentos);
router.use('/password',password);
router.use('/aptitudesPostulantes', aptitudesPostulantes);
router.use('/aptitudes', aptitudes);
router.use('/aptitudesOfertas', aptitudesOfertas);
router.use('/grupos', grupos);
router.use('/rubros', rubros);
router.use('/abm', abm);
router.use('/estados', estados);

export default router;