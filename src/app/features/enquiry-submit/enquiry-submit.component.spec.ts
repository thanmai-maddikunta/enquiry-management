import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirySubmitComponent } from './enquiry-submit.component';

describe('EnquirySubmitComponent', () => {
  let component: EnquirySubmitComponent;
  let fixture: ComponentFixture<EnquirySubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquirySubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquirySubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
