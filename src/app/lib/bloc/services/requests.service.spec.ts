import { TestBed } from "@angular/core/testing";
import { filter, first, map, ObservableInput, of, throwError } from "rxjs";
import { Requests } from "./requests";
import { firstWhere } from "./rx";
import { HTTPRequestMethods } from "./types";

const testResult = {
  data: [
    {
      title: "Lorem Ipsum",
      description:
        "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.",
    },
  ],
};

const commentResult = {
  data: [
    {
      title: "It is a long established",
      postId: 1,
      value:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
    },
    {
      title: "Many desktop",
      postId: 1,
      value:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy",
    },
  ],
};

const fnTestResult = {
  content: "/Users/azandrewsidoine/Documents/creative-scala.pdf",
  description: "SCALA PROGRAMMING LANGUAGE EBOOK 2",
};

describe("Requests", () => {
  let service!: Requests;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: Requests,
          useFactory: () => {
            return new Requests({
              request: (
                path: string,
                method: HTTPRequestMethods,
                body: unknown,
                options?: unknown
              ) => {
                if (path.includes("comments")) {
                  return throwError(() => "Comments path not supported");
                }
                return (
                  path.includes("comments") ? of(commentResult) : of(testResult)
                ) as ObservableInput<any>;
              },
            });
          },
        },
      ],
    }).compileComponents();
    service = TestBed.inject(Requests);
  });

  it("should create the request service", async () => {
    expect(service).toBeTruthy();
  });

  it("should handle request an log the request to cache", () => {
    service
      .select(
        service.dispatch({
          name: "[get_api/v1/posts:post_id/users:user_id/post_user:user_id",
          payload: {
            body: {
              _query: {
                where: ["id", "dh356-hdfg53-fgnr67-fghg68"],
              },
            },
            params: {
              user_id: 2,
              post_id: 1032,
            },
            options: {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
              responseType: "json",
            },
          },
        })
      )
      .pipe(
        filter((state) => state.pending === false),
        map((state) => {
          expect(state.response).toEqual(testResult);
        })
      )
      .subscribe();

    service
      .select(
        service.dispatch({
          name: "[get_api/v1/post/:post_id/comments",
          payload: {
            params: {
              post_id: 1,
            },
            options: {
              responseType: "json",
            },
          },
        })
      )
      .pipe(
        firstWhere((state) => state.pending === false),
        map((state) => {
          expect(state.response).toEqual(undefined);
          expect(state.error).toEqual("Comments path not supported");
        })
      )
      .subscribe();

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  });

  it("should call the provider function passed as parameter and update the requests state with the result of the function call", () => {
    service
      .select(
        service.dispatch(
          (path: string, method: HTTPRequestMethods) => {
            return of(fnTestResult);
          },
          "api/v1/books",
          'GET'
        )
      )
      .pipe(
        filter((state) => state.pending === false),
        // First to only listen once
        first(),
        map((state) => {
          expect(state.response).toEqual(fnTestResult);
        })
      )
      .subscribe();

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  });
});
