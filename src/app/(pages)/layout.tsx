import * as React from "react";
import { StoreProvider } from "@/store/StoreProvider";
import ScrollTopButton from "@/components/Layout/ScrollTop";
import Copyright from "@/components/Layout/Copyright";
import Notification from "@/components/Notification";
import Header from "@/components/Layout/Header";

export default function PageLayout(props: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Header />
      <Notification />
      {props.children}
      <Copyright />
      <ScrollTopButton />
    </StoreProvider>
  );
}
