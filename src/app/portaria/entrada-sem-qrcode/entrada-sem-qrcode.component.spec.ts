import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSemQrcodeComponent } from './entrada-sem-qrcode.component';

describe('EntradaSemQrcodeComponent', () => {
  let component: EntradaSemQrcodeComponent;
  let fixture: ComponentFixture<EntradaSemQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaSemQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaSemQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
