import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CredencialesDto {
  @IsNotEmpty({ message: 'La ip no debe ir vacia!' })
  @IsString({message:'La ip debe ser de tipo string!'})
  readonly ip: string;

  @IsNotEmpty({ message: 'El puerto no debe ir vacio!' })
  @IsNumber()
  readonly puerto: number;
}