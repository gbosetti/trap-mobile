import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import * as $ from 'jquery';
declare var bootbox: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  	loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private storage: StorageService
    ) {
        // redirect to home if already logged in
        console.log(this.storage.getCurrentUserValue());
        if (this.storage.getCurrentUserValue()) {
            this.router.navigate(['/scan']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            dni: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = '/'; //this.route.snapshot.queryParams['returnUrl'] || '/';
        $('input:text:visible:first').focus();
    }

  	get f() { return this.loginForm.controls; }

	onSubmit() {
	    this.submitted = true;

	    // stop here if form is invalid
	    if (this.loginForm.invalid) {
	        return;
	    }

	    this.loading = true;
	    this.storage.login(this.f.dni.value, this.f.password.value).then(userData => {
	        this.router.navigate(['/scan']);
	    }, errorMessage => {
	        alert(errorMessage);
	        this.loading = false;
	    });
	}

}
