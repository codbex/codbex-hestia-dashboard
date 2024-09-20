const navigation = angular.module("launchpad", ["ngResource", "ideLayout", "ideUI"]);
navigation.controller("LaunchpadViewController", ["$scope", "messageHub", "$http", function ($scope, messageHub, $http) {
    $scope.currentViewId = 'dashboard';

    $scope.extraExtensionPoints = ['codbex-orders-dialog-window'];
    $scope.groups = [];

    $scope.switchView = function (id, event) {
        if (event) event.stopPropagation();
        $scope.currentViewId = id;
    };

    messageHub.onDidReceiveMessage('launchpad.switch.perspective', function (msg) {
        $scope.$apply(function () {
            $scope.switchView(msg.data.perspectiveId);
        });
    }, true)

    $scope.groupItems = [];
    $scope.groupItems["purchasing"] = [];
    $scope.groupItems["sales"] = [];
    $scope.groupItems["inventory"] = [];
    $scope.groupItems["finance"] = [];
    $scope.groupItems["products"] = [];
    $scope.groupItems["employees"] = [];
    $scope.groupItems["partners"] = [];
    $scope.groupItems["configurations"] = [];


    $scope.groups = [
        {
            "label": "Purchasing", "expanded": "purchasingExpanded", "icon": "credit-card",
            // "items": [
            // ready     // { "label": "Purchase Orders", "view": "purchase-orders" },
            //     // { "label": "Purchase Invoices", "view": "purchase-invoices" },
            //     // { "label": "Supplier Payments", "view": "supplier-payments" }
            // ]
        },
        {
            "label": "Sales", "expanded": "salesExpanded", "icon": "currency",
            // "items": [
            //     // { "label": "Sales Orders", "view": "sales-orders" },
            //     // { "label": "Sales Invoices", "view": "sales-invoices" },
            //     // { "label": "Customer Payments", "view": "customer-payments" },
            //     // { "label": "Debit Note", "view": "debit-note" },
            //     // { "label": "Credit Note", "view": "credit-note" }
            // ]
        },
        {
            "label": "Inventory", "expanded": "inventoryExpanded", "icon": "retail-store",
            // "items": [
            //     //     { "label": "Goods Receipts", "view": "goods-receipts" },
            //     //     { "label": "Goods Issues", "view": "goods-issues" },
            //     //     { "label": "Delivery Note", "view": "delivery-note" },
            //     //     { "label": "Stock Adjustments", "view": "stock-adjustments" },
            //     //     { "label": "Waste", "view": "waste" }
            // ]
        },
        {
            "label": "Finance", "expanded": "financeReportsExpanded", "icon": "area-chart",
            // "items": [
            //     // { "label": "Sales Orders", "view": "sales-orders-report" },
            //     // { "label": "Sales Orders Total", "view": "sales-orders-total-report" },
            //     // { "label": "Purchase Orders", "view": "purchase-orders-report" },
            //     // { "label": "Purchase Orders Total", "view": "purchase-orders-total-report" }
            // ]
        },
        {
            "label": "Products", "expanded": "productExpanded", "icon": "product",
            // "items": [
            //     // { "label": "Products", "view": "products" },
            //     // { "label": "Categories", "view": "categories" },
            //     // { "label": "Catalogue", "view": "catalogues" }
            // ]
        },
        {
            "label": "Employees", "expanded": "peopleExpanded", "icon": "company-view",
            // "items": [
            //     // { "label": "Organisations", "view": "organisations" },
            //     // { "label": "Employees", "view": "employees" }
            // ]
        },
        {
            "label": "Partners", "expanded": "partnersExpanded", "icon": "customer-and-contacts",
            // "items": [
            //     // { "label": "Customers", "view": "customers" },
            //     // { "label": "Suppliers", "view": "suppliers" },
            //     // { "label": "Manufacturers", "view": "manufacturers" }
            // ]
        },
        {
            "label": "Configurations", "expanded": "configurationsExpanded", "icon": "wrench",
            // "items": [
            //     // { "label": "Countries", "view": "countries" },
            //     // { "label": "Cities", "view": "cities" },
            //     // { "label": "Companies", "view": "companies" },
            //     // { "label": "Stores", "view": "stores" },
            //     // { "label": "Companies", "view": "companies" },
            //     // { "label": "Currencies", "view": "currencies" },
            //     // { "label": "Dimensions", "view": "dimensions" },
            //     // { "label": "Units of Measures", "view": "uoms" },
            //     // { "label": "Methods", "view": "methods" }
            // ]
        }
    ]
    $http.get("http://localhost:8080/services/ts/codbex-hestia/api/NavigationExtension/NavigationService.ts")
        .then(function (response) {
            $scope.navigationList = response.data;

            $scope.navigationList.forEach(e => addNavigationItem(e));
        })
        .catch(function (error) {
            console.error('Error fetching navigation list:', error);
            $scope.state.error = true;
            $scope.errorMessage = 'Failed to load navigation list';
        });

    function addNavigationItem(itemData) {
        if (!itemData || !itemData.label || !itemData.view || !itemData.group) {
            console.error('Invalid item data:', itemData);
            return;
        }

        const groupKey = itemData.group.toLowerCase();
        if (!$scope.groupItems[groupKey]) {
            console.error('Group key not found:', groupKey);
            return;
        }

        $scope.groupItems[itemData.group.toLowerCase()].push({
            "label": itemData.label,
            "view": itemData.view
        });
    }
}]);
