import {ArrayMinSize, IsArray, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class OnlyMessagesList {
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(2)
  @Type(() => MessageList)
  messagesList: MessageList[];
}

export class AnsweredQuestion extends OnlyMessagesList {
  @IsString()
  question: string;
}

export class MessagesListValidator extends OnlyMessagesList {
  @IsString()
  reference: string;
}

export class MessageList {
  @IsString()
  name: string;

  @IsString()
  message: string;
}
