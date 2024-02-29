const viewData = {
    id: "codbex-hestia-sales-invoices",
    label: "Sales Invoices",
    lazyLoad: true,
    link: "/services/web/codbex-invoices/gen/ui/SalesInvoice/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}