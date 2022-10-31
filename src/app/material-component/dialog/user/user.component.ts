import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  onAddUser= new EventEmitter();
  onEdditUser= new EventEmitter();
  userForm: any= FormGroup;
  dialogAction: any="Add"
  action: any= "Add";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder, private usersService: UsersService,
  private dialogRef: MatDialogRef<UserComponent>,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.userForm= this.formBuilder.group({
      id: [null,[Validators.required]],
      title: [null,[Validators.required]],
      first: [null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      last: [null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
       email: [null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
       country: [null,[Validators.required]],
       city: [null,[Validators.required]],
       streetName: [null,[Validators.required]],
       streetNumber: [null,[Validators.required]],
       image: [null,[Validators.required]],
    });
    if(this.dialogData.action==='Edit'){
      this.dialogAction="Edit";
      this.action="update"
      this.userForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction==='Edit'){
      this.edit();
    }else{
      this.add();
    }
  }

  add(){
    let formData= this.userForm.value;
    let data={
      id: formData.id,
      name: {
       title: formData.title,
       first: formData.first,
       last: formData.last,
      },
      location: {
        country: formData.country,
        city: formData.city,
        street: {
          name: formData.streetName,
          number: formData.streetNumber,
        }
      },
      email: formData.email,
      image: formData.image,
    }
    try {
      this.usersService.add(data);
    this.dialogRef.close();
    this.onAddUser.emit();
    this.snackbarService.openSnackBar(GlobalConstants.success,"user added successfully");
    } catch (error: any) {
      this.dialogRef.close();
      this.snackbarService.openSnackBar(error, GlobalConstants.error);
    }
  }

  edit(){
    console.log("edit called");
  }

}
