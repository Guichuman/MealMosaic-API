import express, { NextFunction, Request, Response } from 'express';
import Cliente from '../model/Cliente';
import { sendApiResponse } from '../utils/apiResponse';
import * as yup from 'yup'
import { Op } from 'sequelize';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class ClienteController {

    async findAll(req: Request, res: Response): Promise<void>{
        try {
            const users = await Cliente.findAll()
            return sendApiResponse(res, 200, 'Success', users);
        } catch (error) {
            console.log(error)
            return sendApiResponse(res, 500, 'Error retrieving users', error);
        }
    }

    async findOne(req: Request, res: Response): Promise<void>{
        const id = req.params.id
        try {
            const users = await Cliente.findOne({
                where: {
                    id: id
                }
            })
            return sendApiResponse(res, 200, 'Success', users);
        } catch (error) {
            console.log(error)
            return sendApiResponse(res, 500, 'Error retrieving users', error);
        }
    }

    async create(req: Request, res: Response){
        const {name, email, password, phone, cpf, plano, height, weight, nutriId} = req.body || {}

        try{

            let hash = await bcrypt.hash(password, 10)

            const newUser = Cliente.create({
                name: name,
                email: email,
                password: hash,
                phone: phone,
                cpf: cpf,
                plano: plano,
                height: height,
                weight: weight,
                status: 1,
                nutriId: nutriId
            })

            if(newUser !== undefined){
                return sendApiResponse(res, 200, 'Usuário cadastrado com sucesso', newUser);
            }

        } catch (erro) {
            const yupError = erro as yup.ValidationError
            return sendApiResponse(res, 500, 'Erro ao cadastrar usuário', yupError);
        }
    }

    async delete(req: Request, res: Response){
        const id = req.params.id

        if(id){
            try{
                await Cliente.destroy({
                    where: {
                        id: id
                    }
                })
            
                return sendApiResponse(res, 200, 'Usuário deletado com sucesso');

            } catch (erro) {
                return sendApiResponse(res, 500, 'Erro ao deletar usuário', erro);
            }

        } else {
            sendApiResponse(res, 400, 'ID não encontrado');
        }
    }

    async update(req: Request, res: Response){
        const id = req.params.id
        const {name, email, password, phone, plano, status, height, weight} = req.body

        if(id){
            try{
                const userCollection = await Cliente.findOne({
                    where: {
                        id: id
                    }
                  });
            
                  if (userCollection) {
                    const updatedUser = await userCollection.update({
                        name: name,
                        email: email,
                        phone: phone,
                        plano: plano,
                        height: height,
                        weight: weight,
                        status: status,
                    }); 
                    
                    return sendApiResponse(res, 201, 'Usuário editado com sucesso');

                  }else{
                    return sendApiResponse(res, 404, 'Usuário não encontrado');
                  }

            } catch(erro) {
                return sendApiResponse(res, 500, 'Erro ao editar usuário', erro);
            }
        }else{
            return sendApiResponse(res, 400, 'ID não encontrado');
        }
    }

    async search(req: Request, res: Response){
        const query = req.params.query

        try {
            let results = await Cliente.findAll({
                where:{
                    name: { [Op.like]: '%'+query+'%' }
                }
            })
            if(results.length == 0){
                return sendApiResponse(res, 400, 'Não foi possível encontrar usuário');
            }else{
                return sendApiResponse(res, 200, 'Usuário encontrado', results);
            }
        } catch (erro) {
            return sendApiResponse(res, 400, 'Não foi possível encontrar usuário');
        }
    }

    async seachClientsFromNutri(req: Request, res: Response){
        const id = req.params.id

        try {

            let results = await Cliente.findAll({
                where:{
                    nutriId: id
                }
            })

            if(results.length == 0){
                return sendApiResponse(res, 400, 'Não foi possível encontrar clientes');
            }
                
            return sendApiResponse(res, 200, 'Cliente(s) encontrado', results);
            
        } catch (erro) {
            return sendApiResponse(res, 400, 'Não foi possível encontrar clientes');
        }
    }

    async auth(req: Request, res: Response){
        const {email, password} = req.body || {}

        const user = await Cliente.findOne({
            where: {
                email: email
            }
        });

        if(user){

            try{
                const result = await bcrypt.compare(password, user.password)
                
                if(result == true){

                    const secret = process.env.JWT_SECRET

                    const token = jwt.sign({email: email}, secret as string, {
                        expiresIn: 5000
                    })

                    return sendApiResponse(res, 200, "Logado", { token });

                }
    
                return sendApiResponse(res, 400, 'Senha incorreta');

            }catch(err){
                return sendApiResponse(res, 400, 'Não foi possível encontrar usuário');
            }

        }else{
            return sendApiResponse(res, 400, 'Não foi possível encontrar usuário');
        }
    }

    async verifyEmail(req: Request, res: Response){
        const {email} = req.body

        const user = await Cliente.findOne({
            where: {
                email: email
            }
        });

        if(user){
            return sendApiResponse(res, 400, "Email já cadastrado")
        }

        return sendApiResponse(res, 200, "Email válido")
    }


}

export default ClienteController