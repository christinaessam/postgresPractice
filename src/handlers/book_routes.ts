import express,{ Request, Response} from 'express';
import { Book , BookLibrary} from '../models/book';
import * as bodyParser from 'body-parser';

const library = new BookLibrary();

const index = async (_req: Request, res: Response) => {
    const books = await library.index();
    res.json(books);
}
const show = async (req: Request, res: Response) => {
    const book = await library.show(req.params.id as string)
    res.json(book)
 }
 
 const create = async (req: Request, res: Response) => {
     try {
        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            total_pages: req.body.total_pages,
            type: req.body.type,
            summary: req.body.summary
        }
         const newBook = await library.create(book)
         res.json(newBook)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }
 
 const destroy = async (req: Request, res: Response) => {
     const deleted = await library.delete(req.params.id)
     res.json(deleted)
 }
 
 var jsonParser = bodyParser.json();
 const bookRoutes = (app: express.Application) => {
    app.get('/books', jsonParser,index)
    app.get('/books/:id',jsonParser, show)
    app.post('/books', jsonParser,create)
    app.delete('/books/:id', jsonParser,destroy)
  }
  
export default bookRoutes;