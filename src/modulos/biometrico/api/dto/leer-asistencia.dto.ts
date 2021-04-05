import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class LeerAsistenciaDto {
    @Expose()
    userSn:	number;
    @Expose()
    deviceUserId: string;
    @Expose()
    recordTime: Date;
    @Expose()
    ip: string;
}