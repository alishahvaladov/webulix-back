import { ObjectId } from "mongoose";
import RoleModel from "../../model/RoleModel";
import { RoleDoc } from "../../model/RoleModel";

export interface UpdateRole {
  name?: string,
  group: string[],
  roleAccess: {
    collection_data: ObjectId,
    privilege: string[]
  }
};

class RoleService {
  async getRolesService() {
    const roles = await RoleModel.find();
    return roles;
  };

  async insertRoleService(data: RoleDoc) {
    try {
      const insertedRole = await RoleModel.create(data);
      return insertedRole;
    } catch(error) {
      console.log(error);
    }
  }

  async getRoleByIDService(id: string) {
    const role = await RoleModel.findById(id);
    return role;
  }

  async updateRoleService(data: UpdateRole, id: string) {
    await RoleModel.updateOne({ _id: id }, data);
    return await RoleModel.findOne({ _id: id });
  }

  async deleteRoleService(id: string) {
    const deletedRole = await RoleModel.deleteOne({ _id: id });
    return deletedRole;
  }
}

export const { getRolesService, insertRoleService, getRoleByIDService, updateRoleService, deleteRoleService } = new RoleService();