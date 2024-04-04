import { ProductRepository as ProductDao } from "codbex-products/gen/dao/Products/ProductRepository";

import { Controller, Get } from "sdk/http";

@Controller
class ProductService{

    private readonly productDao;

    constructor() {
        this.productDao = new ProductDao();
    }

    @Get("/productData")
    public productData() {
        let lowStockProducts: number = 0;
        let activeProducts: number = 0;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const products = this.productDao.findAll();

        products.forEach(product => {
            if(product.Enabled == true){
                activeProducts++;
            }
        })

        return {
            "ActiveProducts": activeProducts
        }
    }
}