import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent implements OnInit {

  @Input() public brand;
  
  constructor() { }

  ngOnInit(): void {
  }

}
