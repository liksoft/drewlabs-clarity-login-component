import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/lib/core/auth/core';
import { RoutesMap } from 'src/app/lib/core/routes';

@Component({
  selector: 'app-member-add-edit',
  templateUrl: './member-add-edit.component.html',
  styleUrls: ['./member-add-edit.component.scss']
})

export class MemberAddEditComponent {
  public navbarRoutesMap: RoutesMap[];
  constructor(private auth: AuthService) {}
}
