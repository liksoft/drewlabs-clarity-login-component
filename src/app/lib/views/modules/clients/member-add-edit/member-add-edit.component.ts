import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { Log } from "src/app/lib/bloc";
import { FormConfigInterface } from "@azlabsjs/smart-form-core";

@Component({
  selector: "app-member-add-edit",
  templateUrl: "./member-add-edit.component.html",
  styleUrls: ["./member-add-edit.component.scss"],
})
export class MemberAddEditComponent {
  //#region Component inputs
  @Input() form!: FormConfigInterface;
  //#endregion Component outputs

  //#region Component outputs
  @Output() submit = new EventEmitter<Record<string, unknown>>();
  //#endregion Component outputs

  ngxFormSubmit(event: Record<string, unknown>) {
    this.submit.emit(event);
  }
}
