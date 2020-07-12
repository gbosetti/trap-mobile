
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_model/user';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentGuardSubject: BehaviorSubject<User>;
    public currentGuard: Observable<User>;
    private apiUrl; //THIS SHOULD BE REPLACED BY THE ENVIRONMENTS VAR
    //private currentGuardDni;

    constructor(private http: HttpClient) {
        //this.currentGuardSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentGuard')));
        //this.currentGuard = this.currentGuardSubject.asObservable();
        //this.currentGuardDni = localStorage.getItem('currentGuard');
    }

    getCurrentGuardDni() {
        return localStorage.getItem('currentGuard'); //this.currentGuardSubject.value;
    }

    getCurrentGuardToken() {
        return localStorage.getItem('currentGuardToken'); 
    }

    setCurrentGuardToken($token) {
        return localStorage.setItem('currentGuardToken', $token); 
    }

    login(dni, password) {

        var formData = new FormData();
            formData.append("dni", dni);
            formData.append("password", password);

        var self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                "url": environment.apiUrl + 'guardia_autenticar.php',
                "type": 'post',
                "processData": false,
                "contentType": false,
                "success": (data)=>{

                    data = JSON.parse(data);
                    if ('data' in data) {

                        var user = new User();
                            user["dni"] = data["data"]["dni"];
                            user["firstName"] = data["data"]["nombre"];
                            user["lastName"] = data["data"]["apellido"];
                            user["token"] =  data["data"]["token"];
                            
                        localStorage.setItem('currentGuard', data["data"]["dni"]);
                        this.setCurrentGuardToken(data["data"]["token"]);
                        //this.currentGuardDni = data["data"]["dni"];
                        //self.currentGuardSubject.next(user);
                        resolve(user);
                    }
                    else {reject(data.message);};
                },
                "error": function (request, status) {
                    reject(request.responseText);
                },
                "data": formData
            });
        }); 
    }

    logout() {
        // remove user from local storage and set current user to null
        //this.currentGuardDni = null;
        localStorage.removeItem('currentGuard');
        localStorage.removeItem('currentGuardToken');
        //this.currentGuardSubject.next(null);
    }
}
