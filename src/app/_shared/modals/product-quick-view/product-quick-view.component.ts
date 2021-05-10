import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../_shared/interfaces';
import { ProductService, CartService } from '../../../core/services';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-quick-view',
  templateUrl: './product-quick-view.component.html',
  styleUrls: ['./product-quick-view.component.scss']
})
export class ProductQuickViewComponent implements OnInit {
  @Input() public product;
  currentDisplayedPhotoIndex : number = 0;
  cartQuantity = 1;
  
  constructor(
    config: NgbRatingConfig,
    private modalService: NgbModal,
    private cartService: CartService,
  ) { 
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    console.log(this.product)
  }

  // add product to cart
  addToCart(product){
    // add product to observable
    this.cartService.addToCart(product, this.cartQuantity)
  }


  selectPhoto(i){
    this.currentDisplayedPhotoIndex = i;
  }

  close(){
    this.modalService.dismissAll()
  }
}
