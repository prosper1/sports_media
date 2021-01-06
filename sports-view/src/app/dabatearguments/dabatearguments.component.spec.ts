import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DabateargumentsComponent } from './dabatearguments.component';

describe('DabateargumentsComponent', () => {
  let component: DabateargumentsComponent;
  let fixture: ComponentFixture<DabateargumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DabateargumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DabateargumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
