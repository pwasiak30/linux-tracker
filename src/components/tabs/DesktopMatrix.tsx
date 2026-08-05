/**
 * SZKIELET ZAKŁADKI — do rozbudowy w kolejnym kroku.
 * Docelowe funkcjonalności:
 *   1. Szczegółowa tabela cech DE/WM: Wayland/X11, RAM po starcie, modularność.
 *   2. Interaktywny "Wizard dopasowania" — seria pytań → rekomendacja + linki
 *      do konfiguracji (dotfiles, dokumentacja ArchWiki/Gentoo Wiki).
 */

const ENVIRONMENTS = [
  { name: 'KDE Plasma', type: 'DE', wayland: true, ramMb: '~650–900', modularity: 'Wysoka' },
  { name: 'GNOME', type: 'DE', wayland: true, ramMb: '~700–950', modularity: 'Niska (opinionated)' },
  { name: 'XFCE', type: 'DE', wayland: 'częściowe', ramMb: '~300–450', modularity: 'Średnia' },
  { name: 'LXQt', type: 'DE', wayland: 'częściowe', ramMb: '~200–300', modularity: 'Wysoka' },
  { name: 'Hyprland', type: 'WM (tiling)', wayland: true, ramMb: '~150–250', modularity: 'Bardzo wysoka' },
  { name: 'Sway', type: 'WM (tiling)', wayland: true, ramMb: '~120–200', modularity: 'Bardzo wysoka' },
  { name: 'Labwc', type: 'WM (stacking)', wayland: true, ramMb: '~100–180', modularity: 'Wysoka' },
  { name: 'Openbox', type: 'WM (stacking)', wayland: false, ramMb: '~80–150', modularity: 'Wysoka' },
]

function WaylandBadge({ v }: { v: boolean | string }) {
  if (v === true) return <span className="k-badge k-pill-good">Wayland</span>
  if (v === false) return <span className="k-badge k-pill-bad">tylko X11</span>
  return <span className="k-badge k-pill-warn">częściowe</span>
}

export default function DesktopMatrix() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="k-heading mb-2">03 — Porównywarka środowisk i WM</h2>
        <h3 className="text-2xl font-semibold text-ktext mb-2">Desktop Environment Matrix</h3>
        <p className="text-sm text-ktext-muted max-w-3xl leading-relaxed">
          Szkielet zakładki z docelową tabelą cech oraz miejscem na interaktywny wizard dopasowania
          (pytania o preferencje sterowania klawiaturą, dostępny RAM, rodzaj sprzętu). Poniżej dane
          orientacyjne — wymagają weryfikacji na docelowym sprzęcie przed publikacją.
        </p>
      </section>

      <section>
        <h3 className="k-heading mb-3">Tabela cech (dane orientacyjne)</h3>
        <div className="k-panel overflow-x-auto">
          <table className="k-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Typ</th>
                <th className="text-center">Wayland</th>
                <th className="text-center">RAM po starcie</th>
                <th>Modularność</th>
              </tr>
            </thead>
            <tbody>
              {ENVIRONMENTS.map((e) => (
                <tr key={e.name}>
                  <td className="font-mono text-ktext">{e.name}</td>
                  <td className="text-ktext-muted text-xs">{e.type}</td>
                  <td className="text-center">
                    <WaylandBadge v={e.wayland} />
                  </td>
                  <td className="text-center font-mono text-xs">{e.ramMb} MB</td>
                  <td className="text-ktext-dim text-xs">{e.modularity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="k-panel p-5">
        <h3 className="k-heading mb-3">Wizard dopasowania (placeholder)</h3>
        <div className="space-y-2 text-sm text-ktext-muted">
          <p>Planowane pytania:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs text-ktext-dim">
            <li>Czy preferujesz sterowanie głównie klawiaturą (tiling) czy myszką (stacking)?</li>
            <li>Ile RAM ma dostępny system (starszy laptop vs. nowa stacja robocza)?</li>
            <li>Czy potrzebujesz pełnego ekosystemu aplikacji (DE) czy minimalizmu (WM)?</li>
            <li>X11 czy Wayland — czy sterownik GPU w pełni wspiera Wayland?</li>
          </ol>
          <div className="pt-2">
            <span className="k-badge k-pill-warn">logika rekomendacji — w budowie</span>
          </div>
        </div>
      </section>
    </div>
  )
}
