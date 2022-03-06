import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarNarradorComponent } from './listar-narrador.component';

describe('ListarNarradorComponent', () => {
  let component: ListarNarradorComponent;
  let fixture: ComponentFixture<ListarNarradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarNarradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarNarradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
