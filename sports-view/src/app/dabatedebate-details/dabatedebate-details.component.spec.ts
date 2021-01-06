import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DabatedebateDetailsComponent } from './dabatedebate-details.component';

describe('DabatedebateDetailsComponent', () => {
  let component: DabatedebateDetailsComponent;
  let fixture: ComponentFixture<DabatedebateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DabatedebateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DabatedebateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
