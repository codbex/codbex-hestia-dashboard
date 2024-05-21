const viewData = {
    id: "codbex-hestia-catalogue",
    label: "Catalogue",
    lazyLoad: true,
    link: "/services/web/codbex-products/gen/ui/Catalogue/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}