import { FtpSettings } from "../api/ftp-settings.models";

/** Добавил Partial, т.к. мы не знаем, пришел ли нам address или нет. */
export interface FtpSettingsState extends Partial<FtpSettings> {
  loading: boolean;
  error: Error | null;
}
