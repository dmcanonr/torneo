import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGolComponent } from './agregar-gol.component';

describe('AgregarGolComponent', () => {
  let component: AgregarGolComponent;
  let fixture: ComponentFixture<AgregarGolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarGolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarGolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
