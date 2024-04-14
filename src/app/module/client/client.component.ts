import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core';
import { Movie } from '../../model/user';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  selectedItem:any;
  popularMovies: Movie[] = [];
  accessToken = '';
  refreshToken = '';
  menuData = [
    {
      "name": "Client Company",
      "routerLink": "client-company",
      "icon": "bi bi-people"
    },
    {
      "name": "Client Form",
      "routerLink": "client-form",
      "icon": "bi bi-file-earmark-text"
    },
  ]
  constructor(public authService: AuthService, private moviesService: UserService, private router: Router, private route: ActivatedRoute) {
    //console.log(this.router.url.split("/")[2]);
    this.selectedItem = this.menuData.find(item => {
      return item.routerLink.includes(this.router.url.split("/")[2])
    });
    if (this.selectedItem == "undefined" || this.selectedItem == undefined) {
      this.selectedItem = this.menuData[0];
      //console.log(this.selectedItem);
    }
  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
    // this.moviesService.getMovies('popular').subscribe((movies) => {
    //   this.popularMovies = movies;
    // });
  }

  listClick(event: any, newValue: any) {
    this.selectedItem = newValue;
  }

}
