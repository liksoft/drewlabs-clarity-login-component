import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/lib/core/auth/core';
import { RoutesMap } from 'src/app/lib/core/routes';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.scss']
})
export class MemberViewComponent{
  public navbarRoutesMap: RoutesMap[];
  constructor(private auth: AuthService) {}
}
