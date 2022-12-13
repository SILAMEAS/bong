import {APIModel} from "./APIModel";
import {PrismaClient} from '@prisma/client'

export class PostModel extends APIModel {
    static tableName: string = "post";
    static model = new PrismaClient().post;
    // constructor(){
    //     super(new PrismaClient().post);
    // }
    private item = PostModel.getItem(1);
}