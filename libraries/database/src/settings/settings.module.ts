import { Module } from '@nestjs/common';
import {SettingsService} from "@meetqa/database/src/settings/settings.service";
import {SettingsRepository} from "@meetqa/database/src/settings/settings.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [SettingsService, SettingsRepository],
  get exports() {
    return this.providers;
  }
})
export class SettingsModule {}
