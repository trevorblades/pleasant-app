import { useCallback, useEffect, useState } from "@lynx-js/react";
import "./App.css";

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);

  useEffect(() => {
    console.info("Hello, ReactLynx");
  }, []);

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo((prevAlterLogo) => !prevAlterLogo);
  }, []);

  return (
    <view className="flex h-screen flex-col p-safe">
      <view className="flex h-12 items-center justify-center border-b">
        <text>hello what are you doings</text>
      </view>
    </view>
  );
}
