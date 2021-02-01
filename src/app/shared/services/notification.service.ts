import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public toastrService: ToastrService) {
  }

  public showNotification(message: string, type: string = 'info'): void {
    switch (type) {
      case 'success':
        this.toastrService.success(message);
        break;
      case 'error':
        this.toastrService.error(message);
        break;
      case 'info':
        this.toastrService.info(message);
        break;
      case 'warning':
        this.toastrService.warning(message);
        break;
      default:
        this.toastrService.info(message);
        break;
    }
  }
}
