import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJugadorDestacadoComponent } from './agregar-jugador-destacado.component';

describe('AgregarJugadorDestacadoComponent', () => {
  let component: AgregarJugadorDestacadoComponent;
  let fixture: ComponentFixture<AgregarJugadorDestacadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarJugadorDestacadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarJugadorDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
