import {sign, verify} from 'jsonwebtoken';
export class AuthService {
 static signJWT (value: object) {
  return sign(value, process.env.JWT_SECRET!);
 }

 static verifyJWT (token: string) {
  return verify(token, process.env.JWT_SECRET!);
 }
}
