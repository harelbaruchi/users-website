import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JokeService } from 'src/app/services/joke.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { JokeComponent } from '../dialog/joke/joke.component';

@Component({
  selector: 'app-manage-joke',
  templateUrl: './manage-joke.component.html',
  styleUrls: ['./manage-joke.component.scss']
})
export class ManageJokeComponent implements OnInit {
  displayedColumns: string[]= ['id','category','setup','delivery','joke','view']
  dataSource: any;
  responseMessage: any;

  constructor(
    private jokeService:JokeService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.jokeService.getJokes().subscribe((response: any)=>{
      this.dataSource= new MatTableDataSource(response);
    }, (error: any)=>{
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      } else{
        this.responseMessage= GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }

  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data= {
      action: 'view',
      data: values
    }
    dialogConfig.width='700px';
    dialogConfig.height='700px';
    const dialogRef= this.dialog.open(JokeComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

  }


}
