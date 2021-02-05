import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product} from '../../_shared/interfaces';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  currentDisplayedPhotoIndex : number = 0;
 
  product: Product;

  constructor(
    private productService: ProductService,
  ) { 

    this.productService.productDetails$.subscribe(
      (details) => {
        this.product = details;
        console.log(details)
      }
    );
  }

  ngOnInit(): void {
  }


  selectPhoto(i){
    this.currentDisplayedPhotoIndex = i;
  }
}
