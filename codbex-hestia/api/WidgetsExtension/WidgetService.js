import { extensions } from "sdk/extensions";
import { response } from "sdk/http";

const { getWidget } = await import("../../../codbex-orders-widgets/services/average-sales-order-price.js");
console.log(typeof getWidget);

const widgetList = [];
const widgetExtensions = extensions.getExtensions("portal-widgets");

for (let i = 0; i < widgetExtensions.length; i++) {
    const extensionPath = widgetExtensions[i];

    let path = `../../../${extensionPath}`;
    // let path = "../../../codbex-orders-widgets/services/average-sales-order-price.js";
    console.log("test2: " + extensionPath);

    console.log("test2: " + path);

    const { getWidget } = await import(path);

    console.log(typeof getWidget);

    const widget = getWidget();
    widgetList.push(widget);
}

response.println("hello " + JSON.stringify(widgetList));
console.log("test");
