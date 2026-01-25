import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-categories");
  }

  getAllStatus(){
    return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-statuses");
  }

  saveEnquiry(data: any) {
    return this.http.post("https://api.freeprojectapi.com/api/Enquiry/create-enquiry", data);
  }

  getAllEnquiries() {
    return this.http.get("https://api.freeprojectapi.com/api/Enquiry/get-enquiries");
  }
}
