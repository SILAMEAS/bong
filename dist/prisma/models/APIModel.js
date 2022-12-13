"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIModel = exports.APIStaticModel = void 0;
const client_1 = require("@prisma/client");
var MapOperators;
(function (MapOperators) {
    MapOperators["="] = "equal";
    MapOperators["!="] = "not";
    MapOperators["<"] = "lt";
    MapOperators[">"] = "gt";
    MapOperators[">="] = "gte";
    MapOperators["<="] = "lte";
    MapOperators["like"] = "contains";
    MapOperators["has"] = "has";
})(MapOperators || (MapOperators = {}));
class APIStaticModel {
    static model;
    static async getItem(id) {
        const operator = MapOperators["<="];
        const property = 'id';
        // TODO: this data type
        let q = {};
        q.where = {
            [property]: {
                [operator]: id,
            },
            posts: {
                some: {
                    title: {
                        contains: 'hello'
                    },
                },
            }
        };
        q.include = {
            posts: true,
        };
        // q.include = {
        //     posts: {
        //         where: {
        //             title: {
        //                 contains: 'test'
        //             },
        //         }
        //     }
        // }
        return await this.ExecuteQuery(this.model.findMany(q));
    }
    static async ExecuteQuery(query, isTransaction = false) {
        if (!isTransaction)
            return await query;
        const prisma = new client_1.PrismaClient();
        // prisma['user'].findUnique({
        //     where:{
        //         id: 1
        //     }
        // });
        //  in the project not like that
        return await prisma.$transaction([query]);
    }
}
exports.APIStaticModel = APIStaticModel;
class APIModel extends APIStaticModel {
}
exports.APIModel = APIModel;
//# sourceMappingURL=APIModel.js.map