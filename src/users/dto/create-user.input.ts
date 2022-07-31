import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateUserInput {

  @MaxLength(20)
  @IsString()
  @IsOptional()
  id?: string;

  @MaxLength(40)
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  password:string;
  firstname?: string;
  lastname?: string;
}
