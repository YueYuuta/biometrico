import { Scope } from '@nestjs/common';
import { Inject, Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';


import { CrearUsuarioDto } from '../api/dto';
import { IBiometricoCasoUso } from './IBiometricoCasoUso';
import { LeerUsuarioModel } from './models/leer-usuario.model';




const BiometricoRepo = () => Inject('BiometricoRepo');
@Injectable({ scope: Scope.REQUEST })
export class CrearBiometricoCasoUso {
  constructor(
    @BiometricoRepo() private readonly _biometricoRepository: IBiometricoCasoUso,
  ) {}

  async crear(usuario:CrearUsuarioDto): Promise<any> {
    let Instancia;
    try {
     
      Instancia = await this._biometricoRepository.instanciaZklib(usuario.ip,usuario.puerto);
      const Conexion = await this._biometricoRepository.conexionZklib(Instancia);
      // const usuarios= await this._biometricoRepository.obtenerUsuarios(Instancia);
      // const ex = await this.existe(usuarios,usuario.user_id)
      // if (!ex) {
        const usuarioZ= await this._biometricoRepository.crearUsuario(usuario,Instancia);
        await this._biometricoRepository.cerrarConexionZklib(Instancia);
      // }else{
      //   throw new ConflictException(`El usuario con id:${usuario.user_id} ya existe!`);
      // }
      return true;
    } catch (error) {
      await this._biometricoRepository.cerrarConexionZklib(Instancia);
      throw new InternalServerErrorException(error);
    }
  }

  async existe(usuarios:LeerUsuarioModel[],id:number):Promise<boolean>{
    return  usuarios.findIndex((x) => x.uid === id) > -1;
  }

 
}
