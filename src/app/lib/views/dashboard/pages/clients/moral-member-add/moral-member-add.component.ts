import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormsClient, FORM_CLIENT } from "@azlabsjs/ngx-smart-form";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";

@Component({
  selector: "app-moral-member-add",
  templateUrl: "./moral-member-add.component.html",
})
export class MoralMemberAddComponent implements OnInit {
  form$ = this.client.get(
    this.configManager.get(
      "forms.views.createMoralClient",
      this.activateRoute.snapshot.data["formId"]
    )
  );

  constructor(
    @Inject(FORM_CLIENT) private client: FormsClient,
    @Inject(APP_CONFIG_MANAGER) private configManager: ConfigurationManager,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
