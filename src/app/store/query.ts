import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { FtpSettingsState } from "./model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FtpSettingsStore } from "./store";
import { Credentials, FtpAddress } from "../api/ftp-settings.models";

@Injectable({ providedIn: "root" })
export class FtpSettingsQuery extends Query<FtpSettingsState> {
  constructor(store: FtpSettingsStore) {
    super(store);
  }

  public selectRawFtpSettings(): Observable<string> {
    return this.select().pipe(
      map((settings) => {
        return `address: ${settings.address}, port: ${settings.port}, login: ${settings.login}, password: ${settings.password}`;
      })
    );
  }

  // Добавил Partial, т.к. возможно, что придет undefined, тут и ниже
  // TODO: Написать метод, который возвращает ftp credentials в виде {username: string, password: string}
  public selectFtpCredentials(): Observable<Partial<Credentials>> {
    return this.select(["login", "password"]).pipe(
      map(({ login, password }) => ({
        username: login,
        password
      }))
    );
  }

  // TODO: Написать метод, который возвращает ftp credentials с портом 21 по умолчанию, если он не указан
  public selectFtpAddress(): Observable<Partial<FtpAddress>> {
    return this.select(["address", "port"]).pipe(
      map(({ address, port }) => {
        if (!address) {
          return {
            address,
            port: undefined
          };
        }
        return {
          address,
          port: port ? `${port}` : "21"
        };
      })
    );
  }
}
