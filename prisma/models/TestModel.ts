import {APIModel} from "./APIModel";
import {PrismaClient, User} from '@prisma/client'

export class TestModel extends APIModel {
    static tableName: string = "user";
    static model = new PrismaClient().user;

    // constructor(){
    //     super(new PrismaClient().user);
    // }
    // APIModel.model = new PrismaClient().user;
}