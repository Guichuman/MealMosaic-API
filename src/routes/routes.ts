import express from 'express';
import UserController from '../controller/UserController';
import DietaController from '../controller/DietaController';
import AlimentoController from '../controller/AlimentoController';
import ClienteController from '../controller/ClienteController';
import authenticateToken from '../middleware/authMiddleware'

const router = express.Router();
const userController = new UserController();
const dietaController = new DietaController();
const alimentoController = new AlimentoController();
const clienteController = new ClienteController();

router.get('/user', userController.findAll);
router.post('/user', userController.create);
router.delete('/user/:id', authenticateToken, userController.delete);
router.put('/user/:id', authenticateToken, userController.update);
router.post('/user/:query', userController.search);
router.post('/auth', userController.auth)
router.post('/verifyEmail', userController.verifyEmail)

router.get('/cliente', clienteController.findAll);
router.post('/cliente', clienteController.create);
router.get('/cliente/:id', clienteController.findOne);
router.delete('/cliente/:id', clienteController.delete);
router.put('/cliente/:id', clienteController.update);
router.get('/clientes/:id', clienteController.seachClientsFromNutri);
router.post('/cliente/:query', clienteController.search);
router.post('/auth', clienteController.auth)
router.post('/verifyEmail', clienteController.verifyEmail)

router.get('/dieta', authenticateToken, dietaController.findAll);
router.post('/dieta', authenticateToken, dietaController.create);
router.delete('/dieta/:id', authenticateToken, dietaController.delete);
router.put('/dieta/:id', authenticateToken, dietaController.update);
router.post('/dieta/:query', authenticateToken, dietaController.search);

router.get('/alimento', alimentoController.findAll);
router.post('/alimento', alimentoController.create);
router.delete('/alimento/:id', alimentoController.delete);
router.put('/alimento/:id', alimentoController.update);
router.post('/alimento/:query', alimentoController.search);

export default router;