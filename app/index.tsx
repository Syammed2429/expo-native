import * as React from "react";
import { View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { ExpoRadialChartView } from "../modules/expo-radial-chart";

export default function Screen() {
  const [chartData, setChartData] = React.useState([
    { color: "#ff6b6b", percentage: 35 },
    { color: "#4ecdc4", percentage: 25 },
    { color: "#45b7d1", percentage: 40 },
  ]);
  const [selectedSegment, setSelectedSegment] = React.useState<number | null>(
    null
  );

  function handleSegmentSelect(event: {
    index: number;
    percentage: number;
    color: string;
  }) {
    setSelectedSegment(event.index);
  }
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      {/* Native Radial Chart Implementation */}
      <Card className='w-full max-w-sm p-6 rounded-2xl'>
        <CardHeader className='items-center pb-4'>
          <CardTitle className='text-center'>Native Radial Chart</CardTitle>
          <CardDescription className='text-center'>
            Using MPAndroidChart & DGCharts
          </CardDescription>
        </CardHeader>
        <CardContent className='items-center'>
          <View className='w-48 h-48 mb-4'>
            <ExpoRadialChartView
              style={{ flex: 1 }}
              data={chartData}
              onSegmentSelect={handleSegmentSelect}
            />
          </View>
          <View className='flex-row justify-around w-full'>
            <View className='items-center'>
              <View
                className={`w-4 h-4 rounded-full bg-[#ff6b6b] mb-1 ${
                  selectedSegment === 0 ? "ring-2 ring-foreground" : ""
                }`}
              />
              <Text className='text-xs text-muted-foreground'>Research</Text>
              <Text
                className={`text-sm font-semibold ${
                  selectedSegment === 0 ? "text-foreground" : ""
                }`}
              >
                {chartData[0].percentage}%
              </Text>
            </View>
            <View className='items-center'>
              <View
                className={`w-4 h-4 rounded-full bg-[#4ecdc4] mb-1 ${
                  selectedSegment === 1 ? "ring-2 ring-foreground" : ""
                }`}
              />
              <Text className='text-xs text-muted-foreground'>Inventions</Text>
              <Text
                className={`text-sm font-semibold ${
                  selectedSegment === 1 ? "text-foreground" : ""
                }`}
              >
                {chartData[1].percentage}%
              </Text>
            </View>
            <View className='items-center'>
              <View
                className={`w-4 h-4 rounded-full bg-[#45b7d1] mb-1 ${
                  selectedSegment === 2 ? "ring-2 ring-foreground" : ""
                }`}
              />
              <Text className='text-xs text-muted-foreground'>Adventures</Text>
              <Text
                className={`text-sm font-semibold ${
                  selectedSegment === 2 ? "text-foreground" : ""
                }`}
              >
                {chartData[2].percentage}%
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
