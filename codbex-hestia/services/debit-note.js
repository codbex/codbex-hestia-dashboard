const viewData = {
    id: "codbex-hestia-debit-note",
    label: "Debit Note",
    lazyLoad: true,
    link: "/services/web/codbex-invoices/gen/codbex-invoices/ui/DebitNote/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}