import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core';
import { Movie } from '../../model/user';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  popularMovies: Movie[] = [];
  accessToken = '';
  refreshToken = '';

  constructor(public authService: AuthService,private moviesService: UserService) {}

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
    });
  }

}
