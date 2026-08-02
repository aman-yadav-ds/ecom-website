import { Metadata } from "next";
import AboutUsPage from "../about/page";

// URL alias for /about. Suppressed from indexing to prevent duplicate content.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default AboutUsPage;
