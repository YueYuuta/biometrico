import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const ZKLib = require('../node_modules/node-zklib')
//  const ZKLib = require('zklib');



@Controller()
export class AppController {
  //  ZK = new ZKLib({
  //   ip: '192.168.5.11',
  //   port: 4370,
  //   inport: 5200,
  //   timeout: 5000,
  // });
  constructor(private readonly appService: AppService) {}

  @Get('bio')
  async getHello(): Promise<void> {
  //  const result = await this.appService.conexion();
  //  console.log(result);
    // await this.bio();

  // this.ZK.setUser()
  //   return this.appService.getHello();
  }
  async bio(){
    console.log('inicio')
    let zkInstance = new ZKLib('192.168.1.201', 4370, 10000, 4000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()


        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
        console.log(await zkInstance.getInfo())
    } catch (e) {
        console.log(e)
        if (e.code === 'EADDRINUSE') {
        }
    }


    // Get users in machine 
    const users = await zkInstance.getUsers()
    console.log(users)

   const info=  await zkInstance.getInfo();
   console.log('informacion', info);
   

    // const datos = await zkInstance.executeCmd('CMD_DELETE_USER','4')
    // console.log('consolas',datos);


    //  await zkInstance.getAttendances((data)=>{
    //       // do something when some checkin 
    //       console.log(data)
    //   })
      const logs = await zkInstance.getAttendances()
     console.log('logs normales',logs)

    //  const reallogs = await zkInstance.executeCmd(1017,'')
    //  console.log('real time logs',reallogs)
     

    //  const attendances = await zkInstance.getAttendances((percent, total)=>{
    //    console.log('porcentaje',percent)
    //    console.log('total',total)
    //     // this callbacks take params is the percent of data downloaded and total data need to download 
    // })
    // console.log('attendances',attendances)

  //   zkInstance.getRealTimeLogs((data)=>{
  //     // do something when some checkin 
  //     console.log('datos tiempo',data)
  // })
     
    

    
    


    // Get all logs in the machine 
    // Currently, there is no filter to take data, it just takes all !!
    // const logs = await zkInstance.getAttendances()
    // console.log(logs)


    // const attendances = await zkInstance.getAttendances((percent, total)=>{
    //     // this callbacks take params is the percent of data downloaded and total data need to download 
    // })

    //  // YOu can also read realtime log by getRealTimelogs function
  
    // // console.log('check users', users)

    // zkInstance.getRealTimeLogs((data)=>{
    //     // do something when some checkin 
    //     console.log(data)
    // })



    // // delete the data in machine
    // // You should do this when there are too many data in the machine, this issue can slow down machine 
    // zkInstance.clearAttendanceLog();
    
    // Get the device time
    // const getTime = await zkInstance.getTime();
		//   console.log(getTime.toString());

    // Disconnect the machine ( don't do this when you need realtime update :))) 
    // await zkInstance.disconnect()
  }


//  async bio():Promise<void>{
//     // let zkInstance = new ZKLib('192.168.1.201', 4370, 10000, 4000);
//    let ZK = new ZKLib({
//       ip: '192.168.1.201',
//       port: 4370,
//       inport: 5200,
//       timeout: 5000,
//     });

//     ZK.connect(async function(err) {
//       if (err) throw err;
     
//       // read the time info from th device
//       ZK.getUser(async function (err, t) {
//         // disconnect from the device
       
//         console.log('usuarios',t)
//       });
//       const logs = await ZK.getAttendance()
//     console.log(logs)

//       // ZK.enrollUser(3,async function (err, t) {
//       //   // disconnect from the device
       
//       //   console.log('enrol',t.toString())
//       // })

//       ZK.getAttendance(async function (err, t) {
//         // disconnect from the device
       
//         console.log('atte',t)
//       })

//          // Get all logs in the machine 
//     // Currently, there is no filter to take data, it just takes all !!
  

//       // ZK.executeCmd(13,'',async function(err,respuesta){
//       //   console.log('replica',respuesta)
//       // })
//       // ZK.setUser(4,'','Ingrid',4);
//       // ZK.delUser(4);
//     });
      

//     // ZK.connect(function(err) {
//     //   if (err) throw err;
     
//     //   // read the time info from th device
//     //   ZK.getTime(async function (err, t) {
//     //     // disconnect from the device
//     //     ZK.disconnect();
     
//     //     if (err) throw err;
     
//     //     console.log("Device clock's time is " + t.toString());
        
//     //   });
//     // });
//     // const users = await ZK.getUser()
//     // console.log('usuarios',users)
//   //   try {
//   //       // Create socket to machine 
//   //       await zkInstance.createSocket()
 
 
//   //       // Get general info like logCapacity, user counts, logs count
//   //       // It's really useful to check the status of device 
//   //       console.log(await zkInstance.getInfo())
//   //   } catch (e) {
//   //       console.log(e)
//   //       if (e.code === 'EADDRINUSE') {
//   //       }
//   //   }
 
 
//   //   // Get users in machine 
//   //   const users = await zkInstance.getUsers()
//   //   console.log(users)
 
 
//   //   // Get all logs in the machine 
//   //   // Currently, there is no filter to take data, it just takes all !!
//   //   const logs = await zkInstance.getAttendances()
//   //   console.log(logs)
 
 
//   //   const attendances = await zkInstance.getAttendances('192.168.1.201', (percent, total)=>{
//   //       // this callbacks take params is the percent of data downloaded and total data need to download 
//   //   })
 
//   //    // YOu can also read realtime log by getRealTimelogs function
  
//   //   // console.log('check users', users)
 
//   //   zkInstance.getRealTimeLogs((data)=>{
//   //       // do something when some checkin 
//   //       console.log(data)
//   //   })
 
 
 
//   //   // delete the data in machine
//   //   // You should do this when there are too many data in the machine, this issue can slow down machine 
//   //   zkInstance.clearAttendanceLog();
 
 
//   //   // Disconnect the machine ( don't do this when you need realtime update :))) 
//   //   await zkInstance.disconnect()
//   }

  

}
