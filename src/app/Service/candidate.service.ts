import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, throwError } from 'rxjs';
import { candidateDTO } from '../model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  
  baseUrl: string = environment.apiUrl+environment.version;
  control: string = "Candidate";
  add: string = "add";
  get: string = "get";

  constructor(private http: HttpClient) {    
  }
  Save(data:candidateDTO) {
    return this.http.post<any>(`${this.baseUrl}/${this.control}/${this.add}`,data);
  }
  getData() {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/${this.get}`);
  }
  getDataById(candidateId:number) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/${this.get}/${candidateId}`);
  }
  upload(formData:any) {
    return this.http.post<any>(environment.apiUrl+environment.version+'/Upload?_context=candidate', formData);
  }
  
}
