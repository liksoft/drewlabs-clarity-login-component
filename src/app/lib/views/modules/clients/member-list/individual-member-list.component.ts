import { Component, Input, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { GridColumnType } from "@azlabsjs/ngx-clr-smart-grid";
import { routes } from "src/app/lib/views/routes";

@Component({
  selector: "app-individual-member-list",
  template: `
    <ngx-clr-smart-grid
      [config]="{
        sizeOptions: [10, 50, 100, 150],
        pageSize: 5
      }"
      [columns]="columns"
    >
      <!-- Action Bar -->
      <ng-template #dgActionBar let-selected>
        <ng-container
          *ngTemplateOutlet="
            actionBarTemplate;
            context: {
              selected: this.selected,
              create: dgOnCreate.bind(this),
              refresh: dgOnRefresh.bind(this)
            }
          "
        ></ng-container>
      </ng-template>
      <!-- Action Bar -->
      <!-- Action overflow -->
      <ng-template #dgActionOverflow let-item>
        <ng-container
          *ngTemplateOutlet="overflowTemplate; context: { item: this.item }"
        ></ng-container>
      </ng-template>
      <!-- Action overflow -->
    </ngx-clr-smart-grid>
  `,
  styles: [],
})
export class IndividualMemberListComponent {
  @Input() overflowTemplate!: TemplateRef<any>;
  @Input() actionBarTemplate!: TemplateRef<any>;
  @Input() columns!: GridColumnType[];
  @Input() createRoute!: string;

  // Creates an instance of the current component
  constructor(private router: Router) {}

  dgOnCreate(event: Event) {
    this.router.navigateByUrl(
      this.createRoute ??
        `${routes.dashboardRoute}/${routes.clientsModuleRoute}/${routes.individualClientRoute}`
    );
  }

  dgOnRefresh(event: Event) {
    console.log("IndividualMemberListComponent: Refresh button clicked!");
  }
}
