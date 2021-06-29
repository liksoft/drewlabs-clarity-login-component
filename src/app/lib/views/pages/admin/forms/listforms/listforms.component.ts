import { Component, ViewChild, OnDestroy, Inject } from '@angular/core';
import { ClrDatagrid, ClrDatagridStateInterface } from '@clr/angular';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { FormsProvider } from 'src/app/lib/core/components/dynamic-inputs/core/v2/providers/form';
import { mapPaginatorStateWith } from 'src/app/lib/core/pagination/helpers';
import { createSubject, observableOf } from 'src/app/lib/core/rxjs/helpers';
import { onPaginateFormsAction, selectFormAction } from 'src/app/lib/core/components/dynamic-inputs/core/v2/actions';
import { DrewlabsRessourceServerClient } from '../../../../../core/http/core/ressource-server-client';
import { doLog } from 'src/app/lib/core/rxjs/operators';
import { partialConfigs } from 'src/app/lib/views/partials/partials-configs';
import { FormV2 } from '../../../../../core/components/dynamic-inputs/core/v2/models/form';
import { httpServerHost } from 'src/app/lib/core/utils/url/url';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listforms',
  templateUrl: './listforms.component.html',
  styles: [
    `
      .app-content-container {
        padding: 0 16px;
      }
    `
  ]
})
export class ListformsComponent implements OnDestroy {

  dashboardHomeRoute = `/${partialConfigs.routes.commonRoutes.dashboardHomeRoute}`;
  initialGridState = { page: 1, per_page: 20 };
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();
  state$ = this.formsProvider.state$.pipe(
    takeUntil(this._destroy$),
    map(state => ({
      dataSource: state.collections,
      performingAction: state.performingAction
    })),
    doLog('Forms data source: ')
  );

  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface | any>();
  gridState$ = this._datagridState$.pipe(
    startWith(this.initialGridState)
  );

  // tslint:disable-next-line: variable-name
  formsDatagridState$ = this.gridState$
    .pipe(
      takeUntil(this._destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((state: ClrDatagridStateInterface) => observableOf(state)),
      shareReplay(1)
    ).pipe(
      map(state => {
        onPaginateFormsAction(
          this.formsProvider.store$)(this.client, `${httpServerHost(this.host)}/${this.path}`, state);
      }),
      doLog('Forms Datagrid state: '),
    );

  @ViewChild('clrDataGrid', { static: false }) dataGrid: ClrDatagrid;


  constructor(
    private formsProvider: FormsProvider,
    private client: DrewlabsRessourceServerClient,
    private router: Router,
    @Inject('FORM_RESOURCES_PATH') private path: string,
    @Inject('FORM_SERVER_HOST') private host: string,
  ) {
    this.formsDatagridState$.subscribe();
  }

  // tslint:disable-next-line: typedef
  editForm(item: FormV2) {
    const appRoutes = environment?.appRoutes;
    selectFormAction(this.formsProvider.store$)(item.id);
    this.router.navigate([
      `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes?.managementsRoute}/${appRoutes?.createFormsRoute}`,
      item.id]);
  }

  onDgHeaderRefresh = () => {
    this._datagridState$.next(this.initialGridState);
  }

  // tslint:disable-next-line: typedef
  navigateToCreateFormView() {
    const appRoutes = environment?.appRoutes;
    this.router.navigateByUrl(`/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes?.managementsRoute}/${appRoutes?.createFormsRoute}`);
  }

  onDgRefresh = (state: ClrDatagridStateInterface) => this._datagridState$.next(mapPaginatorStateWith([])(state));

  ngOnDestroy(): void {
    this._destroy$.next();
  }

}
