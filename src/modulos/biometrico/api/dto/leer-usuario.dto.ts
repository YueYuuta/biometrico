// import { LeerProvinciaDto } from '@modulos/provincia/api/dto';
 import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class LeerUsuarioDto {
    @Expose()
    uid:number;
    @Expose()
    role:number;
    @Expose()
    password:string | null;
    @Expose()
    name:string;
    @Expose()
    cardno:number;
    @Expose()
    userid:number;
}
