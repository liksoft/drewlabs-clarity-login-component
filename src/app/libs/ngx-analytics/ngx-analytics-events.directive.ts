import { Directive, ElementRef, Input } from "@angular/core";
import { NgxAnalytics } from "./ngx-analytics.service";

type Events = "click" | "hover" | "load" | "change" | "mouseover" | "mouseout";

@Directive({
  selector: "[ngxAnalyticsEvents]",
})
export class NgxAnalyticsEventsDirective {
  //#region Directive input properties
  @Input() events!: Events | Events[];
  //#endregion Directive input properties

  /**
   * Creates a directive instance
   *
   * @param analytics
   * @param el
   */
  constructor(private analytics: NgxAnalytics, private el: ElementRef) {
    const events = Array.isArray(this.events)
      ? (this.events as string[])
      : [this.events as string];

    for (const event of events) {
      (this.el.nativeElement as HTMLElement).addEventListener(
        event,
        (e: Event) => {
          const { target, timeStamp } = e;
          this.trackEvents(event, {
            target,
            timeStamp,
          });
        }
      );
    }
  }

  private trackEvents(name: string, payload: unknown) {
    this.analytics.trackEvent(name, payload);
  }
}
