import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionType } from './permission-type';
import { PermissionManagerService } from './permission-manager.service';
import { Role } from './role';

@Directive({
  selector: '[appRole]'
})
export class IsRoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionManagerS: PermissionManagerService
  ) { }

  @Input() set appRole(role:string[]) {
    this.appUserRole(role);
  }

  private appUserRole(role:string[]) {
    // console.log(role);
    // console.log(localStorage.getItem('role') as Role);
    // console.log(role.includes(localStorage.getItem('role') as Role));
    if(role.includes(localStorage.getItem('role') as Role))
        this.viewContainer.createEmbeddedView(this.templateRef);
    else
        this.viewContainer.clear();
  }

}