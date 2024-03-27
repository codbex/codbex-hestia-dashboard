import { SalesOrderRepository as SalesOrderDao } from "codbex-orders/gen/dao/SalesOrder/SalesOrderRepository";
import { PurchaseOrderRepository as PurchaseOrderDao } from "codbex-orders/gen/dao/PurchaseOrder/PurchaseOrderRepository";

import { Controller, Get } from "sdk/http";

@Controller
class OrderService {

    private readonly salesOrderDao;
    private readonly purchaseOrderDao;

    constructor() {
        this.salesOrderDao = new SalesOrderDao();
        this.purchaseOrderDao = new PurchaseOrderDao();
    }

    @Get("/orderData")
    public orderData() {
        let salesOrderTotal: number = 0.0;
        let purchaseOrderTotal: number = 0.0;
        let totalNotDue: number = 0;
        let totalDue: number = 0;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let salesOrdersToday = this.salesOrderDao.findAll({
            $filter: {
                greaterThanOrEqual: {
                    Date: currentDate
                }
            }
        });

        if (!salesOrdersToday || salesOrdersToday.length === 0) {
            salesOrdersToday = 0;
        }

        const purchaseOrders = this.purchaseOrderDao.findAll();
        const salesOrders = this.salesOrderDao.findAll();
        const unpaidSalesOrders = this.salesOrderDao.count({
            $filter: {
                notEquals: {
                    //All orders that don't have the status 'Paid'
                    SalesOrderStatus: 6
                }
            }
        });

        salesOrders.forEach(salesOrder => {
            if (salesOrder.Due && new Date(salesOrder.Due) > new Date()) {
                totalNotDue += salesOrder.Total;
            } else {
                totalDue += salesOrder.Total;
            }
            salesOrderTotal += salesOrder.Total;
        });

        purchaseOrders.forEach(purchaseOrder => {
            if (purchaseOrder.Due && new Date(purchaseOrder.Due) > new Date()) {
                totalNotDue += purchaseOrder.Total;
            } else {
                totalDue += purchaseOrder.Total;
            }
            purchaseOrderTotal += purchaseOrder.Total;
        });

        return {
            "UnpaidSalesOrders": unpaidSalesOrders,
            "SalesOrdersToday": salesOrdersToday,
            "SalesOrderTotal": salesOrderTotal,
            "PurchaseOrderTotal": purchaseOrderTotal,
            "ReceivableCurrent": totalNotDue,
            'ReceivableOverdue': totalDue
        };
    }
}