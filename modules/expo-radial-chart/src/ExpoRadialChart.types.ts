import { ViewStyle } from "react-native/types";

export type ChangeEventPayload = {
  value: string;
};

export type SegmentSelectEventPayload = {
  index: number;
  percentage: number;
  color: string;
};

export type ExpoRadialChartModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
  onSegmentSelect: (params: SegmentSelectEventPayload) => void;
};

export type Series = {
  color: string;
  percentage: number;
};

export type ExpoRadialChartViewProps = {
  style?: ViewStyle;
  data: Series[];
  onSegmentSelect?: (event: SegmentSelectEventPayload) => void;
};
