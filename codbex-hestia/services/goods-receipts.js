const viewData = {
    id: "codbex-hestia-goods-receipts",
    label: "Goods Receipts",
    lazyLoad: true,
    link: "/services/web/codbex-inventory/gen/ui/GoodsReceipts/index.html?embedded"
};
if (typeof exports !== 'undefined') {
    exports.getView = function () {
        return viewData;
    }
}