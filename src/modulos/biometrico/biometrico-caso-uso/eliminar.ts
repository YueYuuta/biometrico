import {  ConflictException, Inject, Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { IBiometricoCasoUso } from './IBiometricoCasoUso';
import { LeerUsuarioModel } from './models/leer-usuario.model';


const BiometricoRepo = () => Inject('BiometricoRepo');
@Injectable({ scope: Scope.REQUEST })
export class EliminarBiometricoCasoUso {
  constructor(
    @BiometricoRepo() private readonly _biometricoRepository: IBiometricoCasoUso,
  ) {}

  async eliminar(id:number,ip:string,puerto:number): Promise<any> {
    try {
      const salida = await this._biometricoRepository.eliminarUsuario(id,ip,puerto);
      return salida;
    } catch (error) {
      throw new InternalServerErrorException(error);
      
    }
   
    // let Instancia;
    // try {
     
    //   Instancia = await this._biometricoRepository.instanciaZklib(ip,puerto);
    //   const Conexion = await this._biometricoRepository.conexionZklib(Instancia);
    //   // const usuarios= await this._biometricoRepository.obtenerUsuarios(Instancia);
    //   // const ex = await this.existe(usuarios,id)
    //   // if (usuarios) {
    //     const usuarioZ= await this._biometricoRepository.eliminarUsuario(id,Instancia);
    //     await this._biometricoRepository.cerrarConexionZklib(Instancia);
    //   // }else{
    //   //   throw new ConflictException(`El usuario con id:${id} no existe!`);
    //   // }
    //   return true;
    // } catch (error) {
    //   await this._biometricoRepository.cerrarConexionZklib(Instancia);
    //   throw new InternalServerErrorException(error);
    // }
  }

  async existe(usuarios:LeerUsuarioModel[],id:number):Promise<boolean>{
    return  usuarios.findIndex((x) => x.uid === id) > -1;
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
