import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {

    constructor(private booksServcie: BooksService){}

    @Get('all')
    getAllBooks(){
        return this.booksServcie.getAllBooks();
    }

    @Get("items")
    getAllItems(){
        return this.booksServcie.getAllItems();
    }


}
