import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormsClient, FORM_CLIENT } from "@azlabsjs/ngx-smart-form";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";

@Component({
  selector: "app-individual-member-add",
  templateUrl: "./individual-member-add.component.html",
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
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
