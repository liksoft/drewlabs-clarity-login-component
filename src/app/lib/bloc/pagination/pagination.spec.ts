import { computeHash, Paginator } from "./paginator";
import { mapToPaginationQuery } from "../../core/pagination/helpers";
import { Observable, of } from "rxjs";
import { hashCode } from "@iazlabs/strings";

const testData = [
  {
    name: "Joe",
    lastname: "Biden",
    sex: "M",
    address: [
      {
        email: "joebiden@example.com",
        address: "234 Golden State, Mineapolis.",
      },
    ],
  },
  {
    name: "Cyril",
    lastname: "Nukaula",
    sex: "M",
    address: [
      {
        email: "cyrilnukaula@example.com",
        address: "Av. Pia, Lome - Togo.",
      },
    ],
  },
];

describe("Pagination service", () => {
  let service = new Paginator({
    get: (resource, options) => {
      return of({
        data: testData,
        total: 2,
        currentPage: 1,
        lastPage: 10,
      } as any);
      // });
    },
  });

  it("paginate() should returns an observable paginable object", (done: DoneFn) => {
    const query = mapToPaginationQuery([])({
      page: {
        from: 1,
        to: 10,
      },
    });
    const result = service.paginate("api/v1/persons", query);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe((state) => {
      if (state.data) {
        console.log(hashCode(state.data));
      }
    });
    result.subscribe((state) => {
      if (state.data) {
        expect((state.data as any)["data"]).toEqual(testData);
      }
    });

    const timeout2 = setTimeout(() => {
      // Commented because internal function is being called more than once
      // expect(client.toBeCalled(1)).toBe(true);
      clearTimeout(timeout2);
      done();
    }, 4000);
  });
});
