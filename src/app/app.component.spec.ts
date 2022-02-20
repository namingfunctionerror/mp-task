import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

import { AppComponent } from "./app.component";
import { FtpSettingsQuery } from "./store/query";
import { FtpSettingsService } from "./store/service";


describe("AppComponent", () => {
  let component: AppComponent;
  let ftpSettingsQuery: FtpSettingsQuery;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [FtpSettingsService, FtpSettingsQuery],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    ftpSettingsQuery = TestBed.inject(FtpSettingsQuery);
  });

  it("should be defined", () => {
    expect(component).toBeDefined();
  });

  it('should render title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement).toBeDefined();
    expect(titleElement.nativeElement.textContent).toContain('Welcome');
  })

  it('should display loading element and hide ftp element when loading', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(ftpSettingsQuery, 'selectLoading').and.returnValue(of(true));
    tick(500);
    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(By.css('.loading'));
    const ftpElement = fixture.debugElement.query(By.css('.ftp'));
    expect(loadingElement.nativeElement.textContent).toContain('Loading');
    expect(ftpElement).toBeNull();
    discardPeriodicTasks();
  }))

});
