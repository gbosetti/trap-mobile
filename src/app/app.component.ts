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

  scanStrategy;
  storageStrategy;
  guardFullName: string;
  guardDni: string;

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
    this.storage.setScanStrategy(this.storage.getCurrentScanStrategy()); 
    this.scanStrategy = this.storage.getCurrentScanStrategy();
    this.storage.setStorageStrategy(this.storage.getCurrentStorageStrategy());
    this.storageStrategy = this.storage.getCurrentStorageStrategy();
  }

  onMenuOpen(){
    console.log("OPENING");
    this.storage.getCurrentGuard().then(res=>{
      this.guardFullName = res.data.apellido.toUpperCase() + ", " + res.data.nombre;
      this.guardDni = res.data.dni;
    }).catch(err=>{console.log(err)});
  }

  logout(){
    this.storage.logout();
    this.closeMenu();
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
