import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ThemeProvider, { useTheme } from "./context/ThemeContext";
import Colors from "../constants/Colors";

function RootLayoutNav() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarColor: isDark
            ? Colors["dark"].background
            : Colors["light"].background,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
