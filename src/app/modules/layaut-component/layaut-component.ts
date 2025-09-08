import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CookieService } from '../../core/services/CookieService';

@Component({
  selector: 'app-layaut-component',
  imports: [
    NzLayoutModule,
    // NzHeaderModule,
    // NzContentModule,
    // NzFooterModule,
    RouterModule
  ],
  templateUrl: './layaut-component.html',
  styleUrl: './layaut-component.scss'
})
export class LayautComponent {

  constructor(private cookieService: CookieService, private router: Router) { }

  SignOff() {
    this.cookieService.delete('appToken');
    this.router.navigate(['/login']);
  }

}
