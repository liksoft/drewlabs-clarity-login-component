import { Inject, Injectable, Optional } from "@angular/core";
import { concatMap, forkJoin, from, map } from "rxjs";
import { ConfigurationManager, CONFIG_MANAGER } from "../../core/configuration";
import { endpoint } from "../helpers/uri";
import { Address, Individual, Membership, Moral } from "../models";
import { HTTP_CLIENT, RequestClient, MembershipRequestModel } from "../types";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  //#region Class properties
  private host!: string;
  private addressEndpoint!: string;
  private moralsEndpoint!: string;
  private individualsEndpoint!: string;
  //#endregion Class properties

  // Creates an instance of membership service class
  public constructor(
    @Inject(HTTP_CLIENT) private client: RequestClient,
    @Inject(CONFIG_MANAGER) @Optional() config: ConfigurationManager
  ) {
    if (config) {
      this.host = config.get("api.host");
      this.addressEndpoint = config.get("api.endpoints.clients.addresses");
      this.moralsEndpoint = config.get("api.endpoints.clients.individuals"); //
      this.moralsEndpoint = config.get("api.endpoints.clients.morals"); //
    }
  }

  /**
   * Implementation for creating membership of a given client
   *
   * @param path
   * @param request
   */
  public createMembership(path: string, request: MembershipRequestModel) {
    return from(
      // TODO : Create Client address instance
      forkJoin([
        this.client.request<Address>(
          endpoint(this.host, path),
          "POST",
          request.address,
          {
            responseType: "json",
          }
        ),
        this.client.request<Membership>(
          endpoint(this.host, path),
          "POST",
          request,
          {
            responseType: "json",
          }
        ),
      ])
    ).pipe(
      // Merge the request moral or individual with the address_id entry
      map(([address, membership]) =>
        request.moral
          ? {
              ...request,
              moral: {
                address_id: address.id,
                ...request.moral,
                member_id:
                  typeof membership.member !== "undefined" &&
                  membership.member !== null
                    ? membership.member.id
                    : membership.id,
              },
            }
          : {
              ...request,
              individual: {
                address_id: address.id,
                ...request.individual,
                member_id:
                  typeof membership.member !== "undefined" &&
                  membership.member !== null
                    ? membership.member.id
                    : membership.id,
              },
            }
      ),
      concatMap((state) =>
        state.moral
          ? this.client.request<Individual>(
              this.moralsEndpoint,
              "POST",
              state.moral
            )
          : this.client.request<Moral>(
              this.individualsEndpoint,
              "POST",
              state.individual
            )
      ),
      map((state) => {})
    );
  }
}
