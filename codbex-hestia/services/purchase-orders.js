const viewData = {
    id: "codbex-hestia-purchase-orders",
    label: "Purchase Orders",
    lazyLoad: true,
    link: "/services/web/codbex-orders/gen/ui/PurchaseOrder/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}