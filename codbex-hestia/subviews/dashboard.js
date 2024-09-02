const dashboard = angular.module('dashboard', ['ideUI', 'ideView']);

dashboard.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'app';
}]);

dashboard.controller('DashboardController', ['$scope', '$http', 'messageHub', function ($scope, $http, messageHub) {
    $scope.state = {
        isBusy: true,
        error: false,
        busyText: "Loading...",
    };

    // $scope.openPerspective = function (perspective) {
    //     if (perspective === 'sales-orders') {
    //         messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-orders' }, true);
    //     } else if (perspective === 'products') {
    //         messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'products' }, true);
    //     } else if (perspective === 'sales-invoices') {
    //         messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-invoices' }, true);
    //     } else {
    //         $http.get("google.com")
    //     }
    //     ;
    // }

    $http.get("http://localhost:8080/services/js/codbex-hestia/api/WidgetsExtension/WidgetService.js")
        .then(function (response) {
            debugger; // Check the response content
            $scope.widgetList = response.data;

            $scope.widgetList.forEach(e => createWidget(e));
            $scope.state.isBusy = false;
        })
        .catch(function (error) {
            debugger; // Check what went wrong if the request fails
            console.error('Error fetching widget list:', error);
            $scope.state.error = true; // Set error state if needed
            $scope.errorMessage = 'Failed to load widget list'; // Set an error message
        });

    function createWidget(widgetData) {
        // Ensure widgetData is valid
        if (!widgetData || !widgetData.id || !widgetData.link) {
            console.error('Invalid widget data:', widgetData);
            return;
        }

        // Create a container for the new widget
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'fd-col fd-col--12 fd-col-md--6 fd-col-lg--6 fd-col-xl--6';

        // Create an iframe element for the widget
        const iframe = document.createElement('iframe');
        iframe.src = widgetData.link;
        iframe.title = widgetData.label;
        iframe.className = 'tile-auto-layout'; // Apply styles
        // iframe.loading = widgetData.lazyLoad ? 'lazy' : 'eager'; // Lazy load if specified

        // Append the iframe to the container
        widgetContainer.appendChild(iframe);

        // Find the container element where widgets are inserted
        const widgetRow = document.querySelector('.fd-row');

        // Insert the new widget into the container
        if (widgetRow) {
            widgetRow.appendChild(widgetContainer);
        } else {
            console.error('Widget container not found');
        }
    }



    messageHub.onDidReceiveMessage(
        "contextmenu",
        function (msg) {
            if (msg.data === 'sales-orders') {
                messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-orders' }, true);
            } else if (msg.data === 'products') {
                messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'products' }, true);
            } else if (msg.data === 'sales-invoices') {
                messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-invoices' }, true);
            }
        }
    );
}]);