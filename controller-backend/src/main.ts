import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as register from "common-core/register";

async function bootstrap() {
  await register.init();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3005);
}
bootstrap();
