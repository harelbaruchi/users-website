import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CommentComponent } from '../dialog/comment/comment.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-comment',
  templateUrl: './manage-comment.component.html',
  styleUrls: ['./manage-comment.component.scss']
})
export class ManageCommentComponent implements OnInit {
  displayedColumns: string[]= ['description','projectName',"timeCreated","edit"];
  dataSource: any;
  responseMessage: any;



  constructor( private commentService: CommentService,
    private dialog: MatDialog, private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
   this.commentService.getComment().subscribe((response: any)=>{
    this.dataSource= new MatTableDataSource(response);
   }, (error: any)=>{
    console.log(error);
    if(error.error?.message){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage=GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
   })
  }

  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data= {
      action: 'Add'
    }
    dialogConfig.width="700px";
    const dialogRef= this.dialog.open(CommentComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    })
    const sub= dialogRef.componentInstance.onAddComment.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data= {
      action: 'Edit', data: values
    }
    dialogConfig.width="700px";
    const dialogRef= this.dialog.open(CommentComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    })
    const sub= dialogRef.componentInstance.onEditComment.subscribe((response)=>{
      this.tableData();
    })
  }
  handleDeleteAction(values:any){
    const dialogConfig= new MatDialogConfig();
        dialogConfig.data= {
          message: 'delete' +values.name+ 'comment'
        }
        const dialogRef= this.dialog.open(ConfirmationComponent,dialogConfig);
        const sub= dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
        this.deleteProduct(values.id);
         dialogRef.close(); 
        })
  }

  deleteProduct(id: any){
    this.commentService.delete(id).subscribe((response: any)=>{
      this.tableData();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    }, (error: any )=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage= error.error?.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

 


}
