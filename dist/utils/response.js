"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBTransaction = void 0;
class DBTransaction {
    statusCode;
    message;
    data;
    constructor(data, message, statusCode) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.DBTransaction = DBTransaction;
//# sourceMappingURL=response.js.map