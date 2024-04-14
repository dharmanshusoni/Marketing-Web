import { Component } from '@angular/core';
import { PermissionManagerService } from './component/manager/permission-manager.service';
import { Role } from './component/manager/role';
import { AuthService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marketing-web';

  constructor(public authService: AuthService,private userS: PermissionManagerService) {}
  
  ngOnInit(): void {
    this.userS.authAs(localStorage.getItem('role') as Role);
    //console.log("user role "+ localStorage.getItem('role'));
  }

  logout() {
    this.authService.logout();
  }
}
