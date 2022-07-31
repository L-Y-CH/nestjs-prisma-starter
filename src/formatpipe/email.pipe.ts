import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailPipe implements PipeTransform{
  // transform(value: string, metadata: ArgumentMetadata) {

  //   let haveAtRegex = /(.)*@(.)*[^\.]/g;

  //   if(!haveAtRegex.test(value)) throw new Error("invalid input: email not match format");

  //   return value;
  // }

  transform(value: string, metadata: ArgumentMetadata) {

    console.log(value, metadata);
    return value;
  }
}
