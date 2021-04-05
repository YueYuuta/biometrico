import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerAsistenciaDto } from '../api/dto/leer-asistencia.dto';
import { LeerUsuarioDto } from '../api/dto/leer-usuario.dto';
import { IBiometricoCasoUso } from './IBiometricoCasoUso';
import { LeerAsistenciaModel } from './models/leer-asistencia.model';
import { LeerUsuarioModel } from './models/leer-usuario.model';

const BiometricoRepo = () => Inject('BiometricoRepo');
@Injectable()
export class LeerBiometricoCasoUso {
  constructor(
    @BiometricoRepo() private readonly _biometricoRepository: IBiometricoCasoUso,
  ) {}

 async  obtenerUsuarios(ip:string,puerto:number):Promise<LeerUsuarioDto[]>{
  try {
    const Instancia = await this._biometricoRepository.instanciaZklib(ip,puerto);
    const Conexion = await this._biometricoRepository.conexionZklib(Instancia);
    const usuarios =  await this._biometricoRepository.obtenerUsuarios(Instancia);
    await this._biometricoRepository.cerrarConexionZklib(Instancia);
    return usuarios.map((usuario: LeerUsuarioModel) => plainToClass(LeerUsuarioDto, usuario));
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
 }

 async  obtenerRegistroAsistencias(ip:string,puerto:number):Promise<LeerAsistenciaDto[]>{
  try {
    const Instancia = await this._biometricoRepository.instanciaNodeZklib(ip,puerto);
    const Conexion = await this._biometricoRepository.conexionNodeZklib(Instancia);
    const asistencias =  await this._biometricoRepository.obtenerRegistroAsistencias(Instancia);
    await this._biometricoRepository.cerrarConexionNodeZklib(Instancia);
    return asistencias.data.map((asistencia: LeerAsistenciaModel) => plainToClass(LeerAsistenciaDto, asistencia));
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
 }

 async existe (ip:string,puerto:number){
  try {
    const Instancia = await this._biometricoRepository.instanciaZklib(ip,puerto);
    const Conexion = await this._biometricoRepository.conexionZklib(Instancia);
    return await this._biometricoRepository.obtenerUsuarios(Instancia);
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
 }


 
}
