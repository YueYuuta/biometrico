import {  Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IBiometricoCasoUso } from './IBiometricoCasoUso';


const BiometricoRepo = () => Inject('BiometricoRepo');
@Injectable()
export class EliminarBiometricoCasoUso {
  constructor(
    @BiometricoRepo() private readonly _biometricoRepository: IBiometricoCasoUso,
  ) {}

  async eliminar(CantonID: number): Promise<any> {
   
  }

  async eliminarResgistroAsistencias(ip:string,puerto:number):Promise<any>{
    try {
      const Instancia = await this._biometricoRepository.instanciaNodeZklib(ip,puerto);
      const Conexion = await this._biometricoRepository.conexionNodeZklib(Instancia);
      await this._biometricoRepository.eliminarRegistrosAsistencia(Instancia);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    
  }
}
