import { useState } from 'react'
import type { ComponentType } from 'react'
import RollingTracker from './components/tabs/RollingTracker'
import UseFlagMatrix from './components/tabs/UseFlagMatrix'
import DesktopMatrix from './components/tabs/DesktopMatrix'
import KernelExplorer from './components/tabs/KernelExplorer'

export type TabId = 'rolling' | 'useflags' | 'desktop' | 'kernel'

interface TabDef {
  id: TabId
  label: string
  shortLabel: string
  description: string
  component: ComponentType
}

const TABS: TabDef[] = [
  {
    id: 'rolling',
    label: 'Linux Rolling Tracker',
    shortLabel: 'Rolling Tracker',
    description: 'Monitor aktualizacji pakietów w dystrybucjach rolling-release',
    component: RollingTracker,
  },
  {
    id: 'useflags',
    label: 'Gentoo Use-Flag Matrix',
    shortLabel: 'USE-Flag Matrix',
    description: 'Konfigurator i optymalizacja flag USE',
    component: UseFlagMatrix,
  },
  {
    id: 'desktop',
    label: 'Desktop Environment Matrix',
    shortLabel: 'DE Matrix',
    description: 'Porównywarka środowisk graficznych i WM',
    component: DesktopMatrix,
  },
  {
    id: 'kernel',
    label: 'Kernel Config & Feature Explorer',
    shortLabel: 'Kernel Explorer',
    description: 'Przewodnik po konfiguracji jądra Linux',
    component: KernelExplorer,
  },
]

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('rolling')
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0]
  const ActiveComponent = active.component

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header, kernel.org-style: skromny, gęsty informacyjnie ── */}
      <header className="border-b border-kbg-border bg-kbg-panel">
        <div className="mx-auto max-w-[1400px] px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-kamber shrink-0" aria-hidden="true">
              <path
                d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M12 2v20M3 7l9 5 9-5M3 17l9-5 9 5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
            <div>
              <h1 className="font-mono text-lg font-semibold text-ktext tracking-tight">
                Linux<span className="text-kamber">Rolling</span>Hub
              </h1>
              <p className="text-xs text-ktext-dim -mt-0.5">
                praktyczne dane o rolling-release, USE-flagach, DE i jądrze
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-xs font-mono text-ktext-muted">
            <a href="#rolling" onClick={() => setActiveTab('rolling')} className="hover:text-kamber">
              status pakietów
            </a>
            <span className="text-kbg-border">/</span>
            <a
              href="https://www.kernel.org/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-kamber"
            >
              kernel.org ↗
            </a>
          </nav>
        </div>
      </header>

      {/* ── Pasek zakładek ── */}
      <div className="border-b border-kbg-border bg-kbg sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-kbg/95">
        <div className="mx-auto max-w-[1400px] px-4">
          <div role="tablist" aria-label="Sekcje serwisu" className="flex flex-wrap gap-0.5 -mb-px">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'px-4 py-2.5 text-sm font-mono border-b-2 transition-colors whitespace-nowrap',
                    isActive
                      ? 'border-kamber text-kamber bg-kbg-panel'
                      : 'border-transparent text-ktext-muted hover:text-ktext hover:bg-kbg-panel/50',
                  ].join(' ')}
                >
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Opis aktywnej zakładki ── */}
      <div className="border-b border-kbg-border bg-kbg-panel/40">
        <div className="mx-auto max-w-[1400px] px-4 py-2">
          <p className="text-xs text-ktext-dim font-mono">// {active.description}</p>
        </div>
      </div>

      {/* ── Treść ── */}
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-4 py-6">
        <ActiveComponent />
      </main>

      {/* ── Stopka ── */}
      <footer className="border-t border-kbg-border bg-kbg-panel mt-8">
        <div className="mx-auto max-w-[1400px] px-4 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-ktext-dim font-mono">
          <span>Linux Rolling Hub — prototyp UI, dane pakietów przykładowe (mock)</span>
          <span>inspirowane układem informacyjnym kernel.org i DistroWatch</span>
        </div>
      </footer>
    </div>
  )
}

export default App
