const viewData = {
    id: "codbex-hestia-dimensions",
    label: "Dimensions",
    lazyLoad: true,
    link: "/services/web/codbex-uoms/gen/ui/Dimensions/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}