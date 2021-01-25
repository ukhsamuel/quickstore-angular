import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product} from '../../_shared/interfaces';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
 
  productDetail: Product;

  constructor(
    private productService: ProductService,
  ) { 

    this.productService.productDetails$.subscribe(
      (details) => {
        this.productDetail = details;
        // console.log(details)
      }
    );
  }

  ngOnInit(): void {
  }

}
