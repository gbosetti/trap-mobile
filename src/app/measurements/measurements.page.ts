import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {

	temperature: number;
	smell: boolean;
	canGoBack: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
