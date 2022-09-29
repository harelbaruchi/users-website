import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JokeService } from 'src/app/services/joke.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {
  dataSource: any;
  relatedJokes: any;
  jokes: any[]=[];
  displayedColumns: string[]= []
  twoPartColumns: string[] = ['id','category','setup','delivery']
  singleColumns: string[] = ['id','category','joke']
 
  

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
      private dialogRef: MatDialogRef<JokeComponent>,
      private snackbarService: SnackbarService,
      private jokeService: JokeService) { }

  ngOnInit(): void {
    if(this.dialogData.data.type==='twopart'){
      this.displayedColumns=this.twoPartColumns;
    } else{
      this.displayedColumns=this.singleColumns;
    }
    this.tableData();
    this.ralatedJokesData();

  }

  tableData(){
    this.jokes.push(this.dialogData.data)
    this.dataSource=new MatTableDataSource(this.jokes)
    console.log(this.dialogData.data);
  }

  isTwoPart()
  { 
  if(this.dialogData.data.type==='twoPart'){
    return true;
  }else{
    return false;
  }
    }  

    isSinglePart(){
      if(this.dialogData.data.type==='single'){
        return true;
      }else{
        return false;
      }
    }

    ralatedJokesData(){
      let type= this.dialogData.data.type;
      this.jokeService.getRelatedJokes(type).subscribe((response: any)=>{
        this.relatedJokes=response;
      });
      console.log(this.relatedJokes);
      
    }



}
