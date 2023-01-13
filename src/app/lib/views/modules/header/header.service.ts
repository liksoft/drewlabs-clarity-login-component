import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

type ViewHeaderStateType = { title?: string; description?: string };

@Injectable()
export class ViewHeader {
  /**
   * Internal view header state producer
   */
  _state$ = new BehaviorSubject<ViewHeaderStateType>({});

  /**
   * View header state observable
   */
  state$ = this._state$.asObservable();

  /**
   * Update the view header state value
   *
   * @param project
   * @returns
   */
  public setState(
    project:
      | ViewHeaderStateType
      | ((state: ViewHeaderStateType) => ViewHeaderStateType)
  ) {
    if (typeof project === "function") {
      return this._state$.next(project(this._state$.getValue()));
    }
    return this._state$.next(project);
  }
}
