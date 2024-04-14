import { Component, OnInit } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title!: string;
  message!: string;
  btnOkText!: string;
  btnCancelText!: string;
  result!: boolean;
  formModal: any;
  
  constructor() { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  confirm() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.result = true;
    this.formModal.hide();
  }

  decline() {
    this.result = false;
    this.formModal.hide();
  }

}
