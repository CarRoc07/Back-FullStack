export type User = {
    name: string,
    last_name: string,
    password: string,
    email: string,
}

export type Decoded = {
    id: string
    email: string,
    name: string,
    iat: number,
    exp: number
}

export type UpdateData = {
    name?: string,
    last_name?: string,
    password?: string,
}

export type Order = {
    id: number,
    user: User,
    userID: string,
    status: string,
    createdAt: Date,
    orderItems: OrderItem[],
}

export type OrderInput = Omit<Order, 'id' | 'user' |  'createdAt' | 'userID'>;

export type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    product: Product;
    productID: number;
    order: Order;
    orderID: number;
};

export type OrderItemInput = Omit<OrderItem, 'id' | 'product' | 'order' | 'orderID'>

export type Product = {
    id: number;
    name: string;
    price: number;
    categoryID: number;
    stock: number;
    img: string;
    orderItems?: OrderItem[];
};

export type ProductCreate = Omit<Product, 'id' | 'orderItems'>;

export type Category = {
    id: number;
    name: string;
    img: string;
    created_at: Date;
    products: Product[];
}

export type CategoryCreate = Omit<Category, 'id' | 'created_at' | 'products'>;




