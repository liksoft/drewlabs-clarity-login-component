import { first, interval, lastValueFrom } from "rxjs";
import { cacheRequest } from "./helpers";
import { Requests } from "./requests";

describe("Requests cache tests", () => {
  let defaultWindow = window;

  beforeEach(async () => {});

  it("should test whether the window object is present in a testing environment", () => {
    expect(defaultWindow).toBeTruthy();
  });

  it("It should run the request 2 times, before 2000 ms given a refetchInterval of 700 ms", async () => {
    let resultCallCounts = 0;
    let resultState!: number[];
    const payload = () => {
      return new Promise<number[]>((resolve) => {
        resolve([1, 2, 3, 4]);
      });
    };
    const request = cacheRequest({
      payload,
      id: Requests.createRequestID(),
      callback: payload,
      refetchCallback: (state) => {
        resultCallCounts = resultCallCounts + 1;
        resultState = state;
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
    const payload = () => {
      return new Promise<number[]>((_, reject) => {
        reject("Server Error");
      });
    };
    const request = cacheRequest({
      id: Requests.createRequestID(),
      payload,
      callback: payload,
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
    expect(request.retryState.tries).toEqual(2);
    expect(request.retryState.lastError).toEqual("Server Error");
  });
});
