import { Observable } from "rxjs";

export type Action<T = unknown> = {
  name: string;
  payload?: T;
};

export interface CommandInterface<T = unknown, R = unknown> {
  dispatch(action: Action<T>): R;
}
