import {StorageStrategy} from './storage-strategy';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import { AuthenticationService } from '../_services/authentication.service';

export class RemoteStorageStrategy extends StorageStrategy{

	constructor(private authenticationService: AuthenticationService ) { 
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
        return this.authenticationService.logout();
    }
}
