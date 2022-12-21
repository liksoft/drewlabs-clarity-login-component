import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProvidesQuery } from "@azlabsjs/ngx-query";
import { QueryProviderType } from "@azlabsjs/rx-query";
import { Observable } from "rxjs";

@Injectable()
@ProvidesQuery()
export class MembersQueryState
  implements QueryProviderType<[string, Record<string, unknown>]>
{
  // Creates instance of the class
  constructor(private http: HttpClient) {}

  query(args_0: string, args_1: Record<string, unknown>): Observable<any> {
    throw new Error();
  }
}
