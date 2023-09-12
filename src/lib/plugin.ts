import plugin from "tailwindcss/plugin";
import {PluginAPI} from "tailwindcss/types/config";

export default plugin((api: PluginAPI) => {
    console.log(api);
})
