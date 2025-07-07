import * as React from "react";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Info } from "~/lib/icons/Info";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ExpoRadialChartView } from "../modules/expo-radial-chart";

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Screen() {
  const [progress, setProgress] = React.useState(78);
  const [chartData, setChartData] = React.useState([
    { color: "#ff6b6b", percentage: 35 },
    { color: "#4ecdc4", percentage: 25 },
    { color: "#45b7d1", percentage: 40 },
  ]);
  const [selectedSegment, setSelectedSegment] = React.useState<number | null>(
    null
  );

  function updateProgressValue() {
    const newProgress = Math.floor(Math.random() * 100);
    setProgress(newProgress);

    // Update chart data with random values that sum to 100
    const value1 = Math.floor(Math.random() * 60) + 10;
    const value2 = Math.floor(Math.random() * (90 - value1)) + 5;
    const value3 = 100 - value1 - value2;

    setChartData([
      { color: "#ff6b6b", percentage: value1 },
      { color: "#4ecdc4", percentage: value2 },
      { color: "#45b7d1", percentage: value3 },
    ]);
    setSelectedSegment(null); // Clear selection when data updates
  }

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
