import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareInterviewComponent } from './prepare-interview.component';

describe('PrepareInterviewComponent', () => {
  let component: PrepareInterviewComponent;
  let fixture: ComponentFixture<PrepareInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrepareInterviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepareInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
