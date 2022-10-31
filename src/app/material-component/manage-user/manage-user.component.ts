import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { UserComponent } from '../dialog/user/user.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'country',
    'city',
    'street',
    'image',
    'edit',
  ];
  dataSource: any;
  responseMessage: any;
  usersArray: any[] = [];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    const oldUsers = localStorage.getItem('users');
    if (oldUsers !== null) {
      this.usersArray = JSON.parse(oldUsers);
      this.dataSource = new MatTableDataSource(this.usersArray);
    } else {
      this.usersService.getUsers().subscribe(
        (response: any) => {
          console.log(response);
          this.usersArray = response.results.map((user: any) => {
            return {
              name: user.name,
              location: {
                country: user.location.country,
                city: user.location.city,
                street: user.location.street,
              },
              email: user.email,
              id: user.login.uuid,
              image: user.picture.medium,
            };
          });
          localStorage.setItem('users', JSON.stringify(this.usersArray));
          console.log('new users', this.usersArray);
          this.dataSource = new MatTableDataSource(this.usersArray);
        },
        (error: any) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          } else {
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackBarService.openSnackBar(
            this.responseMessage,
            GlobalConstants.error
          );
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '700px';
    const dialogRef = this.dialog.open(UserComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub= dialogRef.componentInstance.onAddUser.subscribe((response)=>{
      this.tableData();
    })
    console.log('add user');
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values,
    };
    dialogConfig.width = '700px';
    const dialogRef = this.dialog.open(UserComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub= dialogRef.componentInstance.onEdditUser.subscribe((response)=>{
      this.tableData();
    })
    //TODO: handle the edit function locally
    console.log('edit user');
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete' + values.name.first + '!',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (response) => {
        this.deleteUser(values.id);
        dialogRef.close();
        this.tableData();
      }
    );
  }

  deleteUser(id: any) {
    this.usersService.delete(id);
    //TODO: handle delete function in UsersService
    console.log(`deleted user ${id}`);
  }
}
