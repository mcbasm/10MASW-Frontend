import { environment } from './../../environments/environment';
import * as CryptoJS from 'crypto-js';

export function encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, environment.tokenFE).toString();
}
