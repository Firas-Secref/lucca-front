import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtRequestComponent } from './tt-request.component';

describe('TtRequestComponent', () => {
  let component: TtRequestComponent;
  let fixture: ComponentFixture<TtRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TtRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TtRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
