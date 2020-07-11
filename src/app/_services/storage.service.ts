// Implemented by https://github.com/gbosetti
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import * as scanStrategies from '../_model/scan-strategies';
import * as storageStrategies from '../_services/storage-strategies';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

	private scanStrategy; 
  	private storageStrategy; 
  	private currentUserDni; // Visitor, not guard

    constructor(private router: Router, private authenticationService: AuthenticationService ) { 
        this.currentUserDni = localStorage.getItem('currentVisitorDni');
    }

    checkoutCurrentVisitor(facilities){
        return this.storageStrategy.checkoutVisitor(this.currentUserDni, facilities);
    }

    checkinCurrentVisitor(facilities){
        return this.storageStrategy.checkoutVisitor(this.currentUserDni, facilities);
    }

    getFacilities(){
        return this.storageStrategy.getFacilities();
    }

    getRandomQuestions(){
        return this.storageStrategy.getRandomQuestions();
    }

    getCurrentStorageStrategy(){
        var strategy = localStorage.getItem('currentStorageStrategy');
        if(strategy == undefined || strategy == null)
            return "RemoteStorageStrategy";
        else return strategy;
    }

    storeCurrentStorageStrategy(strategy){
        localStorage.setItem('currentStorageStrategy', strategy);
    }

    getCurrentScanStrategy(){
        var strategy = localStorage.getItem('currentScanStrategy');
        if(strategy == undefined || strategy == null)
            return "CheckInScanStrategy";
        else return strategy;
    }

    storeCurrentScanStrategy(strategy){
        localStorage.setItem('currentScanStrategy', strategy);
    }

    setStorageStrategy(aClass) {

        return new Promise((resolve, reject) => {
            console.log("setStorageStrategy", aClass);
            this.storageStrategy = new storageStrategies[aClass](this.authenticationService, this.router);  // TODO: enable it when the local strategy is ready: new storageStrategies[aClass](this.router);
            this.storeCurrentStorageStrategy(aClass);
            resolve();
        });
    }

    setScanStrategy(aClass) {

        return new Promise((resolve, reject) => {
            console.log("setScanStrategy", aClass);
            this.scanStrategy = new scanStrategies[aClass](this.router);
            this.storeCurrentScanStrategy(aClass);
            resolve();
        });
    }

    setCurrentVisitorByDNI(dni) {

    	return new Promise((resolve, reject) => {
            this.getUserByDNI(dni).then(res=>{
	            this.currentUserDni=res.data.dni;
                localStorage.setItem('currentVisitorDni', res.data.dni);
	            resolve();
	        });     
        });
    }

    getCurrentVisitor() {
        return this.getUserByDNI(this.currentUserDni);
    }

    getUserByDNI(dni) {

        return this.storageStrategy.getUserByDNI(dni);
    }

    login(dni, password) {

        return this.storageStrategy.login(dni, password);
    }

    logout() {
        
        return this.storageStrategy.logout();
    }

    getCurrentGuardDni() {
        
        return this.storageStrategy.getCurrentGuardDni();
    }

    getMeasurementsRoute(){
        
        return this.scanStrategy.getMeasurementsRoute();
    }
}