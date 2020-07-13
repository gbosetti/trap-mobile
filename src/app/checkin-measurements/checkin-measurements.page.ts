import { Component, OnInit, ViewChild } from '@angular/core';
import {StorageService} from '../_services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-measurements',
  templateUrl: './checkin-measurements.page.html',
  styleUrls: ['./checkin-measurements.page.scss'],
})
export class CheckinMeasurementsPage implements OnInit {

	temperature: number;
	smell: boolean;
	canGoBack: boolean = false;
  questions;
  visitor: string;
  @ViewChild('firstInput') firstInput;

  constructor(private storage: StorageService, private router: Router) {

    this.smell = false;

    this.storage.getRandomQuestions().then(res=>{
      this.questions = res.data.map(q=>{return {
        "label": q.cuerpo, 
        "id": q.id, 
        "target": Boolean(Number(q.respuesta_esperada)),
        "isItemChecked": false
      }});
    }).catch(err=>{console.log(err)});

    this.storage.getCurrentVisitor().then(res=>{
      this.visitor = res.data.apellido.toUpperCase() + ", " + res.data.nombre + " (" + res.data.dni + ")"
    }).catch(err=>{console.log(err)});
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
      this.firstInput.setFocus();
  }

  onSubmit(){

    if(this.temperature==undefined){
      alert("Por favor, ingrese una temperatura.");
      return;
    }
    var rightAnswers = this.questions.filter(f=>{return f.isItemChecked==f.target});
    console.log(this.questions);

    if(rightAnswers.length<this.questions.length || this.smell==false){
      this.storage.denyEntryToCurrentVisitor(this.temperature, this.smell, this.questions).then(data=>{
        alert(data.message);
        this.router.navigate(["/scan"]);
      }).catch(err=>{
        alert(err);
      });
    }
    else {
      this.storage.checkinCurrentVisitor(this.temperature, this.smell, this.questions).then(data=>{
        alert(data.message);
        this.router.navigate(["/scan"]);
      }).catch(err=>{
        alert(err);
      });
    }
  }
}
