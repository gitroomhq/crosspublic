import axios from "axios";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RevalidateService {
  async revalidate(name: string) {
    try {
      console.log(process.env.REVALIDATE_URL + '/api/revalidate');
      await axios.post(process.env.REVALIDATE_URL + '/api/revalidate', {
        name,
      }, {
        headers: {
          serverkey: process.env.BACKEND_TOKEN_PROTECTOR,
        }
      });
    }
    catch (err) {
      return ;
    }
  }
}
