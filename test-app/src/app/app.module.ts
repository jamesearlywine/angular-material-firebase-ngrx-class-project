import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/shared/store/app.reducers';

import { SharedModule } from './shared/shared.module';
import { UIService } from './shared/ui.service';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

import { TrainingService } from './training/training.service';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    StoreModule.forRoot(reducers),

    SharedModule,
    AuthModule,
  ],
  providers: [
    UIService,
    AuthService,
    TrainingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
