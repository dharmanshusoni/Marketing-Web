import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionType } from './permission-type';
import { PermissionManagerService } from './permission-manager.service';

@Directive({
  selector: '[appIsGranted]'
})
export class IsGrantedDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionManagerS: PermissionManagerService
  ) { }

  @Input() set appIsGranted(permission: any) {
    var activePermission = permission as PermissionType;
    this.isGranted(activePermission);
  }

  private isGranted(permission: PermissionType) {
    if (this.permissionManagerS.isGranted(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}