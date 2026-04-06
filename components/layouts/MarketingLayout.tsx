import { ReactNode } from "react";
import { Footer, type IFooter } from "../sections/footer/Footer";
import { Header, type IHeader } from "../sections/header/Header";

interface IMarketingLayout {
  children: ReactNode;
  header: IHeader;
  footer: IFooter;
}

const MarketingLayout = ({ children, header, footer }: IMarketingLayout) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header {...header} />
      <main className="flex-1">{children}</main>
      <Footer {...footer} />
    </div>
  );
};

export default MarketingLayout;
