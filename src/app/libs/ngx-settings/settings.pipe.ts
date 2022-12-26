import {
    ChangeDetectorRef,
    OnDestroy,
    Pipe,
    PipeTransform,
} from "@angular/core";
import { Subject, map, takeUntil } from "rxjs";
import { SettingsProvider } from "./settings.service";

@Pipe({
  name: "azlSetting",
})
export class SettingPipe implements PipeTransform, OnDestroy {
  // #region Class properties
  private result!: string;
  private last!: string | number;
  private lastParams: string[] = [];
  private _destroy$ = new Subject<void>();
  // #endregion Class properties

  /**
   * Creates a new setting pipe instance
   */
  constructor(
    private settingsProvider: SettingsProvider,
    private cdRef: ChangeDetectorRef
  ) {}
  /**
   * Compares the provided parameters agains the last
   * parameters values
   */
  private paramsEquals(params: string[]) {
    let equals = true;
    for (let index = 0; index < params.length; index++) {
      if (this.lastParams[index] !== params[index]) {
        equals = false;
        break;
      }
    }
    return equals;
  }

  /**
   * Updates the internal result property of the
   * current pipe instance
   */
  private updateResult(
    query: string,
    name: string,
    key: string = "id",
    label: string = "label"
  ) {
    let onSetting = (res: string) => {
      this.result = res !== undefined && res !== null ? res : query;
      this.last = query;
      this.cdRef.markForCheck();
    };
    this.settingsProvider.settings
      .pipe(
        map((state) => {
          if (
            typeof query === "undefined" ||
            query === null ||
            !String(query).length
          ) {
            throw new Error(`"value" parameter required`);
          }
          if (
            typeof name === "undefined" ||
            name === null ||
            !String(name).length
          ) {
            throw new Error(`"name" parameter required`);
          }
          let result = "";
          const settings = state.get(name);
          if (typeof settings !== "undefined" && settings !== null) {
            const setting = settings.find(
              (s) => String(s[key]) === String(query)
            );
            if (setting) {
              result = (setting[label] as string) ?? "";
            }
          }
          return result;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe(onSetting);
  }

  /**
   * Transform user provided query value and return
   * the corresponding label from the settings provider
   */
  transform(
    query: string | number,
    name: string,
    key: string = "id",
    label: string = "label"
  ) {
    const _query = String(query);
    if (!_query || !_query.length) {
      return _query;
    }
    // if we ask another time for the same key, return the last value
    if (_query === this.last && this.paramsEquals([name, key, label])) {
      return this.result;
    }
    this.last = _query;
    this.lastParams = [name, key, label];
    this.updateResult(_query, name, key, label);
    return this.result;
  }

  /**
   * {@inheritdoc}
   *
   * Provides object destruction implementation
   */
  ngOnDestroy() {
    this._destroy$.next();
  }
}
