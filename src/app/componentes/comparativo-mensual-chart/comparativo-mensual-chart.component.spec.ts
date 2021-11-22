import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativoMensualChartComponent } from './comparativo-mensual-chart.component';

describe('ComparativoMensualChartComponent', () => {
  let component: ComparativoMensualChartComponent;
  let fixture: ComponentFixture<ComparativoMensualChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativoMensualChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativoMensualChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


