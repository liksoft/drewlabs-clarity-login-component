import { DynamicFormControlInterface, DynamicFormInterface } from "src/app/lib/core/components/dynamic-inputs/core/compact";

/**
 * @description Interface definition for dissociate form control event
 */
export interface IDissociateFormControlEvent {
    control: DynamicFormControlInterface;
    form: DynamicFormInterface;
}