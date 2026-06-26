
class AppError extends Error{
    statusCode: number;
    statusText: string;
    constructor (statusCode:number , message:string , statusText:string){
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

export default AppError;