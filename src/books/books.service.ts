import { Injectable } from '@nestjs/common';
import { Prisma, epubFormat, dispatchStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BooksService {
    
    constructor(
        private prisma:PrismaService
        ){}

    private readonly defaultBook = {
        bookUniId: 'G000000001_reflowable_normal',
        curVersion: 'V1.0.0',
        progress: '',
        percnetage: 0,
        format: epubFormat.reflowable,
        status: dispatchStatus.readable,
    };

    private readonly defaultItem = {
        id: 'G000000001',
        info: {}
    };
    

    async getAllBooks(where?: Prisma.BookWhereUniqueInput){

        return this.prisma.book.findMany({
            where:where
        });
    }

    async getAllItems(){
        return this.prisma.item.findMany();
    }

    // async dispatchBook(owner: Prisma.UserWhereUniqueInput, item: Prisma.ItemCreateInput = this.defaultItem) {

    //     return this.prisma.book.create({
    //         data: Object.assign(this.defaultBook,
    //             {
    //                 item: {
    //                     connectOrCreate: {
    //                         where: {
    //                             id: `${item.id}`
    //                         },
    //                         create: item
    //                     }
    //                 },
    //                 owner: {
    //                     connect: {
    //                         email: owner.email
    //                     }
    //                 }
    //             })
    //     });
    // }

    
}
