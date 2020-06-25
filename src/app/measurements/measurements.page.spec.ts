import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeasurementsPage } from './measurements.page';

describe('MeasurementsPage', () => {
  let component: MeasurementsPage;
  let fixture: ComponentFixture<MeasurementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeasurementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
