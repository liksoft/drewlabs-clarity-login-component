import { Component } from "@angular/core";
import { AuthService } from "../../../core/auth/core";
import { RoutesMap } from "src/app/lib/core/routes";

@Component({
  selector: "app-admin-dashboard-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class AdminDashboardHomeComponent {
  public navbarRoutesMap: RoutesMap[];

  public transactions = [
    {
      "id" : 1,
      "date" : "2022-01-10 12:45:44",
      "partenaire" : "53021 BTCI",
      "transaction" : 12,
      "fichier" : "http://localhost:22000/dashboard/home",
    },
    {
      "id" : 2,
      "date" : "2022-01-11 12:45:44",
      "partenaire" : "53021 BTCI",
      "transaction" : 45,
      "fichier" : "http://localhost:22000/dashboard/home",
    },
    {
      "id" : 3,
      "date" : "2022-01-12 12:45:44",
      "partenaire" : "53021 BTCI",
      "transaction" : 56,
      "fichier" : "http://localhost:22000/dashboard/home",
    },
    {
      "id" : 4,
      "date" : "2022-01-13 12:45:44",
      "partenaire" : "53021 BTCI",
      "transaction" : 85,
      "fichier" : "http://localhost:22000/dashboard/home",
    },
    {
      "id" : 5,
      "date" : "2022-01-14 12:45:44",
      "partenaire" : "53021 BTCI",
      "transaction" : 0,
      "fichier" : "http://localhost:22000/dashboard/home",
    },

  ];
  constructor(private auth: AuthService) {}
}
