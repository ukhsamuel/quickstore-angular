import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent implements OnInit {

  @Input() public product;
  @Output() viewProductEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  viewProduct(value: string) {
    // console.log('0394893')
    this.viewProductEvent.emit(value);
  }

}
