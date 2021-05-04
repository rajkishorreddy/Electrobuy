<!-- API -->

This server application exposes only an API that provides the details of the products

/products ==> Gives all the products of all categories available
/products/category ==> Returns a array of all categories available
/products/category/:categoryName ==> Gives all the products of the respective category available
/products/:productId ==> Gives the detailed info of the product

<!-- DATABASES -->

1. Products
   Here, we have all products of all categories in one database
   Each product has a key named category, that places it in its respective category
