const viewData = {
    id: "codbex-hestia-dashboard",
    label: "Dashboard",
    lazyLoad: true,
    link: "/services/web/codbex-hestia/subviews/dashboard.html"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}