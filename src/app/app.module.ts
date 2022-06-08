import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LearnTradeComponent } from './learn-trade/learn-trade.component';
import { Trade1Component } from './trade1/trade1.component';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
  declarations: [AppComponent, LearnTradeComponent, Trade1Component],
  bootstrap: [AppComponent],
})
export class AppModule {}
