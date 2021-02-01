import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../../shared/services/notification.service';
import {ResetpasswordService} from '../services/resetpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  passwordsMatch = false;
  providedHash;
  isHidden = false;

  constructor(private activatedRoute: ActivatedRoute, private notificationService: NotificationService,
              private resetPasswordService: ResetpasswordService) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.providedHash = res.hash;
    });
  }

  resetPasswordForm: FormGroup = new FormGroup({
    hash: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPasswordRepeated: new FormControl('', [Validators.required])
  });

  verifyPasswordsAreSame(): void {
    if (this.resetPasswordForm.controls.newPassword.value !== this.resetPasswordForm.controls.newPasswordRepeated.value) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

  resetUserPassword(hashAndPasswords: {}): void {
    console.log(this.passwordsMatch);
    if (!this.passwordsMatch) {
      this.resetPasswordService.resetUserPassword(hashAndPasswords).subscribe((res) => {
        this.notificationService.showNotification(res.success, 'success');
        this.isHidden = true;
        this.resetPasswordForm.disable();
      });
    } else {
      this.notificationService.showNotification('The passwords need to match', 'error');
    }
  }

  ngOnInit(): void {
  }

}
