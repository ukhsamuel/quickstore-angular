import { Component, OnInit } from '@angular/core';
import { ProductService, CartService, OrdersService, ToastService } from '../../core/services/';
import { Product, CartItem} from '../../_shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  cartItems : CartItem[] = [];
  showSummary = false;
  orderInformation = {
    comment: "",
    address: "",
    phone: "",
    email: "",
    productIds : "",
    fee:0
  }
  submitted: boolean;

  constructor(
    private productService: ProductService,
    private ordersService: OrdersService,
    private toastService: ToastService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {


    this.cartService.cartDetails$.subscribe(
      (details) => {
        this.cartItems = details;
        console.log('cart', details)
      }
    );
  }

  quantityChanged(ev, i){
    console.log('changed', ev)
    console.log('index', i)
    let env = this
    if(ev)
      env.cartItems[i].quantity = ev;
  }

  deleteItem(id){
    this.cartService.removeFromCart(id)
  }

  returnTotal(){
    let total = 0;
    // calculate total of price
    this.cartItems.forEach(item =>{
      total += (item.price * item.quantity)
    })
    return total;
  }

  submitOrder(){
    this.submitted = true;

    if(!this.orderInformation.phone || !this.orderInformation.address || !this.orderInformation.email ){
      return false;
    }

    
    this.orderInformation.fee = this.returnTotal();

    let idArray = this.cartItems.map(function(entry){
      return entry.productId
    })

    this.orderInformation.productIds = JSON.stringify(idArray)

    console.log(this.orderInformation)


    this.ordersService.doOrders$(this.orderInformation).subscribe((res) => {
        console.log('res: ', res);
        if(res.status){
          this.clearForm();
          this.router.navigate(['/']);
          this.cartService.removeAllFromCart()
        }
    });
  }

  clearForm(){
    this.showSummary = false;
    this.submitted = false;
    this.orderInformation = {
      comment: "",
      address: "",
      phone: "",
      email: "",
      productIds : "",
      fee:0
    }
  }

  showSuccess() {
    console.log(9999)
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Toast Header'
    });
  }

}
