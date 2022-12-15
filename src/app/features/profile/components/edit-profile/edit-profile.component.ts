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
export class EditProfileComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  userId: string = '';
  error = false;
  errorMessage = 'Error';

  errorSubscription!: Subscription;

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

    this.errorSubscription = this.usersService.error.subscribe(err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

  onSubmit() {
    console.log('submit');
    
    if (this.form.valid) {
      console.log(this.form.value);
      this.usersService.updateUser(this.form.value.name, 
        this.form.value.email, this.form.value.password)
        this.form.reset();
    }
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
