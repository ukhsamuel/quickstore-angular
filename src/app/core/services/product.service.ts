import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Category, Product, Brand} from '../../_shared/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl + environment.basePath;


  public productSource = new BehaviorSubject<Product>(null);
  productDetails$ = this.productSource.asObservable();



  products: Product[] =  [
    {
      id: 1,
      description:'The S8 HiFi Speaker from Zealot pairs with all Bluetooth-enabled devices including smartphone/tablets/PC and allows wireless music streaming up to 10m away. Equipped with a smart audio chip, two magnetic speakers and diaphragms, ZEALOT S8 can provide 360-degree surround sound performance at Hi-Fi level. Built-in 4000mAh rechargeable battery that provides up to approx. 20 hours of playtime. And a touch panel with blue breathing lights, very easy to operate.',
      name: 'Zealot S8',
      price: 500,
      photo:'01.jpg',
      photos: [
        '01.jpg','02.jpg','03.jpg'
      ],
      brandId:1,
      brandName: 'Zealot',
      categoryId:1,
      rating:4,
      categoryName: 'Computers & Accessories'
    },
    {
      id: 2,
      description:'This light-weight and sleek appliance is 1200W powerful and comes with stable heel rest, integrated cord storage and non-stick soleplate which ensures smooth results even when you use spray starch spray on your clothes.',
      name: 'Binatone Dry Iron DI-1255',
      price: 4000,
      photo:'04.jpg',
      photos: [
        '04.jpg','05.jpg','06.jpg'
      ],
      brandId:1,
      brandName: 'Zealot',
      categoryId:1,
      rating:3,
      categoryName: 'Computers & Accessories'
    },
    {
      id: 3,
      description:'It\'s so important to have the right home appliances, whether they are large or small, they help you satisfy the different needs we have around the house as well as making life so much more comfortable for us. Here on Jumia, we have a wide range of HOME APPLIANCES to fit different areas of your home and function efficiently well to leave you satisfied. Our home appliances include washing machines, Air conditioners, standing fans, Freezers, Irons, water dispensers, electric kettles, juicers and BLENDERS.',
      name: 'BLENDER AND GRINDER',
      price: 8000,
      photo:'08.jpg',
      photos: [
        '08.jpg','09.jpg','10.jpg'
      ],
      brandId:2,
      brandName: 'Techno',
      categoryId:2,
      rating:5,
      categoryName: 'Smartphones & Tablets'
    },
    {
      id: 4,
      description:'Hello there! welcome to our store! The preferential price of quality products is our top priority.From delicate looks to meticulous stitching and cotton-rich materials, these are important things. Dear Customer: To avoid choosing the wrong size, please read the size label carefully.',
      name: 'Men\'s Cotton Casual Short-sleeved ',
      price: 3500,
      photo:'11.jpg',
      photos: [
        '11.jpg','12.jpg','13.jpg'
      ],
      brandId:2,
      brandName: 'Adidas',
      categoryId:2,
      rating:5,
      categoryName: 'Smartphones & Tablets'
    }
  ];

  brands: Brand[] =  [
    {
      id: 1,
      name: 'Adidas',
      photo: '01.png',
    },
    {
      id: 2,
      name: 'Puma',
      photo: '02.png',
    },
    {
      id: 3,
      name: 'Tommy Hilfiger',
      photo: '03.png',
    },
    {
      id: 4,
      name: 'Columbia',
      photo: '04.png',
    },

  ]

  categories: Category[] =  [
    {
      id: 1,
      name: 'Shoes',
      icon: 'icon-mustache icons'
    },
    {
      id: 2,
      name: 'Clothing',
      icon: 'icon-badge icons'
    },
    {
      id: 3,
      name: 'Bags',
      icon: 'icon-bag icons'
    },
    {
      id: 4,
      name: 'Watches',
      icon: 'icon-diamond icons'
    },

  ]
 
  constructor(
    private http: HttpClient
  ) { }

  getProducts$(){
    return this.DOGET('/product');
  }

  getNewProducts$(){
    return this.DOGET('/product?orderBy=new');
  }

  getProductsByCategory$(id) {
    return this.DOGET('/product/category/' + id);
  }

  getProductsDetail$(id) {
    return this.DOGET('/product/' + id);
  }

  searchProducts$(term, id) : Observable<Product[]> {
    var filteredArray = this.products.filter(function (el) {
      if(id && term){
        return el.name.includes(term) && el.categoryId == id;
      }else if(!id && term){
        console.log(el.name.includes(term))
        return el.name.includes(term)
      }
      // return el.categoryId == id;
    });
    return of(filteredArray);
  }

  // getBrands$() : Observable<Brand[]> {
  //   return of(this.brands);
  // }

  getBrands$(){
    return this.DOGET('/brand');
  }

  // getCategories$() : Observable<Category[]> {
  //   return of(this.categories);
  // }


  getCategories$(){
    return this.DOGET('/category');
  }

  getProductRatings$(id){
    return this.DOGET('/rating/' +  id);
  }


  submitRating$(data){
    return this.DOPOST('/rating', data);
  }

  

  //=======================UPDATE PRODUCT DETAILS========================================

  updateProductDetails(productDetails: Product){
    this.productSource.next(productDetails);
  }

  DOGET(url:string){
    return this.http.get<any>(this.baseUrl + url); 
  }

  DOPOST(url:string,payload){
    return this.http.post<any>(this.baseUrl + url, payload)
  }


}
