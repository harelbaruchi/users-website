import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  
  onAddProject= new EventEmitter();
  onEdditProject= new EventEmitter();
  projectForm: any= FormGroup;
  dialogAction: any= "Add";
  action: any="Add";
  responseMessage: any;
  statuss: string[]=["in progress", "complete", "cancelled"]

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder, private projectService: ProjectService,
  private dialogRef: MatDialogRef<ProjectComponent>,
  private snackbarService: SnackbarService) { 
    
  }

  ngOnInit(): void {
    this.projectForm= this.formBuilder.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      status: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });
    if(this.dialogData.action==='Edit'){
      this.dialogAction="Edit";
      this.action="update";
      this.projectForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction==='Edit'){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    let formData= this.projectForm.value;
    let data={
      name:formData.name,
      address: formData.address,
      endDate: formData.endDate,
      status: formData.status,
      image: formData.image,
    }
    this.projectService.add(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onAddProject.emit();
      this.responseMessage=response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  edit(){
    let formData= this.projectForm.value;
    let data={
      id:this.dialogData.data.id,
      name:formData.name,
      address: formData.address,
      endDate: formData.endDate,
      status: formData.status,
      image: formData.image,
    }
    this.projectService.update(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onEdditProject.emit();
      this.responseMessage=response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
