import { Component, OnInit } from '@angular/core';
import {StorageService} from '../_services/storage.service';

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

  constructor(private storage: StorageService) {
    this.storage.getRandomQuestions().then(res=>{
      console.log("Q", res.data);
      this.questions = res.data.map(q=>{return {"label": q.cuerpo, "id": q.id, "target": q.respuesta_esperada}});
      console.log("PREGUNTAS", this.questions);
    }).catch(err=>{console.log(err)});
  }

  ngOnInit() {
  	this.loadUserData();
  }

  loadUserData(){
  	console.log(this.storage.getCurrentVisitor());
  }

}
