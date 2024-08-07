import { NestFactory } from "@nestjs/core";
import { AppModule } from "./root/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  await app.listen(3001);
}
bootstrap();
