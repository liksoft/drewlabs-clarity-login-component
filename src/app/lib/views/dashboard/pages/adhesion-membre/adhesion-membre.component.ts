import { Component } from '@angular/core';
import { AuthService } from 'src/app/lib/core/auth/core';
import { RoutesMap } from 'src/app/lib/core/routes';

@Component({
  selector: 'app-adhesion-membre',
  templateUrl: './adhesion-membre.component.html',
  styleUrls: ['./adhesion-membre.component.scss']
})
export class AdhesionMembreComponent {
  public navbarRoutesMap: RoutesMap[];

  constructor(private auth: AuthService) {}
}
