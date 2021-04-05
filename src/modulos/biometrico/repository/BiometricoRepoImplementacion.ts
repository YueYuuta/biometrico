import {
  Injectable
} from '@nestjs/common';
import { credenciales } from 'src/enums/credenciales.enum';
import { IBiometricoCasoUso } from '../biometrico-caso-uso/IBiometricoCasoUso';
import { CrearUsuarioModel } from '../biometrico-caso-uso/models/crear-usuario.model';
import { LeerAsistenciaModel } from '../biometrico-caso-uso/models/leer-asistencia.model';
import { LeerUsuarioModel } from '../biometrico-caso-uso/models/leer-usuario.model';
const ZKLib = require('zklib');
const NZKLib = require('../../../../node_modules/node-zklib')


@Injectable()
export class BiometricoRepoService implements IBiometricoCasoUso {
  constructor() {}
  crearUsuario(usuario: CrearUsuarioModel,Instancia:any): Promise<any> {
    return new Promise((resolve,reject)=>{
      Instancia.setUser(usuario.user_id,usuario.password,usuario.name,usuario.user_id,function(err, result){
        if (err) reject(err);
              resolve(result);
      });
    })
    
  }
  async eliminarRegistrosAsistencia(Instancia: any): Promise<any> {
    Instancia.clearAttendanceLog();
  }
  async cerrarConexionZklib(Instancia:any): Promise<any> {
    Instancia.disconnect();
   
  }
  async cerrarConexionNodeZklib(Instancia:any): Promise<any> {
    
    await Instancia.disconnect()
  }
   async obtenerRegistroAsistencias(Instancia:any): Promise<any> {
    return await Instancia.getAttendances()
  }
  instanciaNodeZklib(ip: string, puerto: number): Promise<any> {
    let zkInstance = new NZKLib(ip, puerto, 10000, 4000);
    return zkInstance;
  }
  async instanciaZklib(ip:string,puerto:number): Promise<any> {
    let ZK = new ZKLib({
      ip:ip,
      port: puerto,
      inport: 5200,
      timeout: 5000,
    });

    return ZK;
  }
  
  conexionZklib(Instancia:any): Promise<boolean> {
    return new Promise((resolve,reject)=>{
      Instancia.connect(async function(err) {
              if (err) reject(err);
              resolve(true);
            });
             
    });
  }
  async conexionNodeZklib(Instancia:any): Promise<any> {
      await Instancia.createSocket();
  }
  obtenerUsuarios(Instancia:any): Promise<LeerUsuarioModel[]> {
    return new Promise((resolve,reject)=>{
      Instancia.getUser(async function (err, t) {
        if (err) reject(err);
        resolve(t)
      });
    });
  }
 }
