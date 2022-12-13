"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const APIModel_1 = require("./APIModel");
const client_1 = require("@prisma/client");
class PostModel extends APIModel_1.APIModel {
    static tableName = "post";
    static model = new client_1.PrismaClient().post;
    // constructor(){
    //     super(new PrismaClient().post);
    // }
    item = PostModel.getItem(1);
}
exports.PostModel = PostModel;
//# sourceMappingURL=PostModel.js.map