import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { FtpSettingsQuery } from "./query";

describe('Query', () => {
  let query: FtpSettingsQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FtpSettingsQuery ]
    })
    query = TestBed.inject(FtpSettingsQuery);
  })

  it('should get port as undefined when address is undefined', () => {
    const stub = {
      loading: false,
      error: null,
      address: undefined,
      port: 5000,
    };

    spyOn(query, 'select').and.returnValue(of(stub))

    query.selectFtpAddress().subscribe(value => {
      expect(value).toBeTruthy();
      expect(value.address).toBeUndefined();
      expect(value.port).toBeUndefined();
    })
  })

  it('should get port as 21 when address is defined', () => {
    const stub = {
      loading: false,
      error: null,
      address: 'localhost',
      port: undefined,
    }

    spyOn(query, 'select').and.returnValue(of(stub))

    query.selectFtpAddress().subscribe(value => {
      expect(value).toBeTruthy();
      expect(value.address).toEqual(stub.address);
      expect(value.port).toEqual('21');
    })
  })


  it('should get ftpCredentials', () => {
    const stub = {
      loading: false,
      error: null,
      login: 'test',
      password: 'test',
    }

    spyOn(query, 'select').and.returnValue(of(stub));

    query.selectFtpCredentials().subscribe(credentials => {
      expect(credentials).toBeTruthy();
      expect(credentials.username).toEqual(stub.login);
      expect(credentials.password).toEqual(stub.password);
    })
  })
})
