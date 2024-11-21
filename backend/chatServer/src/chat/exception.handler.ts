// import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
//
// @Catch()
// export class WebSocketExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToWs();
//     const client = ctx.getClient();
//
//     console.log('exception');
//
//     client.emit('error', exception);
//   }
// }
