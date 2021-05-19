import { Component, OnInit } from '@angular/core';
import { ProductService, CartService } from '../../../core/services/';
import { Category, CartItem,Product} from '../../../_shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public isMenuCollapsed = true;
  cartItems : CartItem[] = [];
  categories: any = [];
  selectedCategory = "";
  products : Product[];

  title = 'NgxTypeahead Demo';

  // Typeahead with Local Data List

  public productNameList = [];
  public search1 = '';


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private store: Store<{ items: []; cart: [] }>
    ) {
      this.store.pipe(select(state => state)).subscribe(data => {
        this.cartItems = data['shop'].cart?data['shop'].cart:[];
      });
     }

 
    ngOnInit(): void {
      this.loadCart();
      this.loadCategories();      
      this.getProducts();      
    }

    loadCart(){
      this.cartService.cartDetails$.subscribe(
        (details) => {
          this.cartItems = details;
          // console.log('cart', details)
        }
      );


      // this.store.pipe(select(state => state)).subscribe(data => {
      //       let cartData = undefined;
      //       cartData = data;
      //       // this.cartItems = data['shop'].cart;
  
      //       console.log('this.cart', data['shop'].cart);
      //   });

    }

    productSelected(result) {
      this.search1 = result;
    }

    viewCategory(id){
      let c = id;
      this.router.navigate(['/category'], { queryParams: { c }});     
    }
  
  

    loadCategories(){
      this.productService.getCategories$().subscribe(
        (details) => {
          this.categories = details;
          // console.log('rrr', details)
        }
      );
  
    }
  
  returnCartTotal(){
    let total = 0;
    if(!this.cartItems)
      return 0;
    // calculate total of price
    this.cartItems.forEach(item =>{
      total += (item.price * item.quantity)
    })
    return total;
  }
  
  search(value){
    console.log('rrr', value)
    this.productService.searchProducts$(value, this.selectedCategory).subscribe(
      (details) => {
        this.categories = details;
        console.log('rrr', details)
      }
    );
  }


  getProducts() {
    this.productService
      .getProducts$()
      .toPromise().then(
        (result: any) => {
          this.products = result;
          this.productNameList = this.generateProductNames(this.products);
          // console.log(result)
        })
  }

  generateProductNames(arr){
    return arr.map(function(p){
      return p.name
    });
  }

  onCategorySelected(id){
    console.log(id)
    var filteredArray = this.products.filter(function (el) {
        return el.categoryId == id;
    });

    this.productNameList = this.generateProductNames(filteredArray);
    console.log(this.productNameList)
  }
}
