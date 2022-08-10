import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormsClient, FORM_CLIENT } from "@azlabsjs/ngx-smart-form";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { lastValueFrom, tap } from "rxjs";
import { Log } from "src/app/lib/bloc";
import { JSDate } from "@azlabsjs/js-datetime";
import { MoralMembersService } from "../clients.service";

@Component({
  selector: "app-moral-member-add",
  template: `
    <ng-container *ngIf="form$ | async as form">
      <app-member-add-edit
        [form]="form"
        (submit)="onSubmit($event)"
      ></app-member-add-edit>
    </ng-container>
  `,
})
export class MoralMemberAddComponent implements OnInit {
  form$ = this.client
    .get(
      this.configManager.get(
        "forms.views.createMoralClient",
        this.activateRoute.snapshot.data["formId"]
      )
    )
    .pipe(tap(Log));

  constructor(
    @Inject(FORM_CLIENT) private client: FormsClient,
    @Inject(APP_CONFIG_MANAGER) private configManager: ConfigurationManager,
    private activateRoute: ActivatedRoute,
    private morals: MoralMembersService
  ) {}

  ngOnInit(): void {}

  async onSubmit(event: Record<string, unknown>) {
    const details = event["by"] as Record<string, unknown>;
    const files = (event["files"] ?? []) as Record<string, unknown>[];
    const request: Record<string, unknown> = {
      member: event["member"],
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
    console.log(await lastValueFrom(this.morals.create(request)));
    // TODO: Using the created member id, create the stake holders
  }
}
