import express, { NextFunction, Request, Response } from 'express';
import Alimento from '../model/Alimento';
import { ModelStatic } from "sequelize";
import { sendApiResponse } from '../utils/apiResponse';
import * as yup from 'yup'
import { Op } from 'sequelize';

const bodyValidation = yup.object().shape({
    name: yup.string().min(5),
    quantidade: yup.number().integer().required().min(1),
    calorias: yup.number().integer().required().min(1),
    carboidratos: yup.number(),
    proteinas: yup.number(),
    gorduras: yup.number(),
});

class AlimentoController {
    

    async findAll(req: Request, res: Response): Promise<void>{
        try {
            const alimentos = await Alimento.findAll()
            sendApiResponse(res, 200, 'Success', alimentos);
        } catch (error) {
            console.log(error)
            sendApiResponse(res, 500, 'Error retrieving alimentos', error);
        }
    }


    async create(req: Request, res: Response){
        const {name, quantidade, calorias, carboidratos, proteinas, gorduras} = req.body || {}

        try{
            let validetedData = await bodyValidation.validate(req.body)

            const newAlimento = Alimento.create({
                name: name,
                quantidade: quantidade,
                calorias: calorias,
                carboidratos: carboidratos,
                proteinas: proteinas,
                gorduras: gorduras,
            })

            if(newAlimento !== undefined){
                sendApiResponse(res, 200, 'Alimento cadastrada com sucesso', newAlimento);
            }

        } catch (erro) {
            const yupError = erro as yup.ValidationError
            sendApiResponse(res, 500, 'Erro ao cadastrar alimento', yupError);
        }
    }

    async delete(req: Request, res: Response){
        const id = req.params.id

        if(id){
            try{
                await Alimento.destroy({
                    where: {
                        id: id
                    }
                })
            
                sendApiResponse(res, 200, 'Alimento deletado com sucesso');

            } catch (erro) {
                sendApiResponse(res, 500, 'Erro ao deletar alimento', erro);
            }

        } else {
            sendApiResponse(res, 400, 'ID não encontrado');
        }
    }

    async update(req: Request, res: Response){
        const id = req.params.id
        const {name, quantidade, calorias, carboidratos, proteinas, gorduras} = req.body


        if(id){
            try{
                const alimentoCollection = await Alimento.findOne({
                    where: {
                        id: id
                    }
                  });
            
                  if (alimentoCollection) {
                    const updatedDieta = await alimentoCollection.update({
                        name: name,
                        quantidade: quantidade,
                        calorias: calorias,
                        carboidratos: carboidratos,
                        proteinas: proteinas,
                        gorduras: gorduras,
                    });
                    sendApiResponse(res, 201, 'Alimento editado com sucesso');

                  }else{
                    sendApiResponse(res, 404, 'Alimento não encontrada');
                  }

            } catch(erro) {
                sendApiResponse(res, 500, 'Erro ao editar alimento', erro);
            }
        }else{
            sendApiResponse(res, 400, 'ID não encontrado');
        }
    }

    async search(req: Request, res: Response){
        const query = req.params.query

        try {
            let results = await Alimento.findAll({
                where:{
                    name: { [Op.like]: '%'+query+'%' }
                }
            })
            if(results.length == 0){
                sendApiResponse(res, 400, 'Não foi possível encontrar o alimento');
            }else{
                sendApiResponse(res, 200, 'Alimento encontrado', results);
            }
        } catch (erro) {
            sendApiResponse(res, 400, 'Não foi possível encontrar o alimento');
        }
    }

}

export default AlimentoController