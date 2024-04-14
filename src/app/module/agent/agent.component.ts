import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  selectedItem:any;
  accessToken = '';
  refreshToken = '';
  
  constructor(public authService: AuthService, private moviesService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
  }

  listClick(event: any, newValue: any) {
    this.selectedItem = newValue;
  }

}
