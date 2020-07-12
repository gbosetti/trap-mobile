import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

	dni:string;

	constructor(private storage: StorageService, private router: Router) { }

	ngOnInit() {
	}

	ionViewDidEnter(){
		this.dni='';
	}

	sendNewPass(){
		this.storage.sendNewPass(this.dni).then(res=>{
			alert(res.message);
			this.router.navigate(["/login"]);
		}).catch(err=>{
			alert(err);
			this.router.navigate(["/login"]);
		});
	}

}
