import { of } from "rxjs";
import { CachedRequest, RequestsCache } from "./cache";
import { cacheRequest, requestsCache } from "./helpers";
import { Requests } from ".";
import { HTTPRequestMethods, RequestInterface } from "./types";

describe("Requests cache test", () => {
  let cache!: RequestsCache<string>;

  beforeEach(() => {
    cache = requestsCache();
  });

  it("should create an instance of Cache class", () => {
    expect(cache).toBeTruthy();
    expect(cache).toBeInstanceOf(RequestsCache);
  });

  it("should test add RequestsCache.add() method and expect cache length to grow by the size of 1", () => {
    cache.add(
      cacheRequest({
        objectid: Requests.createRequestID(),
        callback: () => of("Server Response"),
        properties: true,
        refetchCallback: (response) => {},
      })
    );
    expect(cache.length).toBe(1);
  });

  it("should add a value to the cache an retrieve it using the payload value", () => {
    const payload: RequestInterface = {
      method: "GET",
      body: {
        _query: JSON.stringify({
          where: [
            ["firstname", "like", "Az%"],
            ["lastname", "like", "%Sidoine%"],
          ],
        }),
      },
      params: {
        post_id: 23,
      },
    };
    cache.add(
      cacheRequest({
        objectid: Requests.createRequestID(),
        callback: () => of("Server Response"),
        properties: true,
        refetchCallback: (response) => {},
        payload: ["get_api/v1/comments:post_id", payload],
      })
    );
    cache.add(
      cacheRequest({
        objectid: Requests.createRequestID(),
        callback: () => of("Server Response"),
        properties: true,
        refetchCallback: (response) => {},
      })
    );
    const result = cache.at(
      cache.indexOf([
        "get_api/v1/comments:post_id",
        {
          method: "GET",
          body: {
            _query: JSON.stringify({
              where: [
                ["firstname", "like", "Az%"],
                ["lastname", "like", "%Sidoine%"],
              ],
            }),
          },
          params: {
            post_id: 23,
          },
        },
      ])
    );
    expect(result).toBeInstanceOf(CachedRequest);
  });

  it("should add a value to the cache an retrieve it using request id", () => {
    const payload: RequestInterface = {
      method: "GET",
      body: {
        _query: JSON.stringify({
          where: [
            ["firstname", "like", "Az%"],
            ["lastname", "like", "%Sidoine%"],
          ],
        }),
      },
      params: {
        post_id: 23,
      },
    };
    const objecId = Requests.createRequestID();
    const objectid2 = Requests.createRequestID();
    cache.add(
      cacheRequest({
        objectid: objecId,
        callback: () => of("Server Response"),
        properties: true,
        refetchCallback: (response) => {},
      })
    );
    cache.add(
      cacheRequest({
        objectid: objectid2,
        callback: () => of("Server Response 2"),
        properties: true,
        refetchCallback: (response) => {},
      })
    );
    const result = cache.at(cache.indexOf(objecId));
    const result2 = cache.at(cache.indexOf(objectid2));
    expect(result).toBeInstanceOf(CachedRequest);
    expect(result2).toBeInstanceOf(CachedRequest);
  });

  it("should return false if cache does not contains a given key else it returns true", () => {
    const objectid = Requests.createRequestID();
    const objectid2 = Requests.createRequestID();
    cache.add(
      cacheRequest({
        objectid,
        callback: () => of("Server Response"),
        properties: true,
        refetchCallback: (response) => {},
        payload: "Hello World!",
      })
    );
    cache.add(
      cacheRequest({
        objectid: objectid2,
        callback: () => of("Server Response 2"),
        properties: true,
        refetchCallback: (response) => {},
      })
    );
    expect(cache.contains(Requests.createRequestID())).toBeFalse();
    expect(cache.contains("Hello World!")).toBeTrue();
    expect(cache.contains(objectid)).toBeTrue();
  });

  it("should test if the cache is empty when clear() is called", () => {
    const objectid = Requests.createRequestID();
    cache.add(
      cacheRequest({
        objectid,
        callback: () => of("Server Response"),
        properties: true,
        refetchCallback: () => {},
      })
    );
    expect(cache.length).toEqual(1);
    cache.clear();
    expect(cache.length).toEqual(0);
    expect(cache.isEmpty()).toBeTrue();
  });

  it("should return false when RequestsCache.contains() is called a cache item that has been removed", () => {
    const objectid = Requests.createRequestID();
    const objectid2 = Requests.createRequestID();
    cache.add(
      cacheRequest({
        objectid,
        callback: () => of("Server Response 1"),
        properties: true,
        refetchCallback: () => {},
        payload: "Hello World!",
      })
    );
    cache.add(
      cacheRequest({
        objectid: objectid2,
        callback: () => of("Server Response"),
        properties: true,
        refetchCallback: () => {},
      })
    );

    cache.removeAt(cache.indexOf("Hello World!"));
    expect(cache.length).toEqual(1);
    expect(cache.get("Hello World!")).toBeUndefined();
    expect(cache.contains(objectid2)).toBeTrue();
  });

  it("should return true for cached function call", () => {
    const objectid = Requests.createRequestID();
    cache.add(
      cacheRequest({
        objectid,
        callback: () => {
          return new Promise((resolve) => {
            resolve("In publishing and graphic design");
          });
        },
        properties: true,
        refetchCallback: (response) => {},
        payload: [
          // "get_api/v1/comments:post_id",
          (path: string, method: any) => {
            return {
              title: "In publishing and graphic design",
              content:
                "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available",
              createdAt: "2022-11-20 18:20",
            };
          },
          // "api/v1/books",
          // "GET",
        ],
      })
    );
    expect(
      cache.contains([
        // "get_api/v1/comments:post_id",
        (path: string, method: any) => {
          return {
            title: "In publishing and graphic design",
            content:
              "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available",
            createdAt: "2022-11-20 18:20",
          };
        },
        // "api/v1/books",
        // "GET",
      ])
    ).toBeTrue();
  });
});
