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
    <view className="flex h-screen flex-col pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
      <view className="bg-red-200 px-10">
        <text>hello what are you doing</text>
      </view>
    </view>
  );
}
