import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface, ClrDatagrid } from '@clr/angular';
import { Router } from '@angular/router';
import { defaultPath } from 'src/app/lib/views/partials/partials-configs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';
import { Dialog } from 'src/app/lib/core/utils';
import { DepartmentsProvider } from '../../../../../core/auth/core/providers/department';
import { DrewlabsRessourceServerClient } from 'src/app/lib/core/http/core';
import { TypeUtilHelper } from 'src/app/lib/core/helpers';
import { createSubject, observableOf } from 'src/app/lib/core/rxjs/helpers';
import { mapPaginatorStateWith } from 'src/app/lib/core/pagination/helpers';
import { paginateDepartmentV2Action } from '../../../../../core/auth/core/actions/department';
import { doLog } from 'src/app/lib/core/rxjs/operators';
import { httpServerHost } from 'src/app/lib/core/utils/url/url';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styles: [
    `
      .app-content-container {
        padding: 0 16px;
      }
    `
  ]
})
export class ListDepartmentComponent implements OnDestroy {

  @ViewChild('clrDataGrid', { static: true }) dataGrid: ClrDatagrid;

  initialGridState = { page: 1, per_page: 10 };
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();
  state$ = this.departments.state$.pipe(
    map(state => ({
      dataSource: state.pagination,
      performingAction: state.performingAction
    })),
    doLog('Departments pagination data source: ')
  );

  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface | any>();

  // tslint:disable-next-line: variable-name
  gridState$ = this._datagridState$
    .pipe(
      takeUntil(this._destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((state: ClrDatagridStateInterface) => observableOf(state)),
    ).pipe(
      map(state => {
        paginateDepartmentV2Action(
          this.departments.store$)(this.client, `${httpServerHost(this.host)}/${this.path}`, state);
      }),
    );

  constructor(
    private departments: DepartmentsProvider,
    private router: Router,
    private client: DrewlabsRessourceServerClient,
    public readonly typeHelper: TypeUtilHelper,
    private dialog: Dialog,
    @Inject('AUTH_DEPARTMENTS_RESOURCE_PATH') private path: string,
    @Inject('AUTH_SERVER_HOST') private host: string,
  ) {
    this.gridState$.subscribe();
  }

  onDgHeaderRefresh = () => {
    this._datagridState$.next(this.initialGridState);
  }

  onDgRefresh = (state: ClrDatagridStateInterface) => this._datagridState$.next(mapPaginatorStateWith([])(state));

  handleDeleteEvent = async (id: number | string, translations: any) => {
    if (this.dialog.confirm(translations.prompt)) {
    }
  }

  handleItemSelectEvent = async (id: number | string) => {
    const appRoutes = environment?.appRoutes;
    // Navigate to edit view
    this.router.navigate([`/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.createDepartmentRoute}`, id]);
  }

  handleCreateEvent() {
    const appRoutes = environment?.appRoutes;
    // Navigate to create view
    this.router.navigateByUrl(`/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.createDepartmentRoute}`);
  }

  ngOnDestroy = () => this._destroy$.next();
}
