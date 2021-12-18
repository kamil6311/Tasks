import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


const firebaseConfig = {
  apiKey: "AIzaSyAINqy6iZE94BNnwka4BRnScg9JgmpPebc",
  authDomain: "tasks-b180c.firebaseapp.com",
  databaseURL: "https://tasks-b180c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tasks-b180c",
  storageBucket: "tasks-b180c.appspot.com",
  messagingSenderId: "772329247927",
  appId: "1:772329247927:web:73fc5de72f0bc1b1ffe932",
  measurementId: "${config.measurementId}"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
