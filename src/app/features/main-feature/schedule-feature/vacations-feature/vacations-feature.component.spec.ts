import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationsFeatureComponent } from './vacations-feature.component';

describe('VacationsFeatureComponent', () => {
  let component: VacationsFeatureComponent;
  let fixture: ComponentFixture<VacationsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacationsFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacationsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
