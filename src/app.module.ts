import { Module } from '@nestjs/common';

import { BiometricoModule } from './modulos/biometrico/biometrico.module';

@Module({
  imports: [BiometricoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
