import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import * as scanStrategies from './_model/scan-strategies';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private scanStrategy; 
  private storageStrategy; 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router  
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.scanStrategy = new scanStrategies.CheckInScanStrategy(this.router);
      //this.storageStrategy = new storageStrategies["RemoteStorageStrategy"]();
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  closeMenu(){
    this.menu.close();
  }

  setScanStrategy(aClassName){
    console.log(aClassName);
    this.scanStrategy = new scanStrategies[aClassName]();
    this.closeMenu();
  }

  setStorageStrategy(target){
    console.log(target);
    //this.storageStrategy = new storageStrategies[target.value]();
    this.closeMenu();
  }
}
