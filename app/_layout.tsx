import "~/global.css";

import { Stack } from "expo-router";
import * as React from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: "Starter Base",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
