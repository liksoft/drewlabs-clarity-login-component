import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges, SimpleChanges
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { _avatar } from "./_icons";

type SizeType = "md" | "sm" | "lg" | "x-lg";

@Component({
  selector: "svg-icons",
  template: `
    <span class="icon" [innerHTML]="getIcon(shape)" [ngClass]="ngClass"></span>
  `,
  styleUrls: ["./icons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent implements OnChanges {
  @Input() shape!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() color!: string;
  @Input() size!: SizeType;

  get ngClass() {
    return this.size ? { [this.size]: true } : {};
  }

  private _icons: Record<
    string,
    (
      color: string,
      width: string | number,
      height: string | number,
      stroke?: string,
      backgroundColor?: string
    ) => string
  > = {
    avatar: _avatar,
  };

  get _size() {
    return {
      sm: [24, 24],
      md: [32, 32],
      lg: [75, 75],
      "x-lg": [120, 120],
    } as Record<SizeType, [number, number]>;
  }
  private _constraints: [number, number] = [32, 32];

  constructor(private sanitized: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["height"] || changes["width"] || changes["size"]) {
      this.setConstraints();
    }
  }

  private setConstraints() {
    const [width, height] = [
      this.width ?? this.height,
      this.height ?? this.width,
    ];
    this._constraints =
      typeof height === "undefined" &&
      height === null &&
      typeof width === "undefined" &&
      height === null
        ? [width, height]
        : this.size
        ? this._size[this.size]
        : [32, 32];
  }

  getIcon(name: string) {
    const [width, height] = this._constraints;
    return this.sanitized.bypassSecurityTrustHtml(
      this._icons[name](this.color, width, height) ?? ""
    );
  }
}
