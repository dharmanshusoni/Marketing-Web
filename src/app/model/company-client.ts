import { CityDTO, CountryDTO, StateDTO } from "./master";

export class CompanyClientDTO {
    public companyClientId: number = 0;
    public name: string = '';
    public email: string = '';
    public contactPerson: string = '';
    public contactNo: string = '';
    public address: string = '';
    public zipcode: string = '';
    public companyDetail: string = '';
    public country: CountryDTO[]=[];
    public state: StateDTO[]=[];
    public city: CityDTO[]=[];
    public countryId: number = 0;
    public stateId: number = 0;
    public cityId: number = 0;
    public profileImageUrl: string = '';
}