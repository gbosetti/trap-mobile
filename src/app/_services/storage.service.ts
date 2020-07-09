// Implemented by https://github.com/gbosetti
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import * as scanStrategies from '../_model/scan-strategies';
import * as storageStrategies from '../_model/storage-strategies';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

	private scanStrategy; 
  	private storageStrategy; 
  	private currentUserId;

    constructor(private router: Router, private authenticationService: AuthenticationService ) { }

    setStorageStrategy(aClass) {

        return new Promise((resolve, reject) => {
            console.log(aClass, storageStrategies);
            this.storageStrategy = new storageStrategies["RemoteStorageStrategy"]();  // TODO: enable it when the local strategy is ready: new storageStrategies[aClass](this.router);
            resolve();
        });
    }

    setScanStrategy(aClass) {

        return new Promise((resolve, reject) => {
            this.scanStrategy = new scanStrategies[aClass](this.router);
            resolve();
        });
    }

    setCurrentUserByDNI(dni) {

    	return new Promise((resolve, reject) => {
            this.getUserByDNI(dni).then(user=>{
            	console.log('current user:', user);
	            this.currentUserId=user['id'];
	            resolve();
	        });     
        });
    }

    getCurrentUser() {

        return this.getUserById(this.currentUserId);
    }

	getUserById(id) {

        return this.storageStrategy.getUserById(id);
    }

    getUserByDNI(dni) {

        return this.storageStrategy.getUserByDNI(dni);
    }

    public get currentUserValue(): User {
        return this.storageStrategy.getCurrentUserValue();
    }

    login(dni, password) {

        return this.storageStrategy.login(dni, password);
    }

    logout() {
        
        return this.storageStrategy.logout();
    }
}