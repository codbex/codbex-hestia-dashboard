const viewData = {
    id: "codbex-hestia-delivery-note",
    label: "Delivery Note",
    lazyLoad: true,
    link: "/services/web/codbex-inventory/gen/codbex-inventory/ui/DeliveryNote/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}