import {StorageStrategy} from './storage-strategy';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';
import { AuthenticationService } from '../../_services/authentication.service';
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
                    //console.log(res);
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

    registerVisitor(dni, name, surname, tel, cod_area){

        var formData = new FormData();
            formData.append("dni", dni);
            formData.append("nombre", name);
            formData.append("apellido", surname);
            formData.append("telefono", tel);
            formData.append("codigo_area", cod_area);

        return this.post(formData, 'usuario_nuevo.php');
    }

    denyEntryToVisitor(dni_visitante, temperature, smell_test_passed, questions){

        var formData = new FormData();
            formData.append("dni_visitante", dni_visitante);
            formData.append("dni_guardia_ingreso", this.getCurrentGuardDni());
            formData.append("temperatura", temperature);
            formData.append("supero_olfativo", smell_test_passed);
            formData.append("questions", JSON.stringify(questions));

        return this.post(formData, 'movimiento_deny.php');
    }

    getRandomQuestions(){
        return this.get(undefined, 'preguntas_random.php');
    }

    checkoutVisitor(dni_visitante, facilities){

        var formData = new FormData();
            formData.append("dni_visitante", dni_visitante);
            formData.append("dni_guardia_egreso", this.getCurrentGuardDni());
            formData.append("facilities", JSON.stringify(facilities));

        return this.post(formData, 'movimiento_checkout.php');
    }

    checkinVisitor(dni_visitante, temperature, smell_test_passed, questions){

        var formData = new FormData();
            formData.append("dni_visitante", dni_visitante);
            formData.append("dni_guardia_ingreso", this.getCurrentGuardDni());
            formData.append("temperatura", temperature);
            formData.append("supero_olfativo", smell_test_passed);
            formData.append("questions", JSON.stringify(questions));

        return this.post(formData, 'movimiento_checkin.php');
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
        var res = this.authenticationService.logout();
        this.router.navigate(['/login']);
        return res;
    }

    getCurrentGuard(){
        return this.getUserByDNI(this.authenticationService.getCurrentGuardDni());
    }

    createFacilities(name){
        var formData = new FormData();
            formData.append("nombre", name);

        return this.post(formData, "instalaciones_nueva.php");
    }
}
