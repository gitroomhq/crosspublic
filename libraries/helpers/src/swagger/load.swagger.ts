import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {INestApplication} from "@nestjs/common";
// import load from '@meetqa/backend/src/metadata';

export const loadSwagger = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('MeetQA Swagger file')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
