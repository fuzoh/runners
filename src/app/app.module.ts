import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { CacheModule } from "ionic-cache";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { api } from '../runners.config';
import { API_ENDPOINT } from '../tokens/api-endpoint';

import { VehicleService } from '../services/vehicle.service';
import { UserService } from '../services/user.service';
import { RunService } from '../services/run.service';
import { RunnerService } from '../services/runner.service';
import { AuthService } from '../services/auth.service';
import { AuthStorage } from '../storages/auth.storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { RunsPage } from '../pages/runs/runs';
import { RunPage } from '../pages/run/run';
import { ProfilPage } from '../pages/profil/profil';
import { VehiclesPage } from '../pages/vehicles/vehicles';
import { VehiclePage } from '../pages/vehicle/vehicle';
import { RunnerPage } from '../pages/runner/runner';

import { FilterRunsPipe } from '../pipes/filter-runs.pipe';
import { GroupRunsPipe } from '../pipes/group-runs.pipe';
import { GroupVehicleStatusPipe } from '../pipes/group-vehicle-status.pipe';
import {ApiTokenInterceptor} from "../services/interceptors/ApiTokenInterceptor";
import {AuthFailedInterceptor} from "../services/interceptors/AuthFailedInterceptor";
import {CachingInterceptor} from "../services/interceptors/CachingInterceptor";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    RunsPage,
    RunPage,
    VehiclesPage,
    VehiclePage,
    RunnerPage,
    ProfilPage,
    FilterRunsPipe,
    GroupRunsPipe,
    GroupVehicleStatusPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CacheModule.forRoot(),
    IonicModule.forRoot(MyApp),


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    RunsPage,
    RunPage,
    VehiclesPage,
    VehiclePage,
    RunnerPage,
    ProfilPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {
      provide: API_ENDPOINT,
      useValue: api,
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-US',
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthFailedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    },
    AuthStorage,
    UserService,
    AuthService,
    VehicleService,
    RunService,
    RunnerService,
  ],
})
export class AppModule {}
