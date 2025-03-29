import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationAddComponent } from './simulation-add.component';

describe('SimulationAddComponent', () => {
  let component: SimulationAddComponent;
  let fixture: ComponentFixture<SimulationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
