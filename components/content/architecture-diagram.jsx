"use client";

import { useState } from "react";
import { ArrowDown, Network } from "lucide-react";

const scenarios = {
  en: [
    {
      id: "answer", title: "Submit an answer", badge: "Authoritative state",
      description: "A submitted guess reaches the room process before the shared interface updates.",
      steps: [
        ["Player browser", "The answer form submits a guess through the LiveView connection."],
        ["PlayerLive", "The event handler calls Game.submit_guess with the room and player identity."],
        ["Game GenServer", "The room process evaluates the guess and updates the authoritative game state."],
        ["PubSub → LiveViews", "State updates reach subscribed views, which render the shared result."]
      ]
    },
    {
      id: "typing", title: "Show typing", badge: "Visual activity",
      description: "Text previews take a separate path. They do not decide the score or round state.",
      steps: [
        ["Browser hook", "Client-side throttling limits frequent typing updates before sending them."],
        ["TypingChannel", "The channel normalizes the compact typing payload and broadcasts it to other subscribers."],
        ["Channel subscribers", "Connected browsers receive the visual update without a game-state transition."],
        ["Bubble renderer", "Browser code updates the typing bubbles outside the LiveView diff loop."]
      ]
    },
    {
      id: "presence", title: "Track a player", badge: "Room occupancy",
      description: "Joining a room also needs shared knowledge of players and reserved colors.",
      steps: [
        ["PlayerLive", "The entry flow tracks the player and the selected identity for the room."],
        ["RoomPresence", "Room-specific helpers manage player and color tracking through Phoenix Presence."],
        ["Phoenix Presence", "Presence notifications communicate changes in connected occupancy."],
        ["Subscribed views", "The interface updates its view of the players in the room."]
      ]
    }
  ],
  "pt-BR": [
    {
      id: "answer", title: "Enviar resposta", badge: "Estado autoritativo",
      description: "Um palpite chega ao processo da sala antes de atualizar a interface compartilhada.",
      steps: [
        ["Navegador do jogador", "O formulário envia o palpite pela conexão LiveView."],
        ["PlayerLive", "O handler chama Game.submit_guess com a identificação da sala e do jogador."],
        ["Game GenServer", "O processo da sala avalia o palpite e atualiza o estado autoritativo do jogo."],
        ["PubSub → LiveViews", "As atualizações chegam às views inscritas, que renderizam o resultado compartilhado."]
      ]
    },
    {
      id: "typing", title: "Mostrar digitação", badge: "Atividade visual",
      description: "Previews de texto seguem outro caminho. Eles não decidem o placar ou a fase da rodada.",
      steps: [
        ["Hook no navegador", "O throttle no cliente limita atualizações frequentes antes do envio."],
        ["TypingChannel", "O channel normaliza o payload compacto e o transmite aos outros inscritos."],
        ["Inscritos no channel", "Navegadores conectados recebem a atualização visual sem uma transição do jogo."],
        ["Renderizador de balões", "O código no navegador atualiza os balões fora do ciclo de diffs do LiveView."]
      ]
    },
    {
      id: "presence", title: "Acompanhar jogador", badge: "Ocupação da sala",
      description: "Entrar em uma sala também exige compartilhar quais jogadores e cores estão presentes.",
      steps: [
        ["PlayerLive", "O fluxo de entrada acompanha o jogador e a identidade escolhida para a sala."],
        ["RoomPresence", "Helpers da sala gerenciam jogadores e cores pelo Phoenix Presence."],
        ["Phoenix Presence", "Notificações de presença comunicam mudanças na ocupação conectada."],
        ["Views inscritas", "A interface atualiza sua visão dos jogadores presentes na sala."]
      ]
    }
  ]
};

export function ArchitectureDiagram({ locale = "en" }) {
  const pt = locale === "pt-BR";
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const items = scenarios[locale] || scenarios.en;
  const scenario = items[scenarioIndex];

  return (
    <section className="p-4 sm:p-5" aria-label={pt ? "Arquitetura interativa do Live Trivia" : "Interactive Live Trivia architecture"}>
      <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-accent-300"><Network size={17} aria-hidden="true" />{pt ? "Siga uma interação" : "Follow an interaction"}</div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={pt ? "Escolher interação" : "Choose interaction"}>
        {items.map((item, index) => (
          <button type="button" key={item.id} aria-pressed={scenarioIndex === index}
            onClick={() => { setScenarioIndex(index); setStepIndex(0); }}
            className={`min-h-10 rounded border px-3 py-2 text-xs transition ${scenarioIndex === index ? "border-accent-400 bg-accent-500/15 text-accent-300" : "border-workbench-600 text-ink-200 hover:border-accent-400"}`}>
            {item.title}
          </button>
        ))}
      </div>
      <p className="mb-4 text-sm leading-6 text-ink-200">{scenario.description}</p>
      <ol className="grid" aria-label={pt ? "Caminho da mensagem" : "Message path"}>
        {scenario.steps.map(([name], index) => (
          <li key={`${scenario.id}-${name}`}>
            <button type="button" aria-pressed={stepIndex === index} aria-controls="architecture-detail" onClick={() => setStepIndex(index)}
              className={`flex min-h-12 w-full items-center gap-3 rounded border px-4 py-3 text-left transition ${stepIndex === index ? "border-accent-400 bg-accent-500/10" : "border-workbench-700 bg-workbench-950 hover:border-workbench-600"}`}>
              <span className="font-mono text-xs text-accent-300">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm font-semibold text-ink-100">{name}</span>
            </button>
            {index < scenario.steps.length - 1 && <ArrowDown size={18} className="mx-auto my-1 text-accent-400" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div id="architecture-detail" className="mt-4 min-h-28 border-l-2 border-accent-400 pl-4" aria-live="polite" aria-atomic="true">
        <p className="mb-2 font-mono text-xs text-accent-300">{scenario.badge} · {stepIndex + 1}/{scenario.steps.length}</p>
        <p className="text-sm leading-6 text-ink-200">{scenario.steps[stepIndex][1]}</p>
      </div>
      <p className="mt-4 border-t border-workbench-700 pt-3 text-xs leading-5 text-ink-300">
        {pt ? "Modelo explicativo simplificado da implementação. Não é telemetria ao vivo." : "A simplified explanatory model of the implementation. Not live telemetry."}
      </p>
    </section>
  );
}
