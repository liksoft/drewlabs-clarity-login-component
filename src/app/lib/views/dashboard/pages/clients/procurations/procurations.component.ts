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

  public procurationsList = [
    {
      "id" : 4,
      "date" : "2022-01-21 12:45:44",
      "memberId" : 7,
      "lastName" : "EKPEH",
      "firstName" : "ADEVOU FERA",
      "phone" : "+228 70422148",
      "status" : "ACTIVE"
    },
    {
      "id" : 5,
      "date" : "2021-01-24 10:45:44",
      "memberId" : 7,
      "lastName" : "ABALO",
      "firstName" : "LARISSA",
      "phone" : "+228 72422148",
      "status" : "ACTIVE"
    },
  ];

  constructor(private auth: AuthService) {}

}
