import { Person } from './../../model/Person';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  personData: Person[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updatePerson();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPerson(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      gender: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
    })
  }

   // Getter to access form control
   get myForm() {
    return this.editForm.controls;
  }

  getPerson(id) {
    this.apiService.getPerson(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        age: data['age'],
        gender: data['gender'],
        mobileNumber: data['mobileNumber'],
      });
    });
  }

  updatePerson() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      gender: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]] 
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updatePerson(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/persons-list');
            console.log('Person has been updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}
