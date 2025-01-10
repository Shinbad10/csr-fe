import Header from "@/components/Layout/Header";
import * as React from "react";
import { StoreProvider } from "@/store/StoreProvider";
import ScrollTopButton from "@/components/Layout/ScrollTop";
import Copyright from "@/components/Layout/Copyright";

export default function PageLayout(props: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Header />
      {props.children}
      <Copyright />
      <ScrollTopButton />
    </StoreProvider>
  );
}
