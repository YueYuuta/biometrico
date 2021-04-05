import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class EditarCantonDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio!' })
  @IsString()
  readonly Nombre: string;

  @IsNotEmpty({ message: 'La provincia no debe ir vacia!' })
  @IsNumber()
  readonly Provincia: number;
}
