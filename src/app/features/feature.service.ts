import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryResponse, IStatusResponse } from '../model/enquiry.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<ICategoryResponse>("https://api.freeprojectapi.com/api/Enquiry/get-categories").pipe(
      map((response: ICategoryResponse) => response.data.filter((category: { categoryId: number; }) => category.categoryId < 4))
    );
  }

  getAllStatus(){
    return this.http.get<IStatusResponse>("https://api.freeprojectapi.com/api/Enquiry/get-statuses").pipe(
      map((response: IStatusResponse) => response.data.filter((status: { statusId: number; }) => status.statusId < 6))
    );
  }

  saveEnquiry(data: any) {
    return this.http.post("https://api.freeprojectapi.com/api/Enquiry/create-enquiry", data);
  }

  getAllEnquiries() {
    return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-enquiries");
  }
}
