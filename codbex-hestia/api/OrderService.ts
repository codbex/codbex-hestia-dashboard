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
        let salesTotalNotDue: number = 0;
        let salesTotalDue: number = 0;
        let purchaseTotalNotDue: number = 0;
        let purchaseTotalDue: number = 0;
        let paidSalesOrders: number = 0;
        let newSalesOrders: number = 0;
        let avgSalesOrderPrice: number = 0;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let salesOrdersToday = this.salesOrderDao.findAll({
            $filter: {
                equals: {
                    Date: currentDate
                }
            }
        });

        const salesOrderTodayLength: number = !salesOrdersToday || salesOrdersToday.length === 0 ? 0 : salesOrdersToday.length;

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
        const unpaidPurchaseOrders = this.purchaseOrderDao.count({
            $filter: {
                notEquals: {
                    //All orders that don't have the status 'Paid'
                    PurchaseOrderStatus: 6
                }
            }
        });

        salesOrders.forEach(order => {
            if (order.Due && new Date(order.Due) > new Date()) {
                salesTotalNotDue += order.Total;
            } else {
                salesTotalDue += order.Total;
            }
            salesOrderTotal += order.Total;
        });

        purchaseOrders.forEach(order => {
            if (order.Due && new Date(order.Due) > new Date()) {
                purchaseTotalNotDue += order.Total;
            } else {
                purchaseTotalDue += order.Total;
            }
            purchaseOrderTotal += order.Total;
        });

        salesOrders.forEach(salesOrder => {
            if (salesOrder.SalesOrderStatus == 6) {
                paidSalesOrders++;
            }
            if (salesOrder.SalesOrderStatus == 1) {
                newSalesOrders++;
            }
        })

        const today = new Date();
        const lastMonthStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const salesOrdersLastMonth = salesOrders.filter(order => order.Date >= lastMonthStartDate && order.Date < today);
        const totalPriceLastMonth = salesOrdersLastMonth.reduce((total, order) => total + order.Gross, 0);
        avgSalesOrderPrice = (totalPriceLastMonth / salesOrdersLastMonth.length);

        const mostExpensiveSalesOrders = salesOrders.slice().sort((a, b) => b.Gross - a.Gross).slice(0, 5);

        return {
            "UnpaidSalesOrders": unpaidSalesOrders,
            "UnpaidPurchaseOrders": unpaidPurchaseOrders,
            "SalesOrdersToday": salesOrderTodayLength,
            "SalesOrderTotal": salesOrderTotal,
            "PurchaseOrderTotal": purchaseOrderTotal,
            "ReceivableCurrent": salesTotalNotDue,
            'ReceivableOverdue': salesTotalDue,
            "PayablesCurrent": purchaseTotalNotDue,
            'PayablesOverdue': purchaseTotalDue,
            "PaidSalesOrders": paidSalesOrders,
            "NewSalesOrders": newSalesOrders,
            "AverageSalesOrderPrice": avgSalesOrderPrice,
            "TopSalesOrders": mostExpensiveSalesOrders
        };
    }
}