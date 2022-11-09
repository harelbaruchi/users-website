import { Component, AfterViewInit,OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { UsersService } from '../services/users.service';
import { GlobalConstants } from '../shared/global-constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  responseMessage: any;
  data: any;

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void{
    this.dashboardData();
  }
  constructor(
    // private dashboardService: DashboardService,
    // private snackbarService: SnackbarService
    private usersService: UsersService
  ) {
    
  }

  async dashboardData() {
	let users: any= localStorage.getItem('users')
  if(users!==null){
    this.data= JSON.parse(users).length;
  } else {
    this.usersService.getUsers().subscribe((users: any)=>{
      this.data=users.length;
    })
  }
	
  }
}
