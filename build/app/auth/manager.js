"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../../lib/helpers/bcrypt");
const service_1 = require("../user/service");
const jwt_1 = require("../../lib/helpers/jwt");
class AuthManager {
}
_a = AuthManager;
AuthManager.signup = async (data) => {
    try {
        await (0, service_1.createUser)(data);
    }
    catch (error) {
        //log it into audit file
        console.log(error);
        //move to a constant file
        throw new Error("User with this username/email already exists");
    }
};
AuthManager.login = async (req) => {
    try {
        const data = req.body;
        const user = await (0, service_1.findUserByEmail)(data.email);
        (0, bcrypt_1.ComparePassword)(user.password, data.password);
        return (0, jwt_1.getAuthTokens)(req, user.id);
    }
    catch (error) {
        //log it into audit file
        console.log(error);
        //move to a constant file
        throw new Error("No active users with thse credentials exists");
    }
};
exports.default = AuthManager;
