import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormsClient, FORM_CLIENT } from "@azlabsjs/ngx-smart-form";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { JSDate } from "@azlabsjs/js-datetime";
import {
  UIStateProvider,
  UI_STATE_PROVIDER,
} from "src/app/lib/views/partials/ui-state";
// import { IndividualMembersService } from "../clients.service";
// import { lastValueFrom } from "rxjs";

@Component({
  selector: "app-individual-member-add",
  template: `
    <ng-container *ngIf="form$ | async as form">
      <app-member-add-edit
        [form]="form"
        (submit)="onSubmit($event)"
      ></app-member-add-edit>
    </ng-container>
  `,
})
export class IndividualMemberAddComponent implements OnInit {
  form$ = this.client.get(
    this.configManager.get(
      "forms.views.createIndividualClient",
      this.activateRoute.snapshot.data["formId"]
    )
  );

  constructor(
    @Inject(FORM_CLIENT) private client: FormsClient,
    @Inject(APP_CONFIG_MANAGER) private configManager: ConfigurationManager,
    private activateRoute: ActivatedRoute,
    @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider,
    // private individuals: IndividualMembersService
  ) {}

  ngOnInit(): void {}

  async onSubmit(event: Record<string, unknown>) {
    const details = event["by"] as Record<string, unknown>;
    const files = (event["files"] ?? []) as Record<string, unknown>[];
    const request: Record<string, unknown> = {
      member: event["member"],
      by: {
        ...details,
        birthdate: details["birthdate"]
          ? JSDate.format(
              JSDate.create(details["birthdate"] as string, "d/m/y")
            )
          : undefined,
        address: event["address"],
      },
    };

    if (Array.isArray(files) && files.length !== 0) {
      request["files"] = files.map((file) => ({
        ...file,
        expired_at: file["expired_at"]
          ? JSDate.format(JSDate.create(file["expired_at"] as string, "d/m/y"))
          : undefined,
      }));
    }
    // TODO: Send the create member request
    // console.log(await lastValueFrom(this.individuals.create(request)));
    // TODO: Using the created member id, create the stake holders

    // TODO: Add the end action message as parameter
    this.uiState.endAction();
  }
}
