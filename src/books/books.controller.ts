import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';
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

    @Get('just/a/test')
    test(){
        return true;
    }


}
