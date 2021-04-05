import { HttpStatus } from '@nestjs/common';
export class SalidaApi {
  status: HttpStatus;
  data: any;
  message?: string;
}