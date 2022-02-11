import { Component } from "@angular/core";
import { partialConfigs } from "../../partials/partials-configs";
import { routes } from "../../routes";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./home.component.html",
  styles: [],
})

export class DashboardHomeComponent {

  public clientsHomePath = `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.clientsHomeRoute}`;

  // highcharts = Highcharts;
  // // line chart
  // chartOptions: Highcharts.Options = {
  //   title: {
  //     text: "Evolution des adhésions"
  //   },
  //   xAxis: {
  //     categories: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin",
  //       "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"]
  //   },
  //   yAxis: {
  //     title: {
  //       text: "Nombre d'adhérents"
  //     }
  //   },
  //   series: [{
  //     data: [800, 890, 920, 1022, 789, 2450, 3200, 5200, 1890, 2500, 3200, 3400, 3500, 5520],
  //     type: 'line',
  //     name: 'Personnes physiques'
  //   },
  //   {
  //     data: [120, 680, 1200, 1100, 850, 960, 1200, 769, 1540, 2100, 3200, 2450, 1850, 2000],
  //     type: 'line',
  //     name: 'Personnes Morales'
  //   },
  // ],

  // }
  // // Pie Chart
  // secondOptions: Highcharts.Options = {
  //   chart: {
  //     plotBackgroundColor: 'white',
  //     plotBorderWidth: 0,
  //     plotShadow: false,
  //     type: 'pie'
  //   },
  //   title: {
  //     text: 'Rêpartition des membres par localité'
  //   },
  //   tooltip: {
  //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //   },
  //   plotOptions: {
  //     pie: {
  //       allowPointSelect: true,
  //       cursor: 'pointer',
  //       dataLabels: {
  //         enabled: true,
  //         format: '<b>{point.name}</b>: {point.percentage:.1f} %'
  //       }
  //     }
  //   },
  //   series: [{
  //     name: 'Membres',
  //     colorByPoint: true,
  //     type: undefined,
  //     data: [{
  //       name: 'ATAKPAME',
  //       y: 508,
  //     }, {
  //       name: 'KPALIME',
  //       y: 328
  //     }, {
  //       name: 'AGOU',
  //       y: 156
  //     }, {
  //       name: 'DAPAONG',
  //       y: 203
  //     }, {
  //       name: 'NOTSE',
  //       y: 98
  //     }, {
  //       name: 'SOKODE',
  //       y: 596
  //     }, {
  //       name: 'KARA',
  //       y: 478
  //     },
  //     {
  //       name: 'BLITTA',
  //       y: 33
  //     },
  //     {
  //       name: 'SOTOUBOUA',
  //       y: 47
  //     },
  //     {
  //       name: 'KEVE',
  //       y: 31
  //     },
  //     {
  //       name: 'HAHOTOE',
  //       y: 199
  //     },
  //     {
  //       name: 'VOGAN',
  //       y: 156
  //     },
  //     {
  //       name: 'AKOUMAPE',
  //       y: 109
  //     },
  //     {
  //       name: 'TSEVIE',
  //       y: 357
  //     },
  //     {
  //       name: 'AGOE',
  //       y: 1014,
  //       sliced: true,
  //       selected: true
  //     },
  //     {
  //       name: 'ADIDOGOME',
  //       y: 521
  //     },
  //     {
  //       name: 'BAGUIDA',
  //       y: 156
  //     },
  //     {
  //       name: 'KPOTA',
  //       y: 243
  //     },
  //     {
  //       name: 'NYEKONAKPOE',
  //       y: 260
  //     },
  //     {
  //       name: 'AGBALEPEDO',
  //       y: 131
  //     },
  //     {
  //       name: 'AMADAHOME',
  //       y: 28
  //     },
  //     {
  //       name: 'AVEPOZO',
  //       y: 82
  //     },
  //     {
  //       name: 'TOTSI',
  //       y: 97
  //     },
  //     {
  //       name: 'ADAMAVO',
  //       y: 124
  //     },
  //     {
  //       name: 'KPOGAN',
  //       y: 80
  //     },
  //     {
  //       name: 'ADETIKOPE',
  //       y: 134
  //     },
  //     {
  //       name: 'TOKOIN',
  //       y: 397
  //     },
  //     {
  //       name: 'HANOUKOPE',
  //       y: 184
  //     },
  //     {
  //       name: 'KEGUE',
  //       y: 124
  //     },
  //   ]
  //   }]
  // }
}
