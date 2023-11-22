import axios from "axios";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RevalidateService {
  revalidate(name: string) {
    return axios.post(process.env.FRONTEND_URL + '/api/revalidate', {
      name,
    }, {
      headers: {
        serverkey: process.env.BACKEND_TOKEN_PROTECTOR,
      }
    });
  }
}
