// Implemented by https://github.com/gbosetti
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
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

    constructor(private router: Router ) { }

    setStorageStrategy(aClass) {

        return new Promise((resolve, reject) => {
            this.storageStrategy = new storageStrategies[aClass](this.router);
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

    post(formData, endpoint) {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: environment.apiUrl+endpoint,
                type: 'post',
                processData: false,
                contentType: false,
                success: function (data) {
                    var res = JSON.parse(data);
                    if(res.error==false) resolve(res.message);
                    else reject(res.message);
                },
                "error": function (request, status) {
                    reject(request.responseText);
                },
                data: formData
            });
        });
    }

	getUserById(id) {

        var formData = new FormData();
            formData.append("id", id);

        return this.post(formData, "usuario_por_id.php");
    }

    getUserByDNI(dni) {

        var formData = new FormData();
            formData.append("dni", dni);

        return this.post(formData, "usuario_por_dni.php");
    }
}