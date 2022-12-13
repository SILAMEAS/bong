export class DBTransaction {
    public statusCode: number;
    public message: string;
    public data: object| null ;
    constructor(data: object | null, message: string, statusCode: number) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }
}