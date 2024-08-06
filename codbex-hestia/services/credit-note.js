const viewData = {
    id: "codbex-hestia-credit-note",
    label: "Credit Note",
    lazyLoad: true,
    link: "/services/web/codbex-invoices/gen/codbex-invoices/ui/CreditNote/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}