import express, { NextFunction, Request, Response } from "express";
import Refeicao from "../model/Refeicao";
import { ModelStatic } from "sequelize";
import { sendApiResponse } from "../utils/apiResponse";
import * as yup from "yup";
import { Op } from "sequelize";

class RefeicaoController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const alimentos = await Refeicao.findAll();
      sendApiResponse(res, 200, "Success", alimentos);
    } catch (error) {
      console.log(error);
      sendApiResponse(res, 500, "Error retrieving alimentos", error);
    }
  }

  async create(req: Request, res: Response) {
    const { horario, dietaId, carboidratos, gorduras, calorias } = req.body || {};

    try {
      const newRefeicao = await Refeicao.create({
        dietaId: dietaId,
        horario: horario,
        carboidratos: carboidratos,
        gorduras: gorduras,
        calorias: calorias,
      });

      if (newRefeicao !== undefined) {
        sendApiResponse(
          res,
          200,
          "Refeicao cadastrada com sucesso",
          newRefeicao
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
        await Refeicao.destroy({
          where: {
            id: id,
          },
        });

        sendApiResponse(res, 200, "Alimento deletado com sucesso");
      } catch (erro) {
        sendApiResponse(res, 500, "Erro ao deletar alimento", erro);
      }
    } else {
      sendApiResponse(res, 400, "ID não encontrado");
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { calorias, horario, gorduras, dietaId } = req.body;

    if (id) {
      try {
        const refeicao = await Refeicao.findOne({
          where: {
            id: id,
          },
        });

        if (refeicao) {
          const updatedDieta = await refeicao.update({
            calorias: calorias,
            horario: horario,
            gorduras: gorduras,
            dietaId: dietaId,
          });
          sendApiResponse(res, 201, "Refeicao editado com sucesso");
        } else {
          sendApiResponse(res, 404, "Refeicao não encontrada");
        }
      } catch (erro) {
        sendApiResponse(res, 500, "Erro ao editar Refeicao", erro);
      }
    } else {
      sendApiResponse(res, 400, "ID não encontrado");
    }
  }

  async search(req: Request, res: Response) {
    const query = req.params.query;

    try {
      let results = await Refeicao.findAll({
        where: {
          name: { [Op.like]: "%" + query + "%" },
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

export default RefeicaoController;
