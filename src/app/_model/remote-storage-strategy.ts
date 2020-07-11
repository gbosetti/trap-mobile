import {StorageStrategy} from './storage-strategy';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

export class RemoteStorageStrategy extends StorageStrategy{

	constructor(private authenticationService: AuthenticationService, private router: Router) { 
		super();
	}

    post(formData, endpoint) {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: environment.apiUrl+endpoint,
                type: 'post',
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    var res = JSON.parse(data);    
                    console.log(res);                
                    if(res.error==false) resolve(res);
                    else reject(res.message);
                },
                "error": function (request, status) {
                    reject(status);
                },
                data: formData
            });
        });
    }

    get(formData, endpoint) {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: environment.apiUrl+endpoint,
                type: 'get',
                processData: false,
                contentType: false,
                success: function (data) {
                    var res = JSON.parse(data);
                    console.log(res);
                    if(res.error==false) resolve(res);
                    else reject(res.message);
                },
                "error": function (request, status) {
                    reject(request.responseText);
                },
                data: formData
            });
        });
    }

    checkoutUser(dni_visitante, facilities){

        var formData = new FormData();
            formData.append("dni_visitante", dni_visitante);
            formData.append("dni_guardia_egreso", this.getCurrentGuardDni());
            formData.append("facilities", JSON.stringify(facilities));

        return this.post(formData, 'movimientos_nuevo.php');
    }

    getFacilities(){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: environment.apiUrl+'instalaciones.php',
                type: 'get',
                processData: false,
                contentType: false,
                success: function (data) {
                    var res = JSON.parse(data);
                    resolve(res);
                },
                "error": function (request, status) {
                    reject(request.responseText);
                }
            });
        });
    }

    getCurrentGuardDni(){
    	return this.authenticationService.getCurrentGuardDni();
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

    login(dni, password) {
        return this.authenticationService.login(dni, password);
    }

    logout() {
    	console.log("logout from strategy");
        var res = this.authenticationService.logout();
        this.router.navigate(['/login']);
        return res;
    }
}
