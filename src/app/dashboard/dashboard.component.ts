import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;

  ngAfterViewInit() {}

  constructor(
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService
  ) {
    this.dashboardData();
  }

  dashboardData() {
	let users: any= localStorage.getItem('users')
	let totalUsers= JSON.parse(users).length;
    this.data= totalUsers;
  }
}
