const viewData = {
    id: "codbex-hestia-companies",
    label: "Companies",
    lazyLoad: true,
    link: "/services/web/codbex-companies/gen/codbex-companies/ui/Companies/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}