import { HttpErrorResponse } from '@angular/common/http';
import {StatusEnum,Status} from '../store/global-config/model';
import {SetStatus} from '../store/global-config/actions';
import { ComponentFactoryResolver } from '@angular/core';


export enum ExecMode {
  prod = 'prod',
  mock = 'mock',
}
/**
 * Global status handler
 */
export class GlobalConfig {
  private static errorMsg = 'Erreur de connection. Veuillez Contacter l\'administrateur';
  static setStatus(status: StatusEnum, localMessage?: string, error?: HttpErrorResponse) {
    console.log(error);
    if (localMessage) {
      return SetStatus({status, message: localMessage});
    } else {
      switch (error.status) {
        case 200:
          return SetStatus({status: StatusEnum.success, message: 'Opération reussie !'});
        case 404: {
          if (!error.error) {
            return SetStatus({status, message: this.errorMsg});
          } else if (error.error.message) {
            if (error.error.message.indexOf('available') !== 0) {
              // ici mon cas
              return SetStatus({status, message: error.error.message});
            } else {
              return SetStatus({status, message: error.error.message});
            }
          } else if (error.error instanceof ArrayBuffer) {
            const msg = this.returnMsgFromArrayBuffer(error.error);
            return SetStatus({status, message: msg});
          } else {
            return SetStatus({status, message: this.errorMsg});
          }
        }
        case 500:
          return SetStatus({status, message: this.errorMsg});
        default: {
          if (!error.error) {
            return SetStatus({status, message: this.errorMsg});
          } else if (error.error.message) {
            return SetStatus({status, message: error.error.message});
          } else if (error.error instanceof ArrayBuffer) {
            const msg = this.returnMsgFromArrayBuffer(error.error);
            return SetStatus({status, message: msg});
          } else {
            return SetStatus({status, message: this.errorMsg});
          }
        }
      }
    }
  }

  static getEndpoint(urlObj: any, execMode = ExecMode.prod): string {
    return urlObj[execMode];
  }

  static returnMsgFromArrayBuffer(buf: ArrayBuffer): string {
    let response;
    if ('TextDecoder' in window) {
      // Decode as UTF-8
      const dataView = new DataView(buf);
      const decoder = new TextDecoder('utf8');
      response = JSON.parse(decoder.decode(dataView));
    } else {
      // Fallback decode as ASCII
      const decodedString = String.fromCharCode.apply(null, new Uint8Array(buf));
      response = JSON.parse(decodedString);
    }
    return response.message;
  }


}

