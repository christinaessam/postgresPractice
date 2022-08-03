import express,{ Request, Response} from 'express';

const app:express.Application=express();
const address:string="0.0.0.0:4000";

app.get('/',function(req:Request,res:Response){
    res.send("hello in my app");
})
app.listen(4000,function(){
    console.log(`starting the app on ${address}`);
})