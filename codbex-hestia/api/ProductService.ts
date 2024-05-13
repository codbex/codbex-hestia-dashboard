import { ProductRepository as ProductDao } from "codbex-products/gen/dao/Products/ProductRepository";
import { ProductCategoryRepository as CategoryDao } from "codbex-products/gen/dao/Categories/ProductCategoryRepository";
import { SalesInvoiceItemRepository as SalesInvoiceItemDao } from "codbex-invoices/gen/dao/salesinvoice/SalesInvoiceItemRepository";

import { Controller, Get } from "sdk/http";

@Controller
class ProductService {

    private readonly productDao;
    private readonly categoryDao;
    private readonly salesInvoiceItemDao;

    constructor() {
        this.productDao = new ProductDao();
        this.categoryDao = new CategoryDao();
        this.salesInvoiceItemDao = new SalesInvoiceItemDao();

    }

    @Get("/productData")
    public productData() {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const allProducts = this.productDao.findAll();

        const activeProducts = allProducts.filter(product => product.Enabled === true).length;
        const inactiveProducts = allProducts.filter(product => product.Enabled === false).length;

        const activeCategories: number = this.categoryDao.count();

        const allSalesInvoiceItems = this.salesInvoiceItemDao.findAll();
        const productMap = new Map<string, { quantity: number, revenue: number }>();

        // Aggregate sales data
        allSalesInvoiceItems.forEach(item => {
            const productId = item.Product; // Assuming productId is the ID of the product
            const name = this.productDao.findById(productId).Name;
            const quantity = item.Quantity;
            const unitPrice: number = item.Price;
            const revenue: number = quantity * unitPrice;

            if (productMap.has(name)) {
                // Product already exists, update quantity and revenue
                const existingData = productMap.get(name);
                productMap.set(name, {
                    quantity: existingData.quantity + quantity,
                    revenue: existingData.revenue + revenue
                });
            } else {
                // New product, add to map
                productMap.set(name, { quantity, revenue });
            }
        });

        // Convert map to array and sort by revenue in descending order
        const topProducts = Array.from(productMap.entries())
            .sort((a, b) => b[1].quantity - a[1].quantity)
            .slice(0, 5)
            .map(([product, data]) => ({ product, quantity: data.quantity, revenue: data.revenue.toFixed(2) }));

        return {
            "ActiveProducts": activeProducts,
            "InactiveProducts": inactiveProducts,
            "AllProducts": allProducts.length,
            "ActiveCategories": activeCategories,
            "TopProducts": topProducts
        }
    }
}