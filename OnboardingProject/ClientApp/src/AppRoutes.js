import { Customers } from "./components/Customers";
import { Products } from "./components/Products";
import { Stores } from "./components/Stores";
import { Sales } from "./components/Sales";
import { Home } from "./components/Home";

import { CustomersUpdate } from "./components/Customers/CustomersUpdate";
import { CustomersCreate } from "./components/Customers/CustomersCreate";

import { ProductsUpdate } from "./components/Products/ProductsUpdate";
import { ProductsCreate } from "./components/Products/ProductsCreate";

import { StoresUpdate } from "./components/Stores/StoresUpdate";
import { StoresCreate } from "./components/Stores/StoresCreate";

import { SalesUpdate } from "./components/Sales/SalesUpdate";
import { SalesCreate } from "./components/Sales/SalesCreate";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/customers',
        element: <Customers />
    },
    {
        path: '/products',
        element: <Products />
    },
    {
        path: '/stores',
        element: <Stores />
    },
    {
        path: '/sales',
        element: <Sales />
    },
    {
        path: '/CustomerUpdate/:id',
        element: <CustomersUpdate />
    },
    {
        path: '/CustomerCreate',
        element: <CustomersCreate />
    },
    {
        path: '/ProductUpdate/:id',
        element: <ProductsUpdate />
    },
    {
        path: '/ProductCreate',
        element: <ProductsCreate />
    },
    {
        path: '/StoreUpdate/:id',
        element: <StoresUpdate />
    },
    {
        path: '/StoreCreate',
        element: <StoresCreate />
    },
    {
        path: '/SaleUpdate/:id',
        element: <SalesUpdate />
    },
    {
        path: '/SaleCreate',
        element: <SalesCreate />
    }
];

export default AppRoutes;
