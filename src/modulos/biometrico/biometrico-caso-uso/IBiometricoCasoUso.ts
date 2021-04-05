import { LeerAsistenciaModel } from "./models/leer-asistencia.model";
import { LeerUsuarioModel } from "./models/leer-usuario.model";


export interface IBiometricoCasoUso {
  instanciaZklib(ip:string,puerto:number):Promise<any>;
  instanciaNodeZklib(ip:string,puerto:number):Promise<any>;
  conexionZklib(Instancia:any):Promise<boolean>;
  conexionNodeZklib(Instancia:any):Promise<boolean>;
  obtenerUsuarios(Instancia:any):Promise<LeerUsuarioModel[]>
  obtenerRegistroAsistencias(Instancia:any):Promise<any>;
  cerrarConexionZklib(Instancia:any):Promise<any>;
  cerrarConexionNodeZklib(Instancia:any):Promise<any>;
  eliminarRegistrosAsistencia(Instancia:any):Promise<any>;
}
