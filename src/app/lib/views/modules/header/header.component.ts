import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ViewHeader } from "./header.service";

@Component({
  selector: "app-view-header",
  templateUrl: "./header.component.html",
})
export class ViewHeaderComponent implements OnChanges {
  // #region component properties
  state$ = this.viewHeader.state$;

  @Input("title-class") titleNgClass: string = "lik-card-title";
  @Input("desc-class") descriptionNgClass: string = "lik-card-description";
  @Input() title!: string;
  @Input() description!: string;
  // #endregion component properties

  constructor(private viewHeader: ViewHeader) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["title"] || changes["description"]) {
      this.viewHeader.setState((state) => ({
        title: this.title ?? state.title,
        description: this.description ?? state.description,
      }));
    }
  }
}
