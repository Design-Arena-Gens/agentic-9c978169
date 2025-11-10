"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";

type TabKey = "professor" | "turma" | "migracao";

type Tab = {
  key: TabKey;
  label: string;
};

const TABS: Tab[] = [
  { key: "professor", label: "Vis?o por Professor" },
  { key: "turma", label: "Vis?o por Turma" },
  { key: "migracao", label: "Ferramentas de Migra??o" },
];

export default function Tabs() {
  const [active, setActive] = useState<TabKey>("professor");
  const tabsId = useId();

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = TABS.map((t) => t.key);
      const idx = keys.indexOf(active);
      if (e.key === "ArrowRight") {
        const next = keys[(idx + 1) % keys.length];
        setActive(next as TabKey);
      } else if (e.key === "ArrowLeft") {
        const prev = keys[(idx - 1 + keys.length) % keys.length];
        setActive(prev as TabKey);
      }
    },
    [active]
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "professor" || hash === "turma" || hash === "migracao") {
      setActive(hash as TabKey);
    }
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${active}`);
  }, [active]);

  const activeIndex = useMemo(
    () => TABS.findIndex((t) => t.key === active),
    [active]
  );

  return (
    <section aria-labelledby={`${tabsId}-label`}>
      <div className="hero">
        <h1 id={`${tabsId}-label`}>Seu painel central de ensino</h1>
        <p>Analise desempenho por professor, acompanhe turmas e migre dados com seguran?a.</p>
      </div>

      <div
        className="tabs card"
        role="tablist"
        aria-label="Seletor de vis?es"
        onKeyDown={onKeyDown}
      >
        {TABS.map((tab, i) => {
          const selected = active === tab.key;
          return (
            <button
              key={tab.key}
              id={`${tabsId}-tab-${tab.key}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`${tabsId}-panel-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              className="tab"
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="panel card" role="tabpanel" id={`${tabsId}-panel-${active}`} aria-labelledby={`${tabsId}-tab-${active}`}>
        {active === "professor" && <ProfessorView />}
        {active === "turma" && <TurmaView />}
        {active === "migracao" && <MigracaoView />}
      </div>
    </section>
  );
}

function ProfessorView() {
  return (
    <div id="professor">
      <h2>Vis?o por Professor</h2>
      <p className="subtitle">M?tricas, aulas, engajamento e interven??es sugeridas.</p>
      <div className="grid">
        <div className="kpi">
          <h4>M?dia Geral</h4>
          <strong>8,4</strong>
        </div>
        <div className="kpi">
          <h4>Taxa de Entrega</h4>
          <strong>92%</strong>
        </div>
        <div className="kpi">
          <h4>Alertas</h4>
          <strong>3 pendentes</strong>
        </div>
      </div>
      <div className="actions">
        <a className="button primary" href="#">Ver Relat?rios</a>
        <a className="button" href="#">Exportar CSV</a>
      </div>
    </div>
  );
}

function TurmaView() {
  return (
    <div id="turma">
      <h2>Vis?o por Turma</h2>
      <p className="subtitle">Resumo das turmas com distribui??o de notas e presen?a.</p>
      <div className="grid">
        <div className="kpi">
          <h4>Turmas Ativas</h4>
          <strong>12</strong>
        </div>
        <div className="kpi">
          <h4>Presen?a M?dia</h4>
          <strong>87%</strong>
        </div>
        <div className="kpi">
          <h4>Risco de Evas?o</h4>
          <strong>Baixo</strong>
        </div>
      </div>
      <div className="actions">
        <a className="button primary" href="#">Abrir Turmas</a>
        <a className="button" href="#">Comparar Desempenho</a>
      </div>
    </div>
  );
}

function MigracaoView() {
  return (
    <div id="migracao">
      <h2>Ferramentas de Migra??o</h2>
      <p className="subtitle">Importe e valide dados com seguran?a antes de publicar.</p>
      <div className="grid">
        <div className="kpi">
          <h4>Status</h4>
          <strong>Pronto</strong>
        </div>
        <div className="kpi">
          <h4>?ltima Migra??o</h4>
          <strong>h? 2 dias</strong>
        </div>
        <div className="kpi">
          <h4>Falhas</h4>
          <strong>0</strong>
        </div>
      </div>
      <div className="actions">
        <a className="button primary" href="#">Importar Planilha</a>
        <a className="button" href="#">Baixar Modelo</a>
      </div>
    </div>
  );
}
