import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../_shared/interfaces';

@Component({
  selector: 'app-product-quick-view',
  templateUrl: './product-quick-view.component.html',
  styleUrls: ['./product-quick-view.component.scss']
})
export class ProductQuickViewComponent implements OnInit {
  @Input() public product;
  currentDisplayedPhotoIndex : number = 0;

  constructor(
    private modalService: NgbModal,
  ) { 
  }

  ngOnInit(): void {
    console.log(this.product)
  }


  selectPhoto(i){
    this.currentDisplayedPhotoIndex = i;
  }

  close(){
    this.modalService.dismissAll()
  }
}
