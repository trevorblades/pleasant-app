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
    <view className="flex flex-col items-center justify-center">
      <view className="bg-red-200 px-10">
        <text>hello what are you doing</text>
      </view>
    </view>
  );
}
