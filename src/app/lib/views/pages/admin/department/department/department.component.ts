import { Component, Inject, OnDestroy } from '@angular/core';
import { IDynamicForm } from 'src/app/lib/core/components/dynamic-inputs/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultPath } from 'src/app/lib/views/partials/partials-configs';
import { TypeUtilHelper } from '../../../../../core/helpers/type-utils-helper';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { DynamicControlParser } from 'src/app/lib/core/helpers';
import { DepartmentV2 } from '../../../../../core/auth/contracts/v2/company/department';
import { combineLatest } from 'rxjs';
import { DepartmentsProvider } from 'src/app/lib/core/auth/core/providers/department';
import { DrewlabsRessourceServerClient } from 'src/app/lib/core/http/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { getDepartmentUsingID } from 'src/app/lib/core/auth/core/actions/department';
import { createSubject } from 'src/app/lib/core/rxjs/helpers';
import { doLog } from '../../../../../core/rxjs/operators/index';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';
import { httpServerHost } from 'src/app/lib/core/utils/url/url';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styles: []
})
export class DepartmentComponent implements OnDestroy {

  // @ViewChild('appAddDepartmentComponent', { static: false })
  // appAddDepartment: AddDepartementComponent;
  public department: DepartmentV2;
  // public form: IDynamicForm;
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();

  selectedDepartment$ = this.route.paramMap.pipe(
    takeUntil(this._destroy$),
    map(params => {
      if (params.has('id')) {
        getDepartmentUsingID(this.departments.store$)(
          this.client,
          `${httpServerHost(this.host)}/${this.path}`,
          params.get('id')
        );
      }
      return +params.get('id');
    }),
  );
  state$ = combineLatest([
    this.departments.state$.pipe(
      tap(state => {
        if (state.performingAction) {
          this.uiState.startAction();
        } else {
          this.uiState.endAction();
        }
      })
    ),
    this.selectedDepartment$
  ])
    .pipe(
      delay(.3),
      map(([departmentState, selectedDepartment]) => ({
        performingAction: departmentState.performingAction,
        items: departmentState.items,
        department: departmentState.items.find(item => +item.id === +selectedDepartment),
        departmentID: selectedDepartment
      }),
      ),
      map(state => {
        const formConfigs: { form: IDynamicForm, formgroup: FormGroup } = {} as any;
        // TODO : Load an build forms
        // formConfigs.form = state.forms.get('departmentCreateFormID');
        // formConfigs.formgroup = this.controlParser.buildFormGroupFromDynamicForm(
        //   state.forms.get('departmentCreateFormID'), !this.typeHelper.isDefined(state.departmentID)
        // ) as FormGroup;
        return { ...state, ...formConfigs };
      }),
      doLog('View form state...')
    );

  constructor(
    private uiState: AppUIStateProvider,
    private route: ActivatedRoute,
    private router: Router,
    public readonly typeHelper: TypeUtilHelper,
    private departments: DepartmentsProvider,
    private client: DrewlabsRessourceServerClient,
    private controlParser: DynamicControlParser,
    @Inject('AUTH_DEPARTMENTS_RESOURCE_PATH') private path: string,
    @Inject('AUTH_SERVER_HOST') private host: string,
  ) {
    this.selectedDepartment$.subscribe();
  }

  // ngOnInit() { }

  onCancel() {
    const appRoutes = environment?.appRoutes;
    // Navigate back to list of departments
    this.router.navigate([`${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.departmentManagementRoute}`]);
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
