import { Provider } from '@nestjs/common';
import { BiometricoRepoService } from './BiometricoRepoImplementacion';

export const BiometricoRepoProvider: Provider = {
  provide: 'BiometricoRepo',
  useClass: BiometricoRepoService,
};
