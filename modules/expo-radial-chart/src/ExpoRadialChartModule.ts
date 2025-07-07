import { NativeModule, requireNativeModule } from "expo";

import { ExpoRadialChartModuleEvents } from "./ExpoRadialChart.types";

declare class ExpoRadialChartModule extends NativeModule<ExpoRadialChartModuleEvents> {
  // This module primarily exposes the view component
  // Native methods are handled through the view props
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoRadialChartModule>("ExpoRadialChart");
