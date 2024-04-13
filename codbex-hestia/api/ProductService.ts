import { ProductRepository as ProductDao } from "codbex-products/gen/dao/Products/ProductRepository";
import { ProductCategoryRepository as CategoryDao } from "codbex-products/gen/dao/Categories/ProductCategoryRepository";

import { Controller, Get } from "sdk/http";

@Controller
class ProductService {

    private readonly productDao;
    private readonly categoryDao;

    constructor() {
        this.productDao = new ProductDao();
        this.categoryDao = new CategoryDao();
    }

    @Get("/productData")
    public productData() {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const allProducts = this.productDao.findAll();

        const activeProducts = allProducts.filter(product => product.Enabled === true).length;
        const inactiveProducts = allProducts.filter(product => product.Enabled === false).length;


        const activeCategories: number = this.categoryDao.count();

        return {
            "ActiveProducts": activeProducts,
            "InactiveProducts": inactiveProducts,
            "AllProducts": allProducts.length,
            "ActiveCategories": activeCategories
        }
    }
}