import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BooksService {

    constructor(private prisma:PrismaService){}

    async getAllBooks(){
        return this.prisma.book.findMany();
    }

    async getAllItems(){
        return this.prisma.item.findMany();
    }
    
}
