import { Request, Response } from "express";
import { getRolesService, insertRoleService, getRoleByIDService, updateRoleService, UpdateRole, deleteRoleService } from "../../../services/RoleService";
import NotFoundError from "../../../error/NotFoundError";
import BadRequestError from "../../../error/BadRequestError";
import { isValidObjectId } from "mongoose";

class RoleMiddleware {
  async getRolesMiddleware(req: Request, res: Response) {
    try {
      const roles = await getRolesService();
      return res.status(200).send({
        success: true,
        roles
      });
    } catch (error) {
      throw new NotFoundError([{
        errorCode: "ERROR-15-187-985",
        message: "Not found",
        field: ["Some Field"]
      }]);
    }
  }

  async createRoleMiddleware(req: Request, res: Response) {
    try {
      const body = req.body;
      const addedData = await insertRoleService(body);
      return res.status(201).send({
        success: true,
        role: addedData
      });
    } catch (error) {
      throw new BadRequestError([{
        message: "Missing field",
        errorCode: "Error-10-082-0098"
      }]);
    }
  }

  async getRoleByIDMiddleware(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!isValidObjectId(id)) {
        return res.status(400).send({
          success: false
        });
      }

      const role = await getRoleByIDService(id);
      return res.status(200).send({
        success: true,
        role
      });

    } catch (error) {
      throw new BadRequestError([{
        message: "Missing field",
        errorCode: "Error-10-082-0098"
      }]);
    }
  }

  async updateRoleMiddleware(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const body = req.body as UpdateRole;

      const updatedData = await updateRoleService(body, id);
      return res.status(200).send({
        success: true,
        role: updatedData
      });
    } catch (error) {
      return res.status(400).send({
        success: false
      });
    }
  }

  async deleteRoleMiddleware(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await deleteRoleService(id);

      return res.status(204).send();

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false
      });
    }
  }
}

export const { getRolesMiddleware, createRoleMiddleware, getRoleByIDMiddleware, updateRoleMiddleware, deleteRoleMiddleware } = new RoleMiddleware;