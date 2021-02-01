import {AuthService} from '../../modules/auth/components/services/auth.service';
import {Observable} from 'rxjs';

export function appInitializer(authService: AuthService): any {
  return () => new Promise(resolve => {
    authService.refreshAccessToken().subscribe().add(resolve);
  });
}
