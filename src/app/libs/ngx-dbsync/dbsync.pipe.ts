import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform
} from "@angular/core";
import { map, Subject, takeUntil } from "rxjs";
import { DBSyncProvider } from "./dbsync.service";

@Pipe({
  name: "azldbvalue",
})
export class AzlDbValuePipe implements PipeTransform, OnDestroy {
  // #region Class properties
  private result!: string;
  private last!: string | number;
  private lastParams: string[] = [];
  private _destroy$ = new Subject<void>();
  // #endregion Class properties

  /**
   * Creates a new {@see AzlDbValuePipe} pipe instance
   */
  constructor(
    private provider: DBSyncProvider,
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
    let onResult = (res: string) => {
      this.result = res !== undefined && res !== null ? res : query;
      this.last = query;
      this.cdRef.markForCheck();
    };
    this.provider.state$
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
          const _result = state.get(name);
          if (typeof _result !== "undefined" && _result !== null) {
            const _value = _result.find(
              (s) => String(s[key]) === String(query)
            );
            if (_value) {
              result = (_value[label] as string) ?? "";
            }
          }
          return result;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe(onResult);
  }

  /**
   * Transform user provided query value and return
   * the corresponding label from the db provider
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
