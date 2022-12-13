"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = void 0;
const APIModel_1 = require("./APIModel");
const client_1 = require("@prisma/client");
class TestModel extends APIModel_1.APIModel {
    static tableName = "user";
    static model = new client_1.PrismaClient().user;
}
exports.TestModel = TestModel;
//# sourceMappingURL=TestModel.js.map