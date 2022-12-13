import { PrismaClient, Prisma } from "@prisma/client";

interface DefaultMethod{
    findFirst(param:object): Promise<object>;
    findUnique(param:object): Promise<object>;
    findUniqueOrThrow(param:object): Promise<object>;
    findMany(param:object): Promise<object[]>;
    findManyOrThrow(param:object): Promise<object[]>;
    create(param:object): Promise<object>;
    update(param:object): Promise<object>;
}
interface DefaultModel{
    where?:{};
    include?:{};
    select?:{};
    data?:{};
}
enum MapOperators {
    '=' = 'equal',
    '!=' = 'not',
    '<' = 'lt',
    '>' = 'gt',
    '>=' = 'gte',
    '<=' = 'lte',
    like = 'contains',
    'has'= 'has',
}

export class APIStaticModel<M> {
    static model: any;

    public static async getItem(id: number) {
        const operator = MapOperators["<="];
        const property = 'id';
        // TODO: this data type
        let q:DefaultModel = {};

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
        }
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

    private static async ExecuteQuery(query: any, isTransaction: boolean = false): Promise<object|object[]>{
        if(!isTransaction) return await query;

        const prisma = new PrismaClient();
        // prisma['user'].findUnique({
        //     where:{
        //         id: 1
        //     }
        // });
        //  in the project not like that
        return await prisma.$transaction([query]);
    }
}

export class APIModel extends APIStaticModel<any> {

}