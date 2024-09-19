import { SalesInvoiceRepository as SalesInvoiceDao } from "codbex-invoices/gen/codbex-invoices/dao/salesinvoice/SalesInvoiceRepository";
import { PurchaseInvoiceRepository as PurchaseInvoiceDao } from "codbex-invoices/gen/codbex-invoices/dao/purchaseinvoice/PurchaseInvoiceRepository";

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
        let unpaidSalesInvoicesTotal: number = 0.0;
        let unpaidPurchaseInvoiceTotal: number = 0.0;
        let receivableTotalNotDue: number = 0;
        let receivableTotalDue: number = 0;
        let payableTotalNotDue: number = 0;
        let payableTotalDue: number = 0;
        const currentDate = new Date();

        const allSalesInvoices = this.salesInvoiceDao.findAll({});
        allSalesInvoices.forEach(salesInvoice => {
            salesInvoiceTotal += salesInvoice.Total;
        });

        const allPurchaseInvoices = this.purchaseInvoiceDao.findAll({});
        allPurchaseInvoices.forEach(purchaseInvoice => {
            purchaseInvoiceTotal += purchaseInvoice.Total;
        });

        const unpaidSalesInvoicesCount = this.salesInvoiceDao.count({
            $filter: {
                notEquals: {
                    //All invoices that don't have the status 'Paid'
                    SalesInvoiceStatus: 6
                }
            }
        });

        const salesInvoicesNotDue = this.salesInvoiceDao.findAll({
            $filter: {
                greaterThanOrEqual: {
                    Due: currentDate
                },
                notEquals: {
                    //All invoices that don't have the status 'Paid'
                    SalesInvoiceStatus: 6
                }
            }
        });

        salesInvoicesNotDue.forEach(salesInvoice => {
            receivableTotalNotDue += salesInvoice.Total;
            unpaidSalesInvoicesTotal += salesInvoice.Total;
        });

        const salesInvoicesDue = this.salesInvoiceDao.findAll({
            $filter: {
                lessThan: {
                    Due: currentDate
                },
                notEquals: {
                    //All invoices that don't have the status 'Paid'
                    SalesInvoiceStatus: 6
                }
            }
        });

        salesInvoicesDue.forEach(salesInvoice => {
            receivableTotalDue += salesInvoice.Total;
            unpaidSalesInvoicesTotal += salesInvoice.Total;
        });

        const purchaseInvoicesNotDue = this.purchaseInvoiceDao.findAll({
            $filter: {
                greaterThanOrEqual: {
                    Due: currentDate
                }
            }
        });

        const unpaidPurchaseInvoicesCount = this.purchaseInvoiceDao.count({
            $filter: {
                notEquals: {
                    //All invoices that don't have the status 'Paid'
                    PurchaseInvoiceStatus: 6
                }
            }
        });

        purchaseInvoicesNotDue.forEach(purchaseInvoice => {
            payableTotalNotDue += purchaseInvoice.Total;
            unpaidPurchaseInvoiceTotal += purchaseInvoice.Total;
        });

        const purchaseInvoicesDue = this.purchaseInvoiceDao.findAll({
            $filter: {
                lessThan: {
                    Due: currentDate
                }
            }
        });

        purchaseInvoicesDue.forEach(purchaseInvoice => {
            payableTotalDue += purchaseInvoice.Total;
            unpaidPurchaseInvoiceTotal += purchaseInvoice.Total;
        });

        return {
            "SalesInvoiceTotal": salesInvoiceTotal,
            "PurchaseInvoiceTotal": purchaseInvoiceTotal,
            "UnpaidSalesInvoicesCount": unpaidSalesInvoicesCount,
            "UnpaidPurchaseInvoicesCount": unpaidPurchaseInvoicesCount,
            "UnpaidSalesInvoiceTotal": unpaidSalesInvoicesTotal,
            "UnpaidPurchaseInvoiceTotal": unpaidPurchaseInvoiceTotal,
            "ReceivableCurrent": receivableTotalNotDue,
            "ReceivableOverdue": receivableTotalDue,
            "PayablesCurrent": payableTotalNotDue,
            "PayablesOverdue": payableTotalDue
        };
    }
}