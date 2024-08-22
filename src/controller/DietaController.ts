import express, { NextFunction, Request, Response } from 'express';
import Dieta from '../model/Dieta';
import { ModelStatic } from "sequelize";
import { sendApiResponse } from '../utils/apiResponse';
import * as yup from 'yup'
import { Op } from 'sequelize';

const bodyValidation = yup.object().shape({
    description: yup.string().min(5),
    refs: yup.string().required().min(1),
    calories: yup.string().min(3),
    nutrientes: yup.string().min(1),
    userId: yup.number().integer().required().min(1)
});


class DietaController {

    async findAll(req: Request, res: Response): Promise<void>{
        try {
            const dietas = await Dieta.findAll()
            sendApiResponse(res, 200, 'Success', dietas);
        } catch (error) {
            console.log(error)
            sendApiResponse(res, 500, 'Error retrieving dietas', error);
        }
    }


    async create(req: Request, res: Response){
        const {description, refs, userId, nutrientes, status} = req.body || {}

        try{
            let validetedData = await bodyValidation.validate(req.body)

            const newDieta = Dieta.create({
                description: description,
                refs: refs,
                userId: userId,
                nutrientes: nutrientes,
                status: 1,
            })

            if(newDieta !== undefined){
                sendApiResponse(res, 200, 'Dieta cadastrada com sucesso', newDieta);
            }

        } catch (erro) {
            const yupError = erro as yup.ValidationError
            sendApiResponse(res, 500, 'Erro ao cadastrar dieta', yupError);
        }
    }

    async delete(req: Request, res: Response){
        const id = req.params.id

        if(id){
            try{
                await Dieta.destroy({
                    where: {
                        id: id
                    }
                })
            
                sendApiResponse(res, 200, 'Dieta deletada com sucesso');

            } catch (erro) {
                sendApiResponse(res, 500, 'Erro ao deletar dieta', erro);
            }

        } else {
            sendApiResponse(res, 400, 'ID não encontrado');
        }
    }

    async update(req: Request, res: Response){
        const id = req.params.id
        const {description, refs, userId, status} = req.body


        if(id){
            try{
                const dietaCollection = await Dieta.findOne({
                    where: {
                        id: id
                    }
                  });
            
                  if (dietaCollection) {
                    const updatedDieta = await dietaCollection.update({
                        description: description,
                        refs: refs,
                        userId: userId,
                        status: status,
                    });
                    sendApiResponse(res, 201, 'Dieta editada com sucesso');

                  }else{
                    sendApiResponse(res, 404, 'Dieta não encontrada');
                  }

            } catch(erro) {
                sendApiResponse(res, 500, 'Erro ao editar usuário', erro);
            }
        }else{
            sendApiResponse(res, 400, 'ID não encontrado');
        }
    }

    async search(req: Request, res: Response){
        const query = req.params.query

        try {
            let results = await Dieta.findAll({
                where:{
                    name: { [Op.like]: '%'+query+'%' }
                }
            })
            if(results.length == 0){
                sendApiResponse(res, 400, 'Não foi possível encontrar a dieta');
            }else{
                sendApiResponse(res, 200, 'Dieta encontrada', results);
            }
        } catch (erro) {
            sendApiResponse(res, 400, 'Não foi possível encontrar a dieta');
        }
    }

}

export default DietaController