const perspectiveData = {
    id: "codbex-hestia-launchpad",
    name: "Hestia",
    link: "../codbex-hestia/index.html",
    order: 0,
    icon: "../codbex-hestia/images/navigation.svg",
};

if (typeof exports !== 'undefined') {
    exports.getPerspective = function () {
        return perspectiveData;
    }
}