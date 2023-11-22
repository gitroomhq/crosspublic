import {Injectable} from "@nestjs/common";
import OpenAI from "openai";
import Handlebars from "handlebars";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

@Injectable()
export class GeneratorService {
  async create(prompt: Array<{prompt: string, role: 'system' | 'user' | 'assistant', variables: object}>, globalVariables = {}, model = 'gpt-4-1106-preview') {
    const messages = prompt.map(p => {
      return {role: p.role, content: Handlebars.compile(p.prompt)({...globalVariables, ...p.variables})};
    });

    return openai.chat.completions.create({
      messages,
      model
    });
  }
}
