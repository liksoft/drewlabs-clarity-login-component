import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { IDynamicForm } from "src/app/lib/core/components/dynamic-inputs/core/contracts/dynamic-form";
import { DynamicControlParser } from "src/app/lib/core/helpers/dynamic-control-parser";
import { TypeUtilHelper } from "src/app/lib/core/helpers/type-utils-helper";
import { isDefined, MomentUtils } from "src/app/lib/core/utils";
import { startsWith } from "lodash";
import { formControlViewModelBindings } from "src/app/lib/core/components/dynamic-inputs/core/compact";
import { DynamicFormControlInterface } from "../../../../../core/components/dynamic-inputs/core/compact/types";
import {
  cloneAbstractControl,
  ComponentReactiveFormHelpers,
} from "src/app/lib/core/components/dynamic-inputs/angular";
import { before } from "src/app/lib/core/utils/types/strings";

@Component({
  selector: "app-form-control",
  templateUrl: "./form-control.component.html",
  styles: [
    `
      .clr-accordion {
        display: block;
        counter-reset: accordion;
        margin-bottom: 5px;
      }

      span.badge.badge-orange {
        float: right;
      }

      clr-accordion-title.clr-accordion-title {
        width: 100%;
      }

      .field-title.section-title {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class FormControlComponent {
  @Input() title: string;
  @Input() badge: string | number;
  @Input() control: DynamicFormControlInterface;
  @Input() public componentFormGroup: FormGroup;
  @Input() public form: IDynamicForm;
  @Output() dissociateFormControl: EventEmitter<DynamicFormControlInterface> =
    new EventEmitter();
  @Output() formSubmitted = new EventEmitter<{ [index: string]: any }>();

  @Input() set controlViewState(value: {
    form: IDynamicForm;
    formgroup: FormGroup;
  }) {
    const localValue = { ...value };
    if (localValue) {
      this.form = localValue.form || this.form;
      this.componentFormGroup = localValue.formgroup
        ? cloneAbstractControl(localValue.formgroup)
        : this.componentFormGroup ||
          (this.controlParser.buildFormGroupFromDynamicForm(
            this.form
          ) as FormGroup);
      this.prefilForm();
    }
  }
  @Input() isExpanded: boolean = false;
  @Input() index: number;

  /**
   *
   * @param controlParser
   * @param typeHelper
   */
  constructor(
    private controlParser: DynamicControlParser,
    public readonly typeHelper: TypeUtilHelper
  ) {
    // super(uiStore);
  }

  async onEditFormControl() {
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.componentFormGroup
    );
    if (this.componentFormGroup.valid) {
      if (this.componentFormGroup.valid) {
        this.formSubmitted.emit({
          body: this.componentFormGroup.getRawValue(),
          requestURL: this.form.endpointURL,
          id: this.control.id,
        });
      }
    }
  }

  async onDissociateFormFormControlRelation() {
    this.dissociateFormControl.emit(this.control);
  }

  prefilForm() {
    if (this.control) {
      for (const [k, value] of Object.entries(formControlViewModelBindings())) {
        if (isDefined(this.componentFormGroup.get(k))) {
          if (k === "required_if") {
            this.componentFormGroup
              .get("control_is_conditionned")
              .setValue(isDefined(this.control[value]) ? "1" : "0");
            this.componentFormGroup
              .get("required_if")
              .setValue(this.control[value]);
            continue;
          }
          if (k === "selectable_model" && isDefined(this.control[value])) {
            const config: string = this.control[value] || "";
            const configParts = config.split("|");
            const filters = configParts.find((item) =>
              startsWith(item.trim(), "filters:")
            );
            const tableFilters = config.includes("table:")
              ? configParts.find((item) => startsWith(item.trim(), "table:"))
              : before("|filters", config);

            if (
              filters &&
              isDefined(this.componentFormGroup.get("model_filters"))
            ) {
              this.componentFormGroup
                .get("model_filters")
                .setValue(filters.replace("filters:", "").trim());
            }
            if (tableFilters) {
              const v = tableFilters.replace("table:", "").trim();
              this.componentFormGroup.get("data_source").setValue("2");
              this.componentFormGroup.get("selectable_model").setValue(v);
            }
            continue;
          }
          if (k === "min_date" || k === "max_date") {
            this.componentFormGroup
              .get(k)
              .setValue(
                isDefined(this.control[value])
                  ? MomentUtils.parseDate(
                      this.control[value] as string,
                      null,
                      "YYYY-MM-DD"
                    )
                  : null
              );
            continue;
          }
          if (k === "selectable_values" && isDefined(this.control[value])) {
            this.componentFormGroup.get("data_source").setValue("1");
          }
          this.componentFormGroup.get(k).setValue(this.control[value]);
        }
      }
    }
    this.componentFormGroup
      .get("data_source")
      .valueChanges.subscribe((state) => {
        if (isDefined(state) && +state === 1) {
          this.componentFormGroup.get("selectable_model").setValue(null);
          ComponentReactiveFormHelpers.clearControlValidators(
            this.componentFormGroup.get("selectable_model")
          );
          ComponentReactiveFormHelpers.setValidators(
            this.componentFormGroup.get("selectable_values"),
            Validators.compose([Validators.required])
          );
        } else {
          this.componentFormGroup.get("selectable_values").setValue(null);
          ComponentReactiveFormHelpers.clearControlValidators(
            this.componentFormGroup.get("selectable_values")
          );
          ComponentReactiveFormHelpers.setValidators(
            this.componentFormGroup.get("selectable_model"),
            Validators.compose([Validators.required])
          );
        }
      });
  }
}
