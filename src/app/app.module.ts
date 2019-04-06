import { ngfModule } from "angular-file"
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ngfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
