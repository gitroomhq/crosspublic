import { Module } from '@nestjs/common';
import {SettingsService} from "@crosspublic/database/src/settings/settings.service";
import {SettingsRepository} from "@crosspublic/database/src/settings/settings.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [SettingsService, SettingsRepository],
  get exports() {
    return this.providers;
  }
})
export class SettingsModule {}
