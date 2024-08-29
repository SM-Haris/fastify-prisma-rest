"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
class UserManager {
}
_a = UserManager;
UserManager.currentUser = async (user_id) => {
    try {
        const user = (0, service_1.fetchSingleUser)(user_id);
        return user;
    }
    catch (error) {
        //log it into audit file
        console.log(error);
        //move to a constant file
        throw new Error("User is not authorized");
    }
};
exports.default = UserManager;
