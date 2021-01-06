import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DabateaddArgumentComponent } from './dabateadd-argument.component';

describe('DabateaddArgumentComponent', () => {
  let component: DabateaddArgumentComponent;
  let fixture: ComponentFixture<DabateaddArgumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DabateaddArgumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DabateaddArgumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
