import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  
  baseUrl: string = environment.apiUrl+environment.version;
  control: string = "Master";
  
  constructor(private http: HttpClient) {    
  }
  
  getCountries() {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/country`);
  }

  getState(countryId:number=0) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/state?countryId=${countryId}`);
  }

  getCity(stateId:number=0) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/city?stateId=${stateId}`);
  }

  getLanguage(languageId:number) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/language?languageId=${languageId}`);
  }

  getGender(genderId:number) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/gender?genderId=${genderId}`);
  }

  getQualification(qualificationId:number) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/qualification?qualificationId=${qualificationId}`);
  }

  getSkill(skillId:number) {
    return this.http.get<any>(`${this.baseUrl}/${this.control}/skill?skillId=${skillId}`);
  }

}
