import { NestFactory } from "@nestjs/core";
import { slackProvider } from "@crosspublic/communication/src/list/slack/provider";
import { AppModule } from "@crosspublic/communication/src/app.module";
import { discordProvider } from "@crosspublic/communication/src/list/discord/provider";

async function bootstrap() {
  const app     = await NestFactory.createApplicationContext(AppModule);
  const providerList = [
    slackProvider,
    discordProvider
  ]
  .find((p) => p.type === (process.env.PROVIDER || 'SLACK'));

  await providerList.run(app);
}

bootstrap();
