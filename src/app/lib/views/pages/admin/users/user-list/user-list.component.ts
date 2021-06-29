import { Component, ViewChild, OnDestroy, Inject } from '@angular/core';
import { ClrDatagridStateInterface, ClrDatagrid } from '@clr/angular';
import { Router } from '@angular/router';
import { partialConfigs } from 'src/app/lib/views/partials/partials-configs';
import { Dialog } from 'src/app/lib/core/utils';
import { mapPaginatorStateWith } from 'src/app/lib/core/pagination/helpers';
import { UsersProvider } from '../../../../../core/auth/core/providers/app-user';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { createSubject, observableOf } from 'src/app/lib/core/rxjs/helpers';
import { doLog } from 'src/app/lib/core/rxjs/operators';
import { paginateAppUsers, deleteUserAction } from '../../../../../core/auth/core/actions/app-users';
import { DrewlabsRessourceServerClient } from 'src/app/lib/core/http/core';
import { TranslationService } from 'src/app/lib/core/translator';
import { httpServerHost } from 'src/app/lib/core/utils/url/url';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
    `
      .role-list {
        font-size: 10px;
        /* line-height: 1; */
      }
      .app-content-container {
        padding: 0 16px;
      }
    `
  ]
})
export class UserListComponent implements OnDestroy {

  public dashboardHomeRoute: string;
  @ViewChild('clrDataGrid', { static: true }) dataGrid: ClrDatagrid;

  initialGridState = { page: 1, per_page: 10 };
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();
  state$ = this.users.state$.pipe(
    withLatestFrom(this.translate.translate([
      'prompt'
    ])),
    map(([state, translations]) => ({
      dataSource: state.pagination,
      performingAction: state.performingAction,
      translations
    })),
    doLog('Users pagination data source: ')
  );

  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface | any>();

  // tslint:disable-next-line: variable-name
  gridState$ = this._datagridState$
    .pipe(
      startWith(this.initialGridState),
      takeUntil(this._destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((state: ClrDatagridStateInterface) => observableOf(state)),
    ).pipe(
      map(state => {
        paginateAppUsers(
          this.users.store$)(this.client, `${httpServerHost(this.host)}/${this.path}`, state);
      }),
      doLog('Forms Datagrid state: '),
    );

  constructor(
    private users: UsersProvider,
    private router: Router,
    private client: DrewlabsRessourceServerClient,
    private dialog: Dialog,
    private translate: TranslationService,
    @Inject('AUTH_USERS_RESOURCE_PATH') private path: string,
    @Inject('AUTH_SERVER_HOST') private host: string,
  ) {
    this.gridState$.subscribe();
    this.dashboardHomeRoute = `/${partialConfigs.routes.commonRoutes.dashboardHomeRoute}`;
  }

  onDgHeaderRefresh = () => {
    this._datagridState$.next(this.initialGridState);
  }

  onDgRefresh = (state: ClrDatagridStateInterface) => this._datagridState$.next(mapPaginatorStateWith([])(state));

  handleEditEvent = (id: number | string) => {
    const appRoutes = environment?.appRoutes;
    this.router.navigate([`/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes.managementsRoute}/${appRoutes.updatedUserRoute}`, id]);
  }

  handleDeleteEvent = async (id: number | string, translations: any) => {
    if (this.dialog.confirm(translations.prompt)) {
      deleteUserAction(this.users.store$)(this.client, `${httpServerHost(this.host)}/${this.path}`, id);
    }
  }

  ngOnDestroy = () => this._destroy$.next();

  handleCreateEvent() {
    const appRoutes = environment?.appRoutes;
    this.router.navigateByUrl(`/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes.managementsRoute}/${appRoutes.createUsersRoute}`);
  }
}
