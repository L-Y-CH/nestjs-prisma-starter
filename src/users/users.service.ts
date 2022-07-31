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


  async getUsers(){
    return this.prisma.user.findMany({
      select:{
        firstname:true,
        lastname:true,
        email:true,
        // updatedAt:true
      }
    })
  }

  async createUser(newUser: Prisma.UserCreateInput){

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
            // itemId: 'G000000001',
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
