import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { RequestOptions, XHRBackend } from "@angular/http";
import { Platform } from 'ionic-angular';
import { HttpService } from "../services/http.service";
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { RunService } from '../services/run.services';
import { VehicleServices } from '../services/vehicle.services';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
  {
    provide: HttpService,
    useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new HttpService(backend, defaultOptions),
    deps: [XHRBackend, RequestOptions]
  },
  {
    provide: UserService,
    useFactory: (http: HttpService, platform: Platform) => new UserService(http, platform),
    deps: [HttpService, Platform]
  },
  {
    provide: AuthService,
    useFactory: (userService: UserService, http: HttpService) => new AuthService(userService, http),
    deps: [UserService, HttpService]
  },
  {
    provide: RunService,
    useFactory: (http: HttpService, platform: Platform) => new RunService(http, platform),
    deps: [HttpService, Platform]
  },
  {
    provide: VehicleServices,
    useFactory: (http: HttpService, platform: Platform) => new VehicleServices(http, platform),
    deps: [HttpService, Platform]
  },


  ]
})
export class AppModule { }
