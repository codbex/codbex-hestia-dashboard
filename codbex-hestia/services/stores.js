const viewData = {
    id: "codbex-hestia-stores",
    label: "Stores",
    lazyLoad: true,
    link: "/services/web/codbex-inventory/gen/codbex-inventory/ui/Stores/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}