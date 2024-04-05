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
        let lowStockProducts: number = 0;
        let activeProducts: number = 0;
        let activeCategories: number = 0;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const products = this.productDao.findAll();
        const categories = this.categoryDao.findAll();

        products.forEach(product => {
            if (product.Enabled == true) {
                activeProducts++;
            }
        })

        categories.forEach(category => {
            if (category.Enabled == true) {
                activeCategories++;
            }
        })

        return {
            "ActiveProducts": activeProducts,
            "ActiveCategories": activeCategories,
            "LowStockProducts": lowStockProducts
        }
    }
}