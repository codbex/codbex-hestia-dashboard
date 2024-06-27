const viewData = {
    id: "codbex-hestia-products",
    label: "Products",
    lazyLoad: true,
    link: "/services/web/codbex-products/gen/codbex-products/ui/Products/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}