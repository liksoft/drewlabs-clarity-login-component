import { Component } from "@angular/core";
import { AuthService } from "../../../core/auth/core";
import { RoutesMap } from "src/app/lib/core/routes";
import * as Highcharts from 'highcharts';

@Component({
  selector: "app-admin-dashboard-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class AdminDashboardHomeComponent {
  
  public navbarRoutesMap: RoutesMap[];

  constructor(private auth: AuthService) {
  }
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: "Evolution des adhésions à la COOPECTRASSTO"
    },
    xAxis: {
      categories: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin",
        "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: "Nombre d'adhérents"
      }
    },
    series: [{
      data: [800, 890, 920, 1022, 789, 2450, 3200, 600, 1890, 2500, 3200, 3400, 3500, 3520],
      type: 'line',
      name: 'Personnes physiques'
    },
    {
      data: [120, 680, 1200, 1100, 850, 960, 1200, 769, 1540, 2100, 3200, 2450, 1850, 2000],
      type: 'line',
      name: 'Personnes Morales'
    },
  ],
    
  }
  secondOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: 'white',
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Rêpartition des membres par localité'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Membres',
      colorByPoint: true,
      type: undefined,
      data: [{
        name: 'ATAKPAME',
        y: 508,
        sliced: true,
        selected: true
      }, {
        name: 'KPALIME',
        y: 328
      }, {
        name: 'AGOU',
        y: 156
      }, {
        name: 'DAPAONG',
        y: 203
      }, {
        name: 'NOTSE',
        y: 98
      }, {
        name: 'SOKODE',
        y: 596
      }, {
        name: 'KARA',
        y: 478
      }, 
      {
        name: 'BLITTA',
        y: 33
      }, 
      {
        name: 'SOTOUBOUA',
        y: 47
      }, 
      {
        name: 'KEVE',
        y: 31
      }, 
      {
        name: 'HAHOTOE',
        y: 199
      }, 
      {
        name: 'VOGAN',
        y: 156
      }, 
      {
        name: 'AKOUMAPE',
        y: 109
      }, 
      {
        name: 'TSEVIE',
        y: 357
      }
    ]
    }]
  }
}
