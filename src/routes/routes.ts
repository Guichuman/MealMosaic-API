import express from 'express';
import UserController from '../controller/UserController';
import DietaController from '../controller/DietaController';
import AlimentoController from '../controller/AlimentoController';
import ClienteController from '../controller/ClienteController';
import RefeicaoController from '../controller/RefeicaoController';
import AlimentoRefeicaoController from '../controller/AlimentoRefeicaoController';
import authenticateToken from '../middleware/authMiddleware'

const router = express.Router();
const userController = new UserController();
const dietaController = new DietaController();
const alimentoController = new AlimentoController();
const clienteController = new ClienteController();
const refeicaoController = new RefeicaoController();
const alimentoRefeicaoController = new AlimentoRefeicaoController();

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

router.get('/dieta',  dietaController.findAll);
router.post('/dieta',  dietaController.create);
router.delete('/dieta/:id',  dietaController.delete);
router.put('/dieta/:id',  dietaController.update);
router.post('/dieta/:query',  dietaController.search);

router.get('/alimento', alimentoController.findAll);
router.post('/alimento', alimentoController.create);
router.delete('/alimento/:id', alimentoController.delete);
router.put('/alimento/:id', alimentoController.update);
router.post('/alimento/:query', alimentoController.search);

router.get('/refeicao', refeicaoController.findAll);
router.post('/refeicao', refeicaoController.create);
router.delete('/refeicao/:id', refeicaoController.delete);
router.put('/refeicao/:id', refeicaoController.update);

router.get('/alimentoRefeicao', alimentoRefeicaoController.findAll);
router.post('/alimentoRefeicao', alimentoRefeicaoController.create);
router.delete('/alimentoRefeicao/:id', alimentoRefeicaoController.delete);
router.put('/alimentoRefeicao/:id', alimentoRefeicaoController.update);

export default router;