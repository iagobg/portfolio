import { HomePage } from "@/components/content/home-page";
import { siteConfig, absoluteUrl } from "@/lib/metadata";

export const metadata = {
  title: "README.md - Iago Bussoletti",
  description:
    "Desenvolvedor de software criando aplicações em tempo real, sistemas backend e produtos práticos assistidos por IA.",
  alternates: {
    canonical: absoluteUrl("/pt-BR")
  }
};

export default function HomePagePtBr() {
  return <HomePage locale="pt-BR" />;
}
