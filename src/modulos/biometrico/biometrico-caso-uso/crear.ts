import { Inject, Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { CrearUsuarioDto } from '../api/dto';
import { IBiometricoCasoUso } from './IBiometricoCasoUso';




const BiometricoRepo = () => Inject('BiometricoRepo');
@Injectable()
export class CrearBiometricoCasoUso {
  constructor(
    @BiometricoRepo() private readonly _biometricoRepository: IBiometricoCasoUso,
  ) {}

  async crear(usuario:CrearUsuarioDto): Promise<any> {
    try {
      const Instancia = await this._biometricoRepository.instanciaZklib(usuario.ip,usuario.puerto);
      const Conexion = await this._biometricoRepository.conexionZklib(Instancia);
      const usuarioZ= await this._biometricoRepository.crearUsuario(usuario,Instancia)
      await this._biometricoRepository.cerrarConexionZklib(Instancia);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
