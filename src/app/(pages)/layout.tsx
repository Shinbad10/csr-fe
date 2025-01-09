import Header from "@/components/Header";
import * as React from "react";
import { StoreProvider } from "@/store/StoreProvider";

export default function PageLayout(props: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Header />
      {props.children}
    </StoreProvider>
  );
}
