import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, throwError } from 'rxjs';
import { CompanyClientDTO } from '../model/company-client';

@Injectable({
  providedIn: 'root'
})
export class CompanyclientService {
  
  baseUrl: string = environment.apiUrl+environment.version;
  control: string = "Companyclient";
  add: string = "add";
  get: string = "get";

  constructor(private http: HttpClient) {    
  }
  Save(data:CompanyClientDTO) {
    return this.http.post<any>(`${this.baseUrl}/${this.control}/${this.add}`,data);
  }
  getData() {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/${this.get}`);
  }
  getDataById(companyClientId:number) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/${this.get}/${companyClientId}`);
  }
  upload(formData:any,_context:string,request:string,contextId:number) {
    var data = {
      context:_context,
      request:request,
      contextId:contextId
    }
    formData.append('data',JSON.stringify(data));
    return this.http.post<any>(environment.apiUrl+environment.version+`/Upload`, formData);
  }
  
}
