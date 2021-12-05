import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativoProveedoresComponent } from './comparativo-proveedores.component';

describe('ComparativoProveedoresComponent', () => {
  let component: ComparativoProveedoresComponent;
  let fixture: ComponentFixture<ComparativoProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativoProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
