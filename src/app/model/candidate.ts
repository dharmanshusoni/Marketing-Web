import { CityDTO, CountryDTO, StateDTO, SkillsDTO, GenderDTO,LanguageDTO, QualificationDTO } from "./master";

export class candidateDTO {
    public candidateId: number = 0;
    public name: string = '';
    public dob: Date = new Date();
    public industry: number = 0;
    public experience: number = 0;
    public expectedSalary: number = 0;
    public qualifications: QualificationDTO[] = [];
    public qualificationId: number = 0;
    public qualification: string = '';
    public gender : GenderDTO[]=[];
    public genderId : number = 0
    public languages : LanguageDTO[]=[];
    public languagesIds : string = '';
    public skills: SkillsDTO[]=[];
    public skillsIds : string = '';
    public otherSkills : string = ''; 
    public email: string = '';
    public contactNo: string = '';
    public address: string = '';
    public zipcode: string = '';
    public country: CountryDTO[]=[];
    public state: StateDTO[]=[];
    public city: CityDTO[]=[];
    public countryId: number = 0;
    public stateId: number = 0;
    public cityId: number = 0;
  }