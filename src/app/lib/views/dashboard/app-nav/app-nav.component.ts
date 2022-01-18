import { Component, OnInit } from "@angular/core";
import { RoutesMap } from "src/app/lib/core/routes";

@Component({
  selector: "app-nav",
  template: `
    <app-sidebar
      [routesMap]="routesMap"
      [routeDescriptions]="routeDefinitions"
    ></app-sidebar>
  `,
  styles: [],
})
export class AppNavComponent implements OnInit {
  public routesMap: RoutesMap[];
  public routeDefinitions: { [index: string]: string };

  public ngOnInit(): void {
    this.routeDefinitions = {
      navbar_dashboard: "Tableau de Bord",
    };
    this.routesMap = [
      {
        key: "navbar_dashboard",
        routeIcon: "home",
        children: [],
      },
    ];
  }
}
