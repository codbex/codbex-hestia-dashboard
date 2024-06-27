const viewData = {
    id: "codbex-hestia-categories",
    label: "Categories",
    lazyLoad: true,
    link: "/services/web/codbex-products/gen/codbex-products/ui/Categories/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}