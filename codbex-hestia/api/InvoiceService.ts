import { SalesInvoiceRepository as SalesInvoiceDao } from "codbex-invoices/gen/dao/salesinvoice/SalesInvoiceRepository";
import { PurchaseInvoiceRepository as PurchaseInvoiceDao } from "codbex-invoices/gen/dao/purchaseinvoice/PurchaseInvoiceRepository";

import { Controller, Get } from "sdk/http";

@Controller
class InvoiceService {

    private readonly salesInvoiceDao;
    private readonly purchaseInvoiceDao;

    constructor() {
        this.salesInvoiceDao = new SalesInvoiceDao();
        this.purchaseInvoiceDao = new PurchaseInvoiceDao();
    }

    @Get("/invoiceData")
    public invoiceData() {
        let salesInvoiceTotal: number = 0.0;
        let purchaseInvoiceTotal: number = 0.0;
        let totalNotDue: number = 0;
        let totalDue: number = 0;

        const purchaseInvoices = this.purchaseInvoiceDao.findAll();
        const salesInvoices = this.salesInvoiceDao.findAll();
        const unpaidSalesInvoices = this.salesInvoiceDao.count({
            $filter: {
                notEquals: {
                    //All invoices that don't have the status 'Paid'
                    SalesInvoiceStatus: 6
                }
            }
        });

        salesInvoices.forEach(salesInvoice => {
            if (salesInvoice.Due && new Date(salesInvoice.Due) > new Date()) {
                totalNotDue += salesInvoice.Total;
            } else {
                totalDue += salesInvoice.Total;
            }
            salesInvoiceTotal += salesInvoice.Total;
        });

        purchaseInvoices.forEach(purchaseInvoice => {
            if (purchaseInvoice.Due && new Date(purchaseInvoice.Due) > new Date()) {
                totalNotDue += purchaseInvoice.Total;
            } else {
                totalDue += purchaseInvoice.Total;
            }
            purchaseInvoiceTotal += purchaseInvoice.Total;
        });

        return {
            "UnpaidSalesInvoices": unpaidSalesInvoices,
            "SalesInvoiceTotal": salesInvoiceTotal,
            "PurchaseInvoiceTotal": purchaseInvoiceTotal,
            "ReceivableCurrent": totalNotDue,
            'ReceivableOverdue': totalDue
        };
    }
}