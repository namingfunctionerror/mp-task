import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

import { FtpSettings } from "./ftp-settings.models";

@Injectable({ providedIn: "root" })
export class MockFtpSettingsApi {
  public getFtpSettings(): Observable<FtpSettings> {
    return of({
      address: "localhost",
      login: "ftpUser",
      password: "password",
    }).pipe(delay(5000));
  }
}
