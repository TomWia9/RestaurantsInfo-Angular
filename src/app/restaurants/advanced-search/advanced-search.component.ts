import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})
export class AdvancedSearchComponent implements OnInit {
  searchForm: any;

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl(null, [Validators.maxLength(100)]),
      city: new FormControl(null, [Validators.maxLength(35)]),
      category: new FormControl(null, [Validators.maxLength(50)]),
      delivery: new FormControl(false),
    });
  }

  onSearch(): void {
    console.log(this.searchForm.value);
  }
}
