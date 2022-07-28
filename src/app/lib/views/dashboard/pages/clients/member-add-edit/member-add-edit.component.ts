import { Component, Inject, Input } from "@angular/core";
import { Log } from "src/app/lib/bloc";
import { FormConfigInterface } from "@azlabsjs/smart-form-core";

@Component({
  selector: "app-member-add-edit",
  templateUrl: "./member-add-edit.component.html",
  styleUrls: ["./member-add-edit.component.scss"],
})
export class MemberAddEditComponent {

  @Input() form!: FormConfigInterface;

  ngxFormSubmit(event: Record<string, unknown>) {
    Log(event);
  }
}
