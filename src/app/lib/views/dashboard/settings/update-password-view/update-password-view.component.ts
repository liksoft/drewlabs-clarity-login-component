import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { CustomValidators } from "src/app/lib/core/components/dynamic-inputs/angular/validators";
import { ComponentReactiveFormHelpers } from "src/app/lib/core/components/dynamic-inputs/angular";

@Component({
  selector: "app-update-password-view",
  templateUrl: "./update-password-view.component.html",
  styles: [
    `
      .required-text,
      .field-has-error {
        color: rgb(241, 50, 50);
      }
      .button-container {
        margin-top: 1rem;
        align-items: flex-start;
        text-align: left;
      }
      .clr-form-control {
        text-align: left;
      }
    `,
  ],
})
export class UpdatePasswordViewComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup = this.builder.group({
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    password_confirmation: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });
  // tslint:disable-next-line: variable-name
  private _destroy$ = new Subject<void>();
  // Outputs
  @Output() cancelEvent = new EventEmitter<boolean>();

  constructor(private builder: FormBuilder) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.formGroup.setValidators(
      CustomValidators.match("password", "password_confirmation")
    );
    this.formGroup.updateValueAndValidity();
  }

  // tslint:disable-next-line: typedef
  onFormSubmitted(userID: number | string) {
    this.setPasswordAndPasswordConfirmationErrors(this.formGroup, null);
    ComponentReactiveFormHelpers.validateFormGroupFields(this.formGroup);
    if (this.formGroup.valid) {
      // TODO : SEND UPDATE USER DEFAILS REQUEST
    } else {
      if (this.formGroup.hasError("Match")) {
        this.setPasswordAndPasswordConfirmationErrors(this.formGroup, {
          Match: true,
        });
      }
    }
    return;
  }

  // tslint:disable-next-line: typedef
  setPasswordAndPasswordConfirmationErrors(formgroup: FormGroup, error: any) {
    ["password", "password_confirmation"].forEach((k) => {
      formgroup.get(k)?.setErrors(error);
    });
  }

  // tslint:disable-next-line: typedef
  onCancelBtnClicked() {
    this.cancelEvent.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
