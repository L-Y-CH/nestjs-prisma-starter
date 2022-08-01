import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
    imports:[],
    providers:[BooksController, BooksService],
    exports:[BooksService],
    controllers:[BooksController]
})
export class BooksModule {}
