import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';
import { ProjectService } from 'src/app/services/project.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  onAddComment= new EventEmitter();
  onEditComment= new EventEmitter();
  commentForm: any= FormGroup;
  dialogAction: any="Add";
  action: any="Add";
  responseMessage: any;
  projects: any=[];
  statuss: string[]=["in progress", "complete", "cancelled"]

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder,
  private commentService: CommentService,
  public dialogRef: MatDialogRef<CommentComponent>,
  private projectService: ProjectService,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.commentForm= this.formBuilder.group({
      description:[null, [Validators.required]] ,
      projectId: [null,[Validators.required]],
      timeCreated:[null,[Validators.required]]
    })
    if(this.dialogData.action==="Edit"){
      this.dialogAction="Edit";
      this.action="Update";
      this.commentForm.patchValue(this.dialogData.data);
    }
    this.getProjects();
  }

  getProjects(){
    this.projectService.getProjects().subscribe((response) => {
      this.projects=response;
     }, (error: any)=>{
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
     })
  }

  handleSubmit(){
    if(this.dialogAction==="Edit"){
      this.edit();
    } else{
      this.add();
    }
  }

  edit(){
    let formData= this.commentForm.value;
    let data={
      id: this.dialogData.data.id,
      description: formData.description,
      projectId: formData.projectId,
      timeCreated: formData.timeCreated
    }
    this.commentService.update(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onEditComment.emit();
      this.responseMessage= response.message;
      this.snackbarService.openSnackBar(response.message, "success");
    }, (error: any)=>{
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })

  }

  add(){
    let formData= this.commentForm.value;
    let data={
      description: formData.description,
      projectId: formData.projectId,
      timeCreated: formData.timeCreated
    }
    this.commentService.add(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onAddComment.emit();
      this.responseMessage= response.message;
      this.snackbarService.openSnackBar(response.message, "success");
    }, (error: any)=>{
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
