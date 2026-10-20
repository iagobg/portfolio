import { HomePage } from "@/components/content/home-page";
import { siteConfig, absoluteUrl } from "@/lib/metadata";

export const metadata = {
  title: "README.md - Iago Bussoletti",
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/en")
  }
};

export default function HomePageEn() {
  return <HomePage locale="en" />;
}
