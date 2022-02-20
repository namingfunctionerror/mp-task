import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { mapTo, tap } from "rxjs/operators";

import { MockFtpSettingsApi } from "../api/ftp-settings.mock";
import { FtpSettingsStore } from "./store";

@Injectable({ providedIn: "root" })
export class FtpSettingsService {
  constructor(
    private api: MockFtpSettingsApi,
    private store: FtpSettingsStore
  ) {}

  public loadFtpSettings(): Observable<void> {
    this.store.setLoading(true);
    return this.api.getFtpSettings().pipe(
      tap((ftpSettings) => {
        this.store.update({ ...ftpSettings });
        this.store.setLoading(false);
      }),
      mapTo(void 0)
    );
  }
}
