# URL State

// URL state
@Injectable()
export class UrlState {
  params = this.activatedRoute.snapshot?.params ?? {};
  queryParams = this.activatedRoute.snapshot?.queryParams ?? {};

  params$ = this.activatedRoute.params as Subject<DataParams>;
  queryParams$ = this.activatedRoute.queryParams as Subject<DataParams>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  navigate(queryParams: Params): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      queryParams,
    });
  }
}
