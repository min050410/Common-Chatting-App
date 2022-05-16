import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(){
    let message: string = 'Hello World';
    return message;
  }
}
