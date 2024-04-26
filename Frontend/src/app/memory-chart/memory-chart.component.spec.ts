import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryChartComponent } from './memory-chart.component';

describe('MemoryChartComponent', () => {
  let component: MemoryChartComponent;
  let fixture: ComponentFixture<MemoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
