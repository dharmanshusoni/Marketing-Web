import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AgentDTO } from '../model/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  
  baseUrl: string = environment.apiUrl+environment.version;
  control: string = "Agent";
  add: string = "add";
  get: string = "get";

  constructor(private http: HttpClient) {    
  }
  Save(data:AgentDTO) {
    return this.http.post<any>(`${this.baseUrl}/${this.control}/${this.add}`,data);
  }
  getData() {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/${this.get}`);
  }
  getDataById(agentId:number) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/${this.get}/${agentId}`);
  }
  upload(formData:any) {
    return this.http.post<any>(environment.apiUrl+environment.version+'/Upload?_context=client', formData);
  }
  
}
