
import {
  
  Controller, Delete, Get, HttpStatus, Param, ParseIntPipe,
 
} from '@nestjs/common';
import { SalidaApi } from 'src/modulos/shared/models/salida-api';
import { EliminarBiometricoCasoUso } from '../biometrico-caso-uso/eliminar';
import { LeerBiometricoCasoUso } from '../biometrico-caso-uso/leer';


// @UseGuarKds(AuthGuard('jwt'))
@Controller('biometrico')
export class BiometricoController {
  constructor(
   private readonly _leerBiometricoService:LeerBiometricoCasoUso,
   private readonly _EliminarBiometricoService:EliminarBiometricoCasoUso
  ) {}

  @Get('usuarios/:ip/:puerto')
  async obtenerUsuarios(@Param('puerto', ParseIntPipe) puerto: number,
  @Param('ip') ip: string):Promise<SalidaApi>{
     const respuesta= await this._leerBiometricoService.obtenerUsuarios(ip,puerto);
     return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('asistencias/:ip/:puerto')
  async obtenerResgistroAsistencia(@Param('puerto', ParseIntPipe) puerto: number,
  @Param('ip') ip: string):Promise<SalidaApi>{
     const respuesta= await this._leerBiometricoService.obtenerRegistroAsistencias(ip,puerto);
     return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Delete('eliminar/registro/asistencias/:ip/:puerto')
  async eliminarResgistroAsistencias(@Param('puerto', ParseIntPipe) puerto: number,
  @Param('ip') ip: string):Promise<SalidaApi>{
     const respuesta= await this._EliminarBiometricoService.eliminarResgistroAsistencias(ip,puerto);
     return {
      status: HttpStatus.OK,
      data: respuesta,
      message:'Registros de asistecias eliminados correctamente!'
    };
  }
  
}
