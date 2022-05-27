import { RoleService } from './../../../services/external/role.service';
import { Role, User } from './../../../types/types';
import { UserService } from '../../../services/external/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  //#region VARIABLES
  form!: FormGroup;
  private _id!: string;
  edition: boolean = false;
  roles: Role[] = [];
  //#endregion VARIABLES

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    /* Precargar los datos */
    this.getRoles();

    /* Construir el formulario */
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
    });

    /* Obtener el id en caso haya edicion */
    this.activatedRoute.data.subscribe((data: any) => {
      if (data.id) {
        this._id = data.id;
        this.edition = true;
        this.getUser();
      }
    });
  }
  //#endregion LIFECYCLE

  //#region METHODS
  register() {}

  private getRoles() {
    this.roleService.getAll<Role>((res: Role[]) => {
      this.roles = res;
    });
  }

  private getUser() {
    this.userService.getById<User>(this._id, (res: User) => {
      this.form.setValue({
        name: res.name,
        lastName: res.lastName,
        phone: res.phone,
        email: res.email,
        role: res.role,
      });
    });
  }
  //#endregion METHODS
}
