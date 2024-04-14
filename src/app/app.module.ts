import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { PermissionManagerService } from './component/manager/permission-manager.service';
import { IsGrantedDirective } from './component/manager/is-granted.directive';
import { IsRoleDirective } from './component/manager/is-role.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SpinnerComponent,
    IsGrantedDirective,
    IsRoleDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true,
    },
    DatePipe,
    PermissionManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
