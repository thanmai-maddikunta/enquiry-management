import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryStatusComponent } from './enquiry-status.component';

describe('EnquiryStatusComponent', () => {
  let component: EnquiryStatusComponent;
  let fixture: ComponentFixture<EnquiryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
