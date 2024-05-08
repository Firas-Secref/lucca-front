import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEmployeeRequestComponent } from './my-employee-request.component';

describe('MyEmployeeRequestComponent', () => {
  let component: MyEmployeeRequestComponent;
  let fixture: ComponentFixture<MyEmployeeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyEmployeeRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyEmployeeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
