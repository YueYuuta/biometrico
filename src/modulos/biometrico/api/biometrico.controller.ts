import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Scope,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SalidaApi } from 'src/modulos/shared/models/salida-api';
import { CrearBiometricoCasoUso } from '../biometrico-caso-uso/crear';
import { EliminarBiometricoCasoUso } from '../biometrico-caso-uso/eliminar';
import { LeerBiometricoCasoUso } from '../biometrico-caso-uso/leer';
import { CrearUsuarioDto } from './dto';

const ZKLib = require('zklib');

@Controller({
  path: 'biometrico',
  scope: Scope.REQUEST,
})
export class BiometricoController {
  constructor(
    private readonly _leerBiometricoService: LeerBiometricoCasoUso,
    private readonly _EliminarBiometricoService: EliminarBiometricoCasoUso,
    private readonly _CrearBiometricoService: CrearBiometricoCasoUso,
  ) {}

  @Get('usuarios/:ip/:puerto')
  async obtenerUsuarios(
    @Param('puerto', ParseIntPipe) puerto: number,
    @Param('ip') ip: string,
  ): Promise<SalidaApi> {
    console.log('obtener usuarios', ip, puerto);
    const respuesta = await this._leerBiometricoService.obtenerUsuarios(
      ip,
      puerto,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('asistencias/:ip/:puerto')
  async obtenerResgistroAsistencia(
    @Param('puerto', ParseIntPipe) puerto: number,
    @Param('ip') ip: string,
  ): Promise<SalidaApi> {
    console.log('asistencias', ip, puerto);
    const respuesta = await this._leerBiometricoService.obtenerRegistroAsistencias(
      ip,
      puerto,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Delete('eliminar/registro/asistencias/:ip/:puerto')
  async eliminarResgistroAsistencias(
    @Param('puerto', ParseIntPipe) puerto: number,
    @Param('ip') ip: string,
  ): Promise<any> {
    console.log('eliminar registros', ip, puerto);
    const respuesta = await this._EliminarBiometricoService.eliminarResgistroAsistencias(
      ip,
      puerto,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Registros de asistecias eliminados correctamente!',
    };
  }

  @Delete('eliminar/usuario/:id/:ip/:puerto')
  async eliminarUsuario(
    @Param('puerto', ParseIntPipe) puerto: number,

    @Param('ip') ip: string,

    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    console.log('eliminar/usuario/:id/:ip/:puerto');
    console.log(ip, puerto);
    // const ips = ["172.16.236.202","172.16.236.102"];
    // for (const iterator of ips) {

    //   let inport= Math.random() * (6000 - 5000) + 5000;
    //   let timeout= Math.random() * (6000 - 5000) + 5000;
    //   inport= Math.trunc(inport);
    //   timeout= Math.trunc(timeout);

    //}

    setTimeout(async () => {
      const salida = await this._EliminarBiometricoService.eliminar(
        id,
        ip,
        puerto,
      );
      console.log(salida);
      return salida;
    }, 10000);

    // console.log("elimminar usuario",ip,puerto);
    //  const respuesta= await this._EliminarBiometricoService.eliminar(id,ip,puerto);
    //  return {
    //   status: HttpStatus.OK,
    //   data: respuesta,
    //   message:'Usuario eliminado coreectamente!'
    // };
  }

  @Post('crear/usuario')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearUsuario(@Body() usuario: CrearUsuarioDto): Promise<SalidaApi> {
    console.log('obtener usuarios', usuario.ip, usuario.puerto);
    const respuesta = await this._CrearBiometricoService.crear(usuario);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'usuario creado correctamente!',
    };
  }
}
