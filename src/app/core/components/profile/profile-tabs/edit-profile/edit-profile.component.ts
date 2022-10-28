import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form!: FormGroup;
  userId: string = '';

  constructor(private usersService: UsersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params  
      .subscribe((params: Params) => {
        this.userId = params['id'];
      })

    const nameValidators = [Validators.minLength(4), Validators.maxLength(20)];
    const passwordValidators = [Validators.minLength(4), Validators.maxLength(16)];
    const emailValidators = [Validators.email];

    this.form = new FormGroup({
      'name': new FormControl('', nameValidators),
      'email': new FormControl('', emailValidators),
      'password': new FormControl('', passwordValidators)
    });

    
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.usersService.updateUser(this.form.value.name, 
        this.form.value.email, this.form.value.password)
        this.form.reset();
    }
  }

}