import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { credenciales } from './enums/credenciales.enum';
import { IRegistroAsistencia } from './models/asistencia';
// libreria para zkteco
const ZKLib = require('zklib');
const NZKLib = require('../node_modules/node-zklib')

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async conexionZklib():Promise<any>{
    let ZK = new ZKLib({
            ip: credenciales.ip,
            port: credenciales.puerto,
            inport: 5200,
            timeout: 5000,
          });
  
    return ZK;
  }

  async conexionNodeZklib():Promise<any>{
    let zkInstance = new NZKLib(credenciales.ip, credenciales.puerto, 10000, 4000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()


        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
        // console.log(await zkInstance.getInfo())
    } catch (e) {
        console.log(e)
        if (e.code === 'EADDRINUSE') {
        }
        throw new InternalServerErrorException(e);
    }
    return zkInstance;
  }

  async obtenerRegistroAsistencia():Promise<IRegistroAsistencia>{
    try {
      const zkInstance = await this.conexionNodeZklib();
      const logs = await zkInstance.getAttendances();
    return logs;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    
  }


  async obtenerUsuarioPromesa():Promise<any>{
    const Instancia = await this.conexionZklib();
    const conexion = await this.conexionPromesa(Instancia);
    return new Promise((resolve,reject)=>{
      Instancia.getUser(async function (err, t) {
        if (err) reject(err);
        resolve(t)
      });
    });

    
    // let salida ;
    // const ZK = await this.conexionZklib();

    // return await ZK.connect(async function(err) {
    //   if (err) throw err;
     
    //   // read the time info from th device

    //  await ZK.getUser(async function (err, t,cb) {
    //               // disconnect from the device
    //             salida = t;
    //             console.log('jhola')
                
    //             });
      // ZK.getTime(function(err, t) {
      //   // disconnect from the device
      //   ZK.disconnect();
     
      //   if (err) throw err;
     
      //   console.log("Device clock's time is " + t.toString());
      // });
    //});
  
   
    // await ZK.getUser(async function (err, t) {
    //           // disconnect from the device
             
    //           console.log('usuarios',t)
    //         });
  }

  async conexionPromesa(Instancia:any):Promise<boolean>{
    // const Instancia = await this.conexionZklib();
    return new Promise((resolve,reject)=>{
      Instancia.connect(async function(err) {
              if (err) reject(err);
              resolve(true);
            });
             
    });
  }





}
