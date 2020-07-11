import { Component, OnInit } from '@angular/core';
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

  constructor(private storage: StorageService, private router: Router) {
    this.storage.getRandomQuestions().then(res=>{
      this.questions = res.data.map(q=>{return {
        "label": q.cuerpo, 
        "id": q.id, 
        "target": Boolean(Number(q.respuesta_esperada)),
        "isItemChecked": false
      }});
    }).catch(err=>{console.log(err)});
  }

  ngOnInit() {
  }

  onSubmit(){

    if(this.temperature==undefined){
      alert("Por favor, ingrese una temperatura.");
      return;
    }
    var rightAnswers = this.questions.filter(f=>{return f.isItemChecked==f.target});
    
    if(rightAnswers.length<this.questions.length){
      this.storage.denyEntryToCurrentVisitor(this.temperature, this.smell, this.questions);
      alert("Este visitante no ha superado las preguntas de la foma esperada. No debe ingresar a las instalaciones.");
      this.router.navigate(["/scan"]);
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
