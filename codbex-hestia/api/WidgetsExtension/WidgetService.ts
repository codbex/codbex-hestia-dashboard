import { extensions } from "sdk/extensions";
import { response } from "sdk/http";

const widgetList = [];
const widgetExtensions = extensions.getExtensions("portal-widgets");
for (let i = 0; i < widgetExtensions.length; i++) {
    const extensionPath = widgetExtensions[i];

    const { getWidget } = await import(`../../../${extensionPath}`);
    const widget = getWidget();
    widgetList.push(widget);
    debugger
}

response.println(JSON.stringify(widgetList));
