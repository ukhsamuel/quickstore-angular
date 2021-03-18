export interface Brand {
    id: number;
    name: string;
    photo: string;
}

export interface Category {
    id: number;
    name: string;
    icon?: string;
}

export interface Product {
    id: number;
    name: string;
    photos : string[];
    description: string;
    price: number;
    brandId: number;
    brandName: string;
    categoryId: number;
    categoryName: string;
    rating:number
}

export interface CartItem {
    productId: number;
    productName: string;
    photo : string;
    quantity: number;
    price: number;
    brandId: number;
    brandName: string;
    categoryId: number;
    categoryName: string;
}

export interface WishListItem {
    productId: number;
    productName: string;
    photo : string;
    price: number;
    brandId: number;
    brandName: string;
    categoryId: number;
    categoryName: string;
}
