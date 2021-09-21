import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {
  submitted = false;
  personForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
   }

  ngOnInit() {
  }

  mainForm() {
    this.personForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.personForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.personForm.valid) {
      return false;
    } else {
      this.apiService.createPerson(this.personForm.value).subscribe(
        (res) => {
          console.log('Person successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/persons-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
