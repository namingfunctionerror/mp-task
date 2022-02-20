import { Component, OnDestroy } from "@angular/core";
import { interval, Subject } from "rxjs";
import { map, repeatWhen, takeUntil } from "rxjs/operators";
import { FtpSettingsQuery } from "./store/query";
import { FtpSettingsService } from "./store/service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  /** Тики точек в "Loading..."" */
  public loadingTick$ = interval(500).pipe(
    map((val) => (val % 3) + 1),
    repeatWhen(() => this.loading$),
    takeUntil(this.destroy$)
  );

  public loading$ = this.ftpQuery.selectLoading();
  public ftpAddress$ = this.ftpQuery.selectFtpAddress();
  public ftpCredentials$ = this.ftpQuery.selectFtpCredentials();

  constructor(
    private ftpService: FtpSettingsService,
    public ftpQuery: FtpSettingsQuery
  ) {
    this.ftpService
      .loadFtpSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
