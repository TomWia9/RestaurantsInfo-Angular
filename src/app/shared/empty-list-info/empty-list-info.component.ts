import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list-info',
  templateUrl: './empty-list-info.component.html',
  styleUrls: ['./empty-list-info.component.scss']
})
export class EmptyListInfoComponent {
  @Input() message = 'Sorry, something went wrong';
}
