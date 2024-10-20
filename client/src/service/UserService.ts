
import http from "../http-common";
import { User } from "../model/User";

const getCurrentUser = () => {
    return http.get<User>("/me");
};

const UserService = {
    getCurrentUser
}

export default UserService;