import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForgotpasswordService} from '../services/forgotpassword.service';
import {NotificationService} from '../../../../shared/services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  isHidden = false;

  constructor(private forgotPasswordService: ForgotpasswordService,
              private notificationService: NotificationService) {
  }

  forgotPasswordForm: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    }
  );


  sendPasswordRecoveryLink(email): void {
    this.forgotPasswordService.sendRecoverPasswordEmailLink(email).subscribe((res) => {
      this.notificationService.showNotification(res.Success, 'success');
      this.isHidden = true;
      this.forgotPasswordForm.disable();
    });
  }

  ngOnInit(): void {
  }

}
