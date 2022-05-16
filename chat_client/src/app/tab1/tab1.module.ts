import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab1Page } from './tab1.page';

import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from '../app.component';

import { BrowserModule } from '@angular/platform-browser'

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { ChatService } from '../services/chat.service';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ExploreContainerComponentModule,
    IonicModule.forRoot(),
    Tab1PageRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    ChatService,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
