const viewData = {
    id: "codbex-hestia-sales-orders-report",
    label: "Sales Orders Report",
    lazyLoad: true,
    link: "/services/web/codbex-orders/gen/codbex-orders/ui/Reports/SalesOrdersReport/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}