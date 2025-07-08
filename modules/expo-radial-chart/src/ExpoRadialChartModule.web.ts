import { NativeModule } from "expo";

import { ExpoRadialChartModuleEvents } from "./ExpoRadialChart.types";

class ExpoRadialChartModule extends NativeModule<ExpoRadialChartModuleEvents> {
  // Web fallback - empty implementation
}

// For web, return an empty module
export default new ExpoRadialChartModule();
