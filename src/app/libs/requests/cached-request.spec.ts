import { first, interval, lastValueFrom } from "rxjs";
import { cacheRequest } from "./caching";
import { Requests } from "./requests";

describe("Cached request class cache tests", () => {
  let defaultWindow = window;

  beforeEach(async () => {});

  it("should test whether the window object is present in a testing environment", () => {
    expect(defaultWindow).toBeTruthy();
  });

  it("It should run the request 2 times, before 2000 ms given a refetchInterval of 700 ms", async () => {
    let resultCallCounts = 0;
    let resultState!: number[];
    const argument = () => {
      return new Promise<number[]>((resolve) => {
        resolve([1, 2, 3, 4]);
      });
    };
    const request = cacheRequest({
      argument,
      objectid: Requests.guid(),
      callback: argument,
      refetchCallback: (state) => {
        resultCallCounts = resultCallCounts + 1;
        resultState = state as number[];
      },
      properties: {
        refetchInterval: 700,
        retries: (attempts, error) => {
          return attempts < 3 || error !== "Server Error";
        },
      },
      window: defaultWindow,
    });

    await lastValueFrom(interval(2000).pipe(first()));
    // Destroy the cached request
    request.destroy();
    expect(resultCallCounts).toEqual(2);
    expect(resultState).toEqual([1, 2, 3, 4]);
  });

  it("should not try more than 4 times on error", async () => {
    const argument = () => {
      return new Promise<number[]>((_, reject) => {
        reject("Server Error");
      });
    };
    const request = cacheRequest({
      objectid: Requests.guid(),
      argument,
      callback: argument,
      refetchCallback: (state) => {
        //
      },
      properties: {
        retries: (attempts, error) => {
          return attempts < 3 || error !== "Server Error";
        },
      },
      lastError: new Error("Server Error Occured!"),
    });

    await lastValueFrom(interval(2000).pipe(first()));
    request.destroy();
    expect((request as any).retryState.tries).toEqual(2);
    expect((request as any).retryState.lastError).toEqual("Server Error");
  });

  it("should not invoke the background request when the request is not mark as stale", async () => {
    const payload = () => {
      return new Promise<string>((resolve) => {
        resolve("Response from server");
      });
    };
    let refetchCount = 0;
    const request = cacheRequest({
      objectid: Requests.guid(),
      callback: payload,
      refetchCallback: (response) => {
        refetchCount = refetchCount + 1;
      },
      properties: {
        refetchInterval: 500,
        retries: 3,
        staleTime: 1000,
      },
    });
    await lastValueFrom(interval(2000).pipe(first()));
    request.destroy();
    expect(refetchCount).toEqual(1);
  });
});
