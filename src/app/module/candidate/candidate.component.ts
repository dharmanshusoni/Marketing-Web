import { Component } from '@angular/core';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {
  accessToken = '';
  refreshToken = '';
  constructor(public authService: AuthService) {
  }
  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
  }
}
