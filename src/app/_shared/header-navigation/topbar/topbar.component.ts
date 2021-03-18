import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  wishListItems = [];

  constructor(
    public wishlistService: WishlistService
  ) {
    this.wishlistService.wishListDetails$.subscribe(
      (details) => {
        this.wishListItems = details;
      }
    );

   }

  ngOnInit(): void {
  }

}
