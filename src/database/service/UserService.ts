import { ModelStatic } from "sequelize";
import User from "../../model/Users";
import resp from "../../utils/resp";

class UserService{
    private model: ModelStatic<User> = User

    async findAll(){
        const users = await this.model.findAll()
        return resp(200, users)
    }
}

export default UserService