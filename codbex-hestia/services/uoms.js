const viewData = {
    id: "codbex-hestia-uoms",
    label: "UoMs",
    lazyLoad: true,
    link: "/services/web/codbex-uoms/gen/codbex-uoms/ui/UnitsOfMeasures/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}