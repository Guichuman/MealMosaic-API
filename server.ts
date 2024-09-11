import express, { Application, Request, Response } from 'express';
import database from "./src/database/database"
import cors from 'cors';
import bodyParser from "body-parser";
import http from "http";
import routes from './src/routes/routes'
import Cliente from './src/model/Cliente';
import Dieta from './src/model/Dieta';
import Consulta from './src/model/Consulta';
import Medida from './src/model/Medida';
import Circunferencia from './src/model/Circunferencia';
import Refeicao from './src/model/Refeicao';
import AlimentoRefeicao from './src/model/AlimentoRefeicao';
import path from 'path';



/*
Alimento.sync({force:true})
Cliente.sync({force:true})
Consulta.sync({force:true})
Dieta.sync({force:true})
AlimentoRefeicao.sync({force:true})
Refeicao.sync({force:true})
*/
const app: Application = express();

app.use(cors({
    credentials: true
}));

app.use(express.json())
app.use(routes);
app.use('/static', express.static(path.join(__dirname, 'public')));

database.authenticate()
  .then(() => {
      console.log('conectado no banco')
  }).catch((error: any) => {
      console.log(error)
  })

app.listen(8000, () => console.log("rodando"));


