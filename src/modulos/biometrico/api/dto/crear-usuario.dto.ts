import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CrearUsuarioDto {
  @IsNotEmpty({ message: 'El id del usuario no debe ir vacio!' })
  @IsNumber()
  readonly user_id: number;

  @IsNotEmpty({ message: 'La ip donde se guardara el usuario no debe ir vacia!' })
  @IsString()
  readonly ip: string;

  @IsNotEmpty({ message: 'El puerto no debe ir vacio!' })
  @IsNumber()
  readonly puerto: number;

  @IsOptional()
  @IsString()
  readonly password:string | null;

  @IsNotEmpty({ message: 'El nombre del usuario no debe ir vacio!' })
  @IsString()
  readonly name:string;
}
