import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BiometricoModule } from './modulos/biometrico/biometrico.module';

@Module({
  imports: [BiometricoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
