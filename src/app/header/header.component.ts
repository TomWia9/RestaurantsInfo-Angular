import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm: any;

  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      restaurantName: new FormControl(null, Validators.required)
    });
  }

  onSearch(): void{
    console.log(this.searchForm.value);
    
  }

}
