import { Injectable } from "@angular/core";
import { StoreConfig, Store } from "@datorama/akita";

import { FtpSettingsState } from "./model";

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "ftp-settings", resettable: true })
export class FtpSettingsStore extends Store<FtpSettingsState> {
  constructor() {
    super({
      loading: false,
      error: null
    });
  }
}
