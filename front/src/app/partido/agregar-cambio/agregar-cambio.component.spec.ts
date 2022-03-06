import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCambioComponent } from './agregar-cambio.component';

describe('AgregarCambioComponent', () => {
  let component: AgregarCambioComponent;
  let fixture: ComponentFixture<AgregarCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCambioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
