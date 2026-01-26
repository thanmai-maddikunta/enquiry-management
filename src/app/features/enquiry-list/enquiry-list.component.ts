import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FeatureService } from '../feature.service';

@Component({
  selector: 'app-enquiry-list',
  imports: [DatePipe],
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.css'
})
export class EnquiryListComponent implements OnInit {
  enquiries: any[] = [];

  private __featureService = inject(FeatureService);
  private destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.getAllEnquiries();
  }

  getAllEnquiries() {
    const subscription = this.__featureService.getAllEnquiries().subscribe((res: any) => {
      console.log(res);
      this.enquiries = res.data.filter((status: { statusId: number; categoryId: number; }) => status.statusId < 6 && status.categoryId < 4);
      console.log(this.enquiries);
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
