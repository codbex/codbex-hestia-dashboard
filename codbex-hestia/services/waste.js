const viewData = {
    id: "codbex-hestia-waste",
    label: "Waste",
    lazyLoad: true,
    link: "/services/web/codbex-inventory/gen/codbex-inventory/ui/Waste/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}