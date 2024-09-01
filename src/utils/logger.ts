// import dayjs from "dayjs";
// import pino from "pino";
// import { createWriteStream } from "fs";
// import path from "path";

// let logFilePath = path.join(__dirname, "../../logs/application.log")
// const logStream = createWriteStream(logFilePath, {flags: "a"})
// // const log = Logger({
// //     // transport: {
// //     //     target: "pino-pretty"
// //     // },
// //     base: {
// //         pid: false
// //     },
// //     timestamp: ()=> `,"time": "${dayjs().format()}"`,  
    
    
// // }, logFile
// // )

// const log = pino(
//     {
//       base: null,
//       timestamp: () => `,"time":"${dayjs().format('HH:mm:ss.SSS')}"`,
//     },
//     pino.transport({
//       target: "pino-pretty",
//       options: {
//         destination: logStream,
//         colorize: false, // If you want plain text in the file
//         translateTime: "SYS:standard",
//         ignore: "pid,hostname",
//         messageFormat: "[{time}] {level}: {msg}",
//       },
//     })
//   );


// export default log;