import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import * as $ from 'jquery';

@Component({
	selector: 'app-register-visitor',
	templateUrl: './register-visitor.page.html',
	styleUrls: ['./register-visitor.page.scss'],
})
export class RegisterVisitorPage implements OnInit {

	name: string;
	surname: string;
	dni: string;
	telefono: number;
	codigo_area: number;

	form: FormGroup;
    loading = false;
    submitted = false;

    @ViewChild('firstInput') firstInput;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private storage: StorageService
    ) {}

    ionViewDidEnter(){
      this.firstInput.setFocus();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            dni: ['', Validators.required],
            name: ['', Validators.required],
            surname: ['', Validators.required],
            telefono: ['', Validators.required],
            codigo_area: ['', Validators.required]
        });
    }

  	get f() { return this.form.controls; }

	onSubmit() {
	    this.submitted = true;

	    // stop here if form is invalid
	    if (this.form.invalid) {
	        return;
	    }

	    this.loading = true;

	    this.storage.registerVisitor(this.f.dni.value, this.f.name.value, this.f.surname.value, this.f.telefono.value.toString(), this.f.codigo_area.value.toString()).then(userData => {

	        this.storage.setCurrentVisitorByDNI(this.f.dni.value).then(userData => {
	            this.form.reset();
	            Object.keys(this.form.controls).forEach(key => {
	              this.form.get(key).setErrors(null) ;
	            });
	            this.router.navigate(['/checkin-measurements']);
	        }, errorMessage => {
	              alert(errorMessage);
	              this.loading = false;
	        });
	    }, errorMessage => {
	        alert(errorMessage);
	        this.loading = false;
	    });
	}
}