import { extensions } from "sdk/extensions";
import { response } from "sdk/http";

const widgetList = [];
const widgetExtensions = extensions.getExtensions("portal-widgets");

for (let i = 0; i < widgetExtensions.length; i++) {
    const extensionPath = widgetExtensions[i];

    let path = `../../../${extensionPath}`;

    const { getWidget } = await import(path);

    console.log("test " + path)

    console.log("test " + typeof getWidget)

    const widget = getWidget();
    widgetList.push(widget);
}

response.println(JSON.stringify(widgetList));
