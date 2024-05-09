const viewData = {
    id: "codbex-hestia-stock-adjustments",
    label: "Stock Adjustments",
    lazyLoad: true,
    link: "/services/web/codbex-inventory/gen/ui/StockAdjustments/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}