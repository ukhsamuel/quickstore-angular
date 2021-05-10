import { Component, OnInit } from '@angular/core';
import { ProductService, CartService, WishlistService } from '../../core/services';
import { Product} from '../../_shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  currentDisplayedPhotoIndex : number = 0;
 
  @Output() addToWishlistEvent = new EventEmitter<string>();
  product: Product;
  ratings: any;
  navData: any;
  cartQuantity : any;
	productReviewForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  error: any;

  constructor(
    config: NgbRatingConfig,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute, 
    private cartService: CartService,
    private router: Router
  ) { 
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;

    this.navData = this.activatedRoute.snapshot.queryParams;
    console.log('product', (this.navData));
    this.getProduct(this.navData.q);
    this.getProductRatings(this.navData.q);

    this.productReviewForm = this.formBuilder.group({
      name: ['', Validators.required],
      review: ['', Validators.required],
      rating: ['', Validators.required],
      productId: [this.navData.q],
      email: [null, [Validators.required, Validators.email]],
    });

    this.productService.productDetails$.subscribe(
      (details) => {
        this.product = details;
        console.log(details)
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.productReviewForm.controls; }

  ngOnInit(): void {
  }


  getProduct(id) {
    this.productService.getProductsDetail$(id).subscribe((res) => {
      if(res.status){
        this.product = res.data.product;
        this.product.rating = res.data.rating
        console.log('products', res);

      }
    });
  }

  addToWishlist(value) {
    console.log('vv')
    this.wishlistService.addToWishlist(value)
  }

  getProductRatings(id) {
    this.productService.getProductRatings$(id)
    .pipe(first())
    .subscribe((res) => {
      if(res.status){
        this.ratings = res.data;
      }
      console.log('res', res);
    });
    
  }

  // add product to cart
  addToCart(product){
    // add product to observable
    this.cartService.addToCart(product, this.cartQuantity)
  }

  selectPhoto(i){
    this.currentDisplayedPhotoIndex = i;
  }

  onReviewSubmit() {
    console.log("get here");
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.productReviewForm.invalid);
    if (this.productReviewForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.productReviewForm.value);
    this.productService.submitRating$(this.productReviewForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          this.loading = false;
          if(data.status){
            this.getProductRatings(this.navData.q);
            this.resetReviewForm();
          }
        },
        error => {
          console.log("here 2", error);
          this.error = error;
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  resetReviewForm() {
    this.productReviewForm.setValue({
      name: '',
      review: '',
      productId: this.navData.q,
      rating: '',
      email: '',
    });
  }
}
