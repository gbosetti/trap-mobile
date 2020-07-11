import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterVisitorPage } from './register-visitor.page';

describe('RegisterVisitorPage', () => {
  let component: RegisterVisitorPage;
  let fixture: ComponentFixture<RegisterVisitorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVisitorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterVisitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
