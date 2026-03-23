import { FOOTER_CONFIG, HEADER_CONFIG } from "@/config/site.config";
import { ReactNode } from "react";
import { Footer } from "../sections/footer/Footer";
import { Header } from "../sections/header/Header";

interface IMarketingLayout {
  children: ReactNode;
}

const MarketingLayout = ({ children }: IMarketingLayout) => {
  return (
    <>
      <Header {...HEADER_CONFIG} />
      <main>{children}</main>
      <Footer {...FOOTER_CONFIG} />
    </>
  );
};

export default MarketingLayout;
