import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { dispatchStatus, epubFormat, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}


  async getUsers(withBook:boolean = true ,withItem:boolean = true){
    return this.prisma.user.findMany({
      // select:{
      //   id:true,
      //   firstname:true,
      //   lastname:true,
      //   email:true,
      //   book:{
      //     where: {
      //       status: "readable"
      //     },
      //     select:{
      //       bookUniId:true,
      //       progress:true,
      //       item:true
      //     }
      //   }
      // }
      include:{
        book: withBook? {
          // select: {
          //   bookUniId:true,
          //   progress:true,
          // },
          // where: {
          //   status: "readable"
          // },
          include: {
            item: withItem
          }
        } : false
      } 
    })
  }

  async createUser(newUser: Prisma.UserCreateInput) {

    return this.prisma.user.upsert({
      where: {
        email: newUser.email
      },
      update: {
        password: newUser.password
      },
      create: Object.assign(newUser, {
        book: {
          create: {
            bookUniId: 'G000000001_reflowable_normal',
            ownerId: newUser.id,
            curVersion: 'V1.0.0',
            progress: '',
            percnetage: 0,
            format: epubFormat.reflowable,
            status: dispatchStatus.readable,
            item: {
              connectOrCreate: {
                where: {
                  id: 'G000000001',
                },
                create: {
                  id: 'G000000001',
                  info: {}
                }
              }
            }
          }
        }
      }),
      select: {
        id: true,
        email: true,
        book: {
          select: {
            bookUniId: true,
            progress: true,
            item: true
          },
          where: {
            status: "readable"
          }
        }
      }
    });
  }

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
}
