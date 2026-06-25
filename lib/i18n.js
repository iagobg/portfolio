export const DEFAULT_LOCALE = "en";
export const PT_BR = "pt-BR";
export const LOCALES = [DEFAULT_LOCALE, PT_BR];

export const localeLabels = {
  en: "EN",
  "pt-BR": "PT-BR"
};

export const dictionaries = {
  en: {
    languageName: "English",
    home: "Home",
    projects: "Projects",
    search: "Search",
    github: "GitHub",
    explorer: "Explorer",
    allProjects: "all-projects",
    openCommandPalette: "Open command palette",
    searchWorkspace: "Search workspace...",
    openExplorer: "Open explorer",
    hideExplorer: "Hide explorer",
    showExplorer: "Show explorer",
    featuredProjects: "Featured projects",
    openArchive: "Open archive",
    viewProjects: "View Projects",
    technicalFocus: "Technical focus",
    projectArchive: "Project archive",
    projectArchiveIntro:
      "Search and filter the portfolio by real project metadata. Multiple selected tags use intersection matching.",
    filters: "Filters",
    filterSummary: (count) => `${count} result${count === 1 ? "" : "s"} using intersection tag matching`,
    reset: "Reset",
    searchProjects: "Search projects",
    searchPlaceholder: "Search title, description, tags...",
    noProjects: "No projects match the current query.",
    openCaseStudy: "Open case study",
    deploymentSoon: "Deployment coming soon",
    source: "Source",
    live: "Live",
    screenshots: "Screenshots",
    previous: "Previous",
    next: "Next",
    outline: "Outline",
    backProjects: "../projects",
    unresolvedFile: "unresolved-file",
    projectNotFound: "Project not found",
    notFoundCopy: "This route does not match a project MDX file or portfolio page.",
    backToProjects: "Back to projects",
    nextStep: "Next step",
    mdxAddCopy:
      "Explore the case studies as project files. Each page is generated from MDX, so new work can be added by creating a new content file and dropping screenshots into the matching public folder.",
    heroCopy:
      "Software developer building real-time applications, backend systems, and practical AI-assisted products.",
    focusCards: [
      ["01", "Real-time systems", "Synchronized interfaces, server-owned state, and multi-user event flow."],
      ["02", "Backend architecture", "Practical data flow, clear ownership boundaries, and deployable services."],
      ["03", "Grounded AI products", "LLM features tied to structured data, deterministic ranking, and honest outputs."]
    ],
    commands: {
      goHome: "Go to Home",
      viewAllProjects: "View all projects",
      openGithub: "Open GitHub",
      openProject: (title) => `Open ${title}`,
      filterBy: (tag) => `Filter by ${tag}`,
      placeholder: "Go to page, project, or tag...",
      noMatch: "No matching command."
    }
  },
  "pt-BR": {
    languageName: "Português",
    home: "Início",
    projects: "Projetos",
    search: "Busca",
    github: "GitHub",
    explorer: "Explorador",
    allProjects: "todos-os-projetos",
    openCommandPalette: "Abrir paleta de comandos",
    searchWorkspace: "Buscar no workspace...",
    openExplorer: "Abrir explorador",
    hideExplorer: "Ocultar explorador",
    showExplorer: "Mostrar explorador",
    featuredProjects: "Projetos em destaque",
    openArchive: "Abrir arquivo",
    viewProjects: "Ver projetos",
    technicalFocus: "Foco técnico",
    projectArchive: "Arquivo de projetos",
    projectArchiveIntro:
      "Busque e filtre o portfólio por metadados reais dos projetos. Várias tags selecionadas usam correspondência por interseção.",
    filters: "Filtros",
    filterSummary: (count) => `${count} resultado${count === 1 ? "" : "s"} usando interseção de tags`,
    reset: "Limpar",
    searchProjects: "Buscar projetos",
    searchPlaceholder: "Buscar título, descrição, tags...",
    noProjects: "Nenhum projeto corresponde à busca atual.",
    openCaseStudy: "Abrir estudo de caso",
    deploymentSoon: "Deploy em breve",
    source: "Código",
    live: "Ao vivo",
    screenshots: "Capturas de tela",
    previous: "Anterior",
    next: "Próximo",
    outline: "Sumário",
    backProjects: "../projetos",
    unresolvedFile: "arquivo-nao-resolvido",
    projectNotFound: "Projeto não encontrado",
    notFoundCopy: "Esta rota não corresponde a um arquivo MDX de projeto ou página do portfólio.",
    backToProjects: "Voltar para projetos",
    nextStep: "Próximo passo",
    mdxAddCopy:
      "Explore os estudos de caso como arquivos de projeto. Cada página é gerada a partir de MDX, então novos trabalhos podem ser adicionados criando um arquivo de conteúdo e colocando imagens na pasta pública correspondente.",
    heroCopy:
      "Desenvolvedor de software criando aplicações em tempo real, sistemas backend e produtos práticos assistidos por IA.",
    focusCards: [
      ["01", "Sistemas em tempo real", "Interfaces sincronizadas, estado autoritativo no servidor e fluxo multiusuário."],
      ["02", "Arquitetura backend", "Fluxo de dados claro, limites de responsabilidade e serviços fáceis de publicar."],
      ["03", "Produtos de IA fundamentados", "Recursos com LLM ligados a dados estruturados, ranking determinístico e saídas honestas."]
    ],
    commands: {
      goHome: "Ir para início",
      viewAllProjects: "Ver todos os projetos",
      openGithub: "Abrir GitHub",
      openProject: (title) => `Abrir ${title}`,
      filterBy: (tag) => `Filtrar por ${tag}`,
      placeholder: "Ir para página, projeto ou tag...",
      noMatch: "Nenhum comando encontrado."
    }
  }
};

export function dictionary(locale = DEFAULT_LOCALE) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

export function localePrefix(locale = DEFAULT_LOCALE) {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function getLocaleFromPath(pathname = "/") {
  return pathname === `/${PT_BR}` || pathname.startsWith(`/${PT_BR}/`) ? PT_BR : DEFAULT_LOCALE;
}

export function stripLocale(pathname = "/") {
  if (pathname === `/${PT_BR}`) return "/";
  if (pathname.startsWith(`/${PT_BR}/`)) return pathname.slice(PT_BR.length + 1) || "/";
  return pathname;
}

export function localizePath(pathname = "/", locale = DEFAULT_LOCALE) {
  const stripped = stripLocale(pathname);
  if (locale === DEFAULT_LOCALE) return stripped || "/";
  return `${localePrefix(locale)}${stripped === "/" ? "" : stripped}`;
}

export function switchLocalePath(pathname = "/", nextLocale = DEFAULT_LOCALE) {
  return localizePath(stripLocale(pathname), nextLocale);
}
