import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

import { Category, Product, Brand } from '../../_shared/interfaces';
import { ProductService, CartService } from '../../core/services/';
import { ProductQuickViewComponent } from '../../_shared/modals/product-quick-view/product-quick-view.component';
@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
})
export class ViewCategoryComponent implements OnInit {
  passedId: any;
  products: Product[];
  categories: Category[];
  brands: Brand[];
  selectedBrands = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {
    const navData = this.activatedRoute.snapshot.queryParams;
    // let passedData = JSON.parse(navData.data);
    this.passedId = navData.c;

    console.log('passed id ', this.passedId);
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  ngOnChanges(){
    console.log('enre>>>>>>>>')
  }
  checked(item) {
    if (this.selectedBrands.indexOf(item) != -1) {
      return true;
    }
  }

  brandChecked(checked, item) {
    if (checked) {
      this.selectedBrands.push(item);
    } else {
      this.selectedBrands.splice(this.selectedBrands.indexOf(item), 1);
    }
    let env = this;
    console.log(this.selectedBrands);
    var filtered = this.products.filter((item) =>
      this.selectedBrands.includes(item.brandId)
    );

    this.products = filtered;

    console.log(filtered);
  }

  getProducts() {
    console.log(this.passedId)
    this.productService
      .getProductsByCategory$(this.passedId)
      .subscribe((details) => {
        this.products = details;
        // this.orderProduct('alphaASC');
        // console.log('fff', details);
      });
  }

  filterByCategory(id) {
    this.passedId = id;
    this.productService.getProductsByCategory$(id).subscribe((details) => {
      this.products = details;
      // console.log('category', details);
    });
  }

  getCategories() {
    this.productService.getCategories$().subscribe((details) => {
      this.categories = details;
      // console.log('rrr', details);
    });
  }

  getBrands() {
    this.productService.getBrands$().subscribe((details) => {
      this.brands = details;
      // console.log('rrr', details);
    });
  }

  // view full product in product details page
  viewProduct(product) {
    // add product to observable
    this.productService.updateProductDetails(product);
    this.router.navigate(['home/view']);
  }

  // add product to cart
  addToCart(product) {
    // add product to observable
    this.cartService.addToCart(product);
  }

  productQuickViewModal(product) {
    const modalRef = this.modalService.open(ProductQuickViewComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.product = product;
    modalRef.result
      .then((result) => {
        console.log(result);
        if (result) {
        }
      })
      .catch((res) => {
        console.log(res);
        if (res) {
        }
      });
  }

  onSortChange(deviceValue) {
    console.log(deviceValue);
  }
  orderProduct(sortType) {
    if (sortType == 'low') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (sortType == 'high') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (sortType == 'alphaASC') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType == 'alphaDESC') {
      this.products.sort((a, b) => b.name.localeCompare(a.name));
    }
  }
}
