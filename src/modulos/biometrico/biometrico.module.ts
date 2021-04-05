import { Module } from '@nestjs/common';
import { BiometricoController } from './api/biometrico.controller';
import { CrearBiometricoCasoUso } from './biometrico-caso-uso/crear';
import { EliminarBiometricoCasoUso } from './biometrico-caso-uso/eliminar';
import { LeerBiometricoCasoUso } from './biometrico-caso-uso/leer';
import { BiometricoRepoProvider } from './repository/biometrico-provider';

@Module({
  imports: [],
  providers: [
    CrearBiometricoCasoUso,
    LeerBiometricoCasoUso,
    EliminarBiometricoCasoUso,
    BiometricoRepoProvider
  ],
  controllers: [BiometricoController],
  exports: [],
})
export class BiometricoModule {}
