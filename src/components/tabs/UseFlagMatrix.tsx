import { useState } from 'react'

/**
 * SZKIELET ZAKŁADKI — do rozbudowy w kolejnym kroku.
 * Docelowe funkcjonalności (patrz README §"Roadmapa zakładek"):
 *   1. Wyszukiwarka/porównywarka pakietów z opisem flag USE (np. media-video/vlc)
 *      i ich wpływem na system (systemd vs OpenRC, akceleracja sprzętowa…).
 *   2. Interaktywny generator snippetu do /etc/portage/package.use.
 *   3. Kalkulator wpływu flagi na proces kompilacji (czas budowy, zależności,
 *      czy pakiet trafia do lokalnego rebuildu pod sprzęt).
 */

const PLANNED_FLAGS = [
  { flag: 'systemd', desc: 'Integracja z systemd zamiast OpenRC (logind, journald).', impact: 'Wymiana init/serwisów' },
  { flag: 'vaapi', desc: 'Sprzętowa akceleracja wideo przez VA-API (Intel/AMD).', impact: 'Dodatkowa zależność libva' },
  { flag: 'wayland', desc: 'Wsparcie natywnego backendu Wayland zamiast wyłącznie X11.', impact: 'Wymaga wayland + protokołów' },
  { flag: 'pulseaudio', desc: 'Wsparcie dla PulseAudio/PipeWire-pulse jako backendu audio.', impact: 'Alternatywa: -alsa/-jack' },
]

export default function UseFlagMatrix() {
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const toggle = (flag: string) => setSelected((s) => ({ ...s, [flag]: !s[flag] }))
  const generated = Object.entries(selected)
    .filter(([, on]) => on)
    .map(([flag]) => `+${flag}`)
    .join(' ')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="k-heading mb-2">02 — Konfigurator i optymalizacja</h2>
        <h3 className="text-2xl font-semibold text-ktext mb-2">Gentoo Use-Flag Matrix</h3>
        <p className="text-sm text-ktext-muted max-w-3xl leading-relaxed">
          Ta zakładka jest zaplanowana jako pełna wyszukiwarka pakietów Portage z opisem flag USE,
          generatorem <code>package.use</code> oraz kalkulatorem wpływu na kompilację. Poniżej wersja
          szkieletowa prezentująca układ UI i przykładowe dane — do podłączenia pod realną bazę
          <code> flag-description</code> z drzewa Portage (<code>/var/db/repos/gentoo/profiles/use.desc</code>).
        </p>
      </section>

      <section className="k-panel p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            disabled
            placeholder="Szukaj pakietu, np. media-video/vlc (wkrótce)"
            className="flex-1 min-w-[220px] bg-kbg border border-kbg-border rounded-sm px-3 py-2 text-sm text-ktext-dim placeholder:text-ktext-dim cursor-not-allowed"
          />
          <span className="k-badge k-pill-warn">w budowie</span>
        </div>
      </section>

      <section>
        <h3 className="k-heading mb-3">Przykładowe flagi USE i ich wpływ</h3>
        <div className="k-panel overflow-x-auto">
          <table className="k-table">
            <thead>
              <tr>
                <th className="w-10"></th>
                <th>Flaga</th>
                <th>Opis</th>
                <th>Wpływ na system</th>
              </tr>
            </thead>
            <tbody>
              {PLANNED_FLAGS.map((f) => (
                <tr key={f.flag}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={!!selected[f.flag]}
                      onChange={() => toggle(f.flag)}
                      className="accent-kamber"
                    />
                  </td>
                  <td className="font-mono text-kamber-bright">{f.flag}</td>
                  <td className="text-ktext-muted">{f.desc}</td>
                  <td className="text-ktext-dim text-xs">{f.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="k-heading mb-3">Generator package.use (podgląd koncepcji)</h3>
        <div className="k-panel p-4">
          <p className="text-xs text-ktext-dim mb-2">
            Zaznacz flagi powyżej — snippet do wklejenia w{' '}
            <code>/etc/portage/package.use/custom</code> pojawi się poniżej.
          </p>
          <pre className="bg-kbg border border-kbg-border rounded-sm p-3 text-xs overflow-x-auto text-ktext min-h-[3rem]">
{`media-video/vlc ${generated || '# zaznacz flagi powyżej'}`}
          </pre>
        </div>
      </section>
    </div>
  )
}
