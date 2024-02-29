const viewData = {
    id: "codbex-hestia-purchase-invoices",
    label: "Purchase Invoices",
    lazyLoad: true,
    link: "/services/web/codbex-invoices/gen/ui/PurchaseInvoice/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}