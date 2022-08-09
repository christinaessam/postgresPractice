import express,{ Request, Response} from 'express';
import { Book } from './models/book';
import * as bodyParser from 'body-parser';
import bookRoutes from './handlers/book_routes';

const app:express.Application=express();
const address:string="0.0.0.0:1000";
var jsonParser = bodyParser.json();

app.get('/',function(req:Request,res:Response){
    res.send("hello in my app");
})
bookRoutes(app);
app.listen(1000,function(){
    console.log(`starting the app on ${address}`);
})
