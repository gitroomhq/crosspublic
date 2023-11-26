import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {INestApplication} from "@nestjs/common";

export const loadSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('MeetQA Swagger file')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use('/docs/openapi.json', (req: any, res: any) => {
    res.status(200).json(document);
  });

  SwaggerModule.setup('docs', app, document);
}
