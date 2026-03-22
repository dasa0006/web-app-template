import { ReactNode } from "react";
import { Footer } from "../sections/footer/Footer";
import { mockFooterMinimal } from "../sections/footer/Footer.mocks";
import { Header } from "../sections/header/Header";
import { mockHeaderMinimal } from "../sections/header/Header.mocks";

interface IMarketingLayout {
  children: ReactNode;
}

/**
 * This Layout component implements a more opinionated structure
 * compared to what might be required for a highly stylized
 * landing page layout.
 */
const MarketingLayout = ({ children }: IMarketingLayout) => {
  return (
    <>
      <Header {...mockHeaderMinimal} />
      <main>{children}</main>
      <Footer {...mockFooterMinimal} />
    </>
  );
};

export default MarketingLayout;
