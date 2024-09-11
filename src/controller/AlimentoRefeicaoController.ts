import express, { NextFunction, Request, Response } from "express";
import AlimentoRefeicao from "../model/AlimentoRefeicao";
import Alimento from "../model/Alimento";
import { ModelStatic } from "sequelize";
import { sendApiResponse } from "../utils/apiResponse";
import * as yup from "yup";
import { Op } from "sequelize";

class AlimentoRefeicaoController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const alimentos = await AlimentoRefeicao.findAll();
      sendApiResponse(res, 200, "Success", alimentos);
    } catch (error) {
      console.log(error);
      sendApiResponse(res, 500, "Error retrieving alimentos", error);
    }
  }

  async create(req: Request, res: Response) {
    const { quantidadeTotal, refeicaoId, alimentoId } = req.body || {};

    try {

      const alimento = await Alimento.findOne({
        where:{
          id: alimentoId
        }
      })

      if (!alimento) {
        return sendApiResponse(res, 404, "Alimento não encontrado");
      }

      const multiplicador = quantidadeTotal / alimento.quantidade
      
      const caloriasTotais = multiplicador * parseFloat(alimento?.calorias);
      const carboidratosTotais = multiplicador * alimento?.carboidratos
      const gordurasTotais = multiplicador * alimento?.gorduras
      const proteinasTotais = multiplicador * alimento?.proteinas

      const newAlimentoRefeicao = await AlimentoRefeicao.create({
        quantidadeTotal: quantidadeTotal,
        caloriasTotais: caloriasTotais,
        carboidratosTotais: carboidratosTotais,
        gordurasTotais: gordurasTotais,
        proteinasTotais: proteinasTotais,
        refeicaoId: refeicaoId,
        alimentoId: alimentoId
      });

      if (newAlimentoRefeicao !== undefined) {
        sendApiResponse(
          res,
          200,
          "Cadastrado com sucesso",
          newAlimentoRefeicao
        );
      }
    } catch (erro) {
      const yupError = erro as yup.ValidationError;
      sendApiResponse(res, 500, "Erro ao cadastrar alimento", yupError);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (id) {
      try {
        await AlimentoRefeicao.destroy({
          where: {
            id: id,
          },
        });

        sendApiResponse(res, 200, "Deletado com sucesso");
      } catch (erro) {
        sendApiResponse(res, 500, "Erro ao deletar", erro);
      }
    } else {
      sendApiResponse(res, 400, "ID não encontrado");
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { quantidadeTotal, refeicaoId, alimentoId } = req.body;

    if (id) {
      try {
        const refeicao = await AlimentoRefeicao.findOne({
          where: {
            id: id,
          },
        });

        if (refeicao) {
          const updatedDieta = await refeicao.update({
            quantidadeTotal: quantidadeTotal,
            refeicaoId: refeicaoId,
            alimentoId: alimentoId
          });
          sendApiResponse(res, 201, "Editado com sucesso");
        } else {
          sendApiResponse(res, 404, "Id inválido");
        }
      } catch (erro) {
        sendApiResponse(res, 500, "Erro ao editar", erro);
      }
    } else {
      sendApiResponse(res, 400, "ID não encontrado");
    }
  }

  async search(req: Request, res: Response) {
    const query = req.params.query;

    try {
      let results = await AlimentoRefeicao.findAll({
        where: {
          id: { [Op.like]: "%" + query + "%" },
        },
      });
      if (results.length == 0) {
        sendApiResponse(res, 400, "Não foi possível encontrar o alimento");
      } else {
        sendApiResponse(res, 200, "Alimento encontrado", results);
      }
    } catch (erro) {
      sendApiResponse(res, 400, "Não foi possível encontrar o alimento");
    }
  }
}

export default AlimentoRefeicaoController;
