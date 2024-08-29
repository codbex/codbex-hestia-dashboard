import { extensions } from "sdk/extensions";
import { response } from "sdk/http";

const widgetList = [];
const widgetExtensions = extensions.getExtensions("portal-widgets");



for (let i = 0; i < widgetExtensions.length; i++) {
    const extensionPath = widgetExtensions[i];

    console.log("test2: " + extensionPath);

    console.log("test2: " + `../../../${extensionPath}`);

    const { getWidget } = await import(`../../../${extensionPath}`);

    console.log(typeof getWidget);

    const widget = getWidget();
    widgetList.push(widget);
}

response.println("hello " + JSON.stringify(widgetList));
console.log("test");
