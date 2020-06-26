import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageService} from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController, 
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){
    this.storage.setScanStrategy('CheckInScanStrategy'); 
    this.storage.setStorageStrategy('RemoteStorageStrategy');
  }

  closeMenu(){
    this.menu.close();
  }

  setScanStrategy(aClassName){
    this.storage.setScanStrategy(aClassName); 
    this.closeMenu();
  }

  setStorageStrategy(aClassName){
    this.storage.setStorageStrategy(aClassName); 
    this.closeMenu();
  }
}
