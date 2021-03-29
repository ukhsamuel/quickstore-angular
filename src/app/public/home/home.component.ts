import { Component, OnInit } from '@angular/core';
import { ProductService, CartService, WishlistService } from '../../core/services/';
import { Category, Product, Brand} from '../../_shared/interfaces';
import { ProductQuickViewComponent} from '../../_shared/modals/product-quick-view/product-quick-view.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'quickstore';
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  products : Product[];
  brands : Brand[];
  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private modalService: NgbModal,
    private cartService: CartService,
    private router: Router,
  ) { 
    // this.cartService.checkForProductInCart(1);

  }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
  }

  getProducts() {
    this.productService
      .getProducts$()
      .toPromise().then(
        (result: any) => {
          this.products = result;
          // console.log(result)
        })
  }

  getBrands() {
    this.productService
      .getBrands$()
      .toPromise().then(
        (result: any) => {
          this.brands = result;
          // console.log(result)
        })
  }

  // view full product in product details page
  viewProduct(product){
    // add product to observable
    this.productService.updateProductDetails(product)
    this.router.navigate(['view']);
  }

  // add product to cart
  addToCart(product){
    // add product to observable
    this.cartService.addToCart(product)
  }

  // add product to wishList
  addToWishlist(product){
    // add product to observable
    this.wishlistService.addToWishlist(product)
  }

  productQuickViewModal(product) {
    const modalRef = this.modalService.open(ProductQuickViewComponent, { size: 'lg',centered: true  });
    modalRef.componentInstance.product = product;
    modalRef.result.then((result) => {
      console.log(result)
      if(result){

      }
    }).catch((res) => {
      console.log(res)
      if(res){
      }
    });
  }

  
}
