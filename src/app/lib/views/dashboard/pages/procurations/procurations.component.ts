import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/lib/core/auth/core';
import { RoutesMap } from 'src/app/lib/core/routes';

@Component({
  selector: 'app-procurations',
  templateUrl: './procurations.component.html',
  styleUrls: ['./procurations.component.scss']
})
export class ProcurationsComponent {
  public navbarRoutesMap: RoutesMap[];
  constructor(private auth: AuthService) {}
}
