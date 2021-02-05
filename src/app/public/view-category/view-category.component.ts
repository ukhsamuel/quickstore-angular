import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { Product} from '../../_shared/interfaces';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  passedId: any;
  products: Product[];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private router: Router, 
  ) { 
    const navData = this.activatedRoute.snapshot.queryParams;
    // let passedData = JSON.parse(navData.data);
    this.passedId = navData.c;
    
    console.log('passed id ', this.passedId);

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){

    this.productService.getProductsByCategory$(this.passedId).subscribe(
      (details) => {
        this.products = details;
        // this.orderProduct('alphaASC');
        console.log('fff', details)
      }
    );

  }

  onSortChange(deviceValue) {
    console.log(deviceValue);
  }
  orderProduct(sortType){
    if(sortType == 'low'){
      this.products.sort((a, b) => a.price - b.price);
    }else if(sortType == 'high'){
      this.products.sort((a, b) => b.price - a.price);
    }else if(sortType == 'alphaASC'){
      this.products.sort((a, b) => a.name.localeCompare(b.name))
    }else if(sortType == 'alphaDESC'){
      this.products.sort((a, b) => b.name.localeCompare(a.name))
    }

  }
}
