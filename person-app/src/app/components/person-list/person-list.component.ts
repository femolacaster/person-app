import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  Person:any = [];

  constructor(private apiService: ApiService) { 
    this.readPerson();
  }

  ngOnInit() {
  }

  readPerson(){
    this.apiService.getPersons().subscribe((data) => {
     this.Person = data;
    })    
  }

  removePerson(person, index) {
    if(window.confirm('Are you sure you want to delete this person from this system?')) {
        this.apiService.deletePerson(person._id).subscribe((data) => {
          this.Person.splice(index, 1);
        }
      )    
    }
  }

}
