import { Fragment, useMemo, useState } from 'react'
import { DISTROS, LAG_THRESHOLDS, TRACKED_PACKAGES } from '../../data/rollingData'
import type { DistroId, PackageVersionEntry } from '../../types'

function lagPillClass(lagDays: number): string {
  if (lagDays <= LAG_THRESHOLDS.good) return 'k-pill-good'
  if (lagDays <= LAG_THRESHOLDS.warn) return 'k-pill-warn'
  return 'k-pill-bad'
}

function lagBarClass(lagDays: number): string {
  if (lagDays <= LAG_THRESHOLDS.good) return 'bg-kgood'
  if (lagDays <= LAG_THRESHOLDS.warn) return 'bg-kwarn'
  return 'bg-kbad'
}

function BuildModeBadge({ mode }: { mode: PackageVersionEntry['buildMode'] }) {
  const labels: Record<PackageVersionEntry['buildMode'], string> = {
    source: 'źródła',
    binary: 'binarka',
    hybrid: 'hybryda',
  }
  const cls: Record<PackageVersionEntry['buildMode'], string> = {
    source: 'k-pill-good',
    binary: 'border-ksteel/40 bg-ksteel/10 text-ksteel-bright',
    hybrid: 'k-pill-warn',
  }
  return <span className={`k-badge ${cls[mode]}`}>{labels[mode]}</span>
}

export default function RollingTracker() {
  const [query, setQuery] = useState('')
  const [distroFilter, setDistroFilter] = useState<DistroId | 'all'>('all')

  const categories = useMemo(
    () => Array.from(new Set(TRACKED_PACKAGES.map((p) => p.category))),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TRACKED_PACKAGES.filter((pkg) => {
      if (!q) return true
      return (
        pkg.name.toLowerCase().includes(q) ||
        pkg.category.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q)
      )
    })
  }, [query])

  const maxLag = useMemo(
    () =>
      Math.max(
        1,
        ...TRACKED_PACKAGES.flatMap((p) => Object.values(p.versions).map((v) => v.lagDays)),
      ),
    [],
  )

  const visibleDistros = distroFilter === 'all' ? DISTROS : DISTROS.filter((d) => d.id === distroFilter)

  return (
    <div className="space-y-10">
      {/* ── Intro ── */}
      <section>
        <h2 className="k-heading mb-2">01 — Monitor aktualizacji</h2>
        <h3 className="text-2xl font-semibold text-ktext mb-2">Linux Rolling Tracker</h3>
        <p className="text-sm text-ktext-muted max-w-3xl leading-relaxed">
          Poniższa tabela porównuje wersje kluczowych komponentów systemu w trzech popularnych
          dystrybucjach rolling-release: <strong className="text-ktext">Gentoo</strong> (~amd64),{' '}
          <strong className="text-ktext">Arch Linux</strong> ([core]/[extra]) oraz{' '}
          <strong className="text-ktext">openSUSE Tumbleweed</strong>. Dla każdego pakietu widoczne jest
          opóźnienie (<em>lag</em>) względem najnowszego wydania upstream — czyli realny czas, jaki
          mija zanim nowa wersja trafi do gałęzi stabilnej danej dystrybucji.
        </p>
      </section>

      {/* ── Filtry ── */}
      <section className="k-panel p-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj pakietu, kategorii, opisu…"
          className="flex-1 min-w-[220px] bg-kbg border border-kbg-border rounded-sm px-3 py-2 text-sm text-ktext placeholder:text-ktext-dim focus:outline-none focus:border-kamber/60"
        />
        <div className="flex items-center gap-1 text-xs font-mono">
          <span className="text-ktext-dim mr-1">dystrybucja:</span>
          <button
            onClick={() => setDistroFilter('all')}
            className={`px-2 py-1 rounded-sm border ${
              distroFilter === 'all'
                ? 'border-kamber text-kamber bg-kamber/10'
                : 'border-kbg-border text-ktext-muted hover:text-ktext'
            }`}
          >
            wszystkie
          </button>
          {DISTROS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDistroFilter(d.id)}
              className={`px-2 py-1 rounded-sm border ${
                distroFilter === d.id
                  ? 'border-kamber text-kamber bg-kamber/10'
                  : 'border-kbg-border text-ktext-muted hover:text-ktext'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── Tabela porównawcza ── */}
      <section>
        <h3 className="k-heading mb-3">Tabela wersji komponentów</h3>
        <div className="k-panel overflow-x-auto">
          <table className="k-table">
            <thead>
              <tr>
                <th rowSpan={2} className="align-middle">
                  Pakiet
                </th>
                {visibleDistros.map((d) => (
                  <th key={d.id} colSpan={3} className={`text-center ${d.color}`}>
                    {d.name}
                  </th>
                ))}
              </tr>
              <tr>
                {visibleDistros.map((d) => (
                  <Fragment key={d.id}>
                    <th className="text-center">wersja</th>
                    <th className="text-center">lag</th>
                    <th className="text-center">build</th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((pkg) => (
                <tr key={pkg.id}>
                  <td>
                    <div className="font-mono text-sm text-ktext">{pkg.name}</div>
                    <div className="text-xs text-ktext-dim">{pkg.category}</div>
                  </td>
                  {visibleDistros.map((d) => {
                    const v = pkg.versions[d.id]
                    return (
                      <Fragment key={d.id}>
                        <td className="text-center font-mono text-sm">
                          {v.current}
                          {v.current !== v.upstream && (
                            <div className="text-[10px] text-ktext-dim">upstream {v.upstream}</div>
                          )}
                        </td>
                        <td className="text-center">
                          <span className={`k-badge ${lagPillClass(v.lagDays)}`}>{v.lagDays} d</span>
                        </td>
                        <td className="text-center">
                          <BuildModeBadge mode={v.buildMode} />
                        </td>
                      </Fragment>
                    )
                  })}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={1 + visibleDistros.length * 3} className="text-center text-ktext-dim py-6">
                    Brak pakietów pasujących do zapytania „{query}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ktext-dim mt-2">
          Legenda lag: <span className="k-badge k-pill-good">≤ {LAG_THRESHOLDS.good} d</span>{' '}
          <span className="k-badge k-pill-warn">≤ {LAG_THRESHOLDS.warn} d</span>{' '}
          <span className="k-badge k-pill-bad">&gt; {LAG_THRESHOLDS.warn} d</span> — liczone od daty
          wydania upstream do momentu trafienia do gałęzi stabilnej danej dystrybucji.
        </p>
      </section>

      {/* ── Lag tracker (wizualizacja) ── */}
      <section>
        <h3 className="k-heading mb-3">Wizualizacja opóźnień (lag tracker)</h3>
        <div className="k-panel p-4 space-y-5">
          {categories.map((cat) => {
            const pkgs = filtered.filter((p) => p.category === cat)
            if (pkgs.length === 0) return null
            return (
              <div key={cat}>
                <div className="text-xs font-mono text-ktext-dim uppercase tracking-wide mb-2">{cat}</div>
                <div className="space-y-3">
                  {pkgs.map((pkg) => (
                    <div key={pkg.id}>
                      <div className="text-sm text-ktext mb-1">{pkg.name}</div>
                      <div className="space-y-1">
                        {visibleDistros.map((d) => {
                          const v = pkg.versions[d.id]
                          const widthPct = Math.max(4, (v.lagDays / maxLag) * 100)
                          return (
                            <div key={d.id} className="flex items-center gap-2 text-xs">
                              <span className={`w-40 shrink-0 font-mono ${d.color}`}>{d.name}</span>
                              <div className="flex-1 h-4 bg-kbg rounded-sm overflow-hidden border border-kbg-border">
                                <div
                                  className={`h-full ${lagBarClass(v.lagDays)} transition-all`}
                                  style={{ width: `${widthPct}%` }}
                                />
                              </div>
                              <span className="w-14 text-right font-mono text-ktext-muted">
                                {v.lagDays} d
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Kompilacja pod sprzęt ── */}
      <section>
        <h3 className="k-heading mb-3">Kompilacja i dostosowanie pakietów do sprzętu</h3>
        <div className="k-panel p-5 space-y-5">
          <p className="text-sm text-ktext-muted leading-relaxed max-w-3xl">
            Jedną z głównych przewag dystrybucji source-based (Gentoo) jest możliwość kompilacji
            pakietów z flagami dopasowanymi do konkretnej mikroarchitektury procesora. Poniżej
            znajdziesz praktyczne polecenia dla każdej z trzech dystrybucji.
          </p>

          <div>
            <h4 className="text-sm font-semibold text-ksteel-bright mb-2">Gentoo — natywna kompilacja z <code>-march=native</code></h4>
            <p className="text-xs text-ktext-dim mb-2">
              W <code>/etc/portage/make.conf</code> ustaw flagi kompilatora tak, aby GCC/Clang
              generował kod wykorzystujący wszystkie instrukcje dostępne na Twoim CPU (AVX2, AVX-512,
              itp.):
            </p>
            <pre className="bg-kbg border border-kbg-border rounded-sm p-3 text-xs overflow-x-auto text-ktext">
{`# /etc/portage/make.conf
COMMON_FLAGS="-march=native -O2 -pipe"
CFLAGS="\${COMMON_FLAGS}"
CXXFLAGS="\${COMMON_FLAGS}"
FCFLAGS="\${COMMON_FLAGS}"
FFLAGS="\${COMMON_FLAGS}"

# liczba równoległych zadań kompilacji = liczba wątków CPU
MAKEOPTS="-j$(nproc)"

# weryfikacja, jaką mikroarchitekturę wykryje -march=native:
$ gcc -march=native -E -v - </dev/null 2>&1 | grep cc1`}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-kamber-bright mb-2">Arch Linux — lokalny rebuild przez <code>makepkg</code></h4>
            <p className="text-xs text-ktext-dim mb-2">
              Pakiety binarne z [core]/[extra] są budowane pod ogólny profil <code>x86-64-v2/v3</code>.
              Aby zbudować pakiet lokalnie pod własny CPU, edytuj <code>/etc/makepkg.conf</code> i
              przebuduj pakiet z AUR lub ABS:
            </p>
            <pre className="bg-kbg border border-kbg-border rounded-sm p-3 text-xs overflow-x-auto text-ktext">
{`# /etc/makepkg.conf
CFLAGS="-march=native -O2 -pipe -fno-plt"
CXXFLAGS="\${CFLAGS}"
MAKEFLAGS="-j$(nproc)"

# przebudowanie konkretnego pakietu lokalnie:
$ git clone https://gitlab.archlinux.org/archlinux/packaging/packages/<pakiet>.git
$ cd <pakiet> && makepkg -si`}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-kgood mb-2">openSUSE Tumbleweed — Open Build Service (OBS) i <code>rpmbuild</code></h4>
            <p className="text-xs text-ktext-dim mb-2">
              Tumbleweed dystrybuuje wyłącznie pakiety binarne budowane centralnie przez OBS
              (ogólny profil x86-64-v2). Lokalny rebuild pod własny sprzęt wymaga pobrania źródeł
              RPM i przekompilowania:
            </p>
            <pre className="bg-kbg border border-kbg-border rounded-sm p-3 text-xs overflow-x-auto text-ktext">
{`# pobranie źródeł pakietu
$ osc source download <pakiet>

# lub klasycznie przez rpmbuild z nadpisanymi optflags
$ rpmbuild --rebuild --define 'optflags -march=native -O2' <pakiet>.src.rpm`}
            </pre>
          </div>

          <div className="border-t border-kbg-border pt-4">
            <p className="text-xs text-ktext-dim leading-relaxed max-w-3xl">
              <span className="k-badge k-pill-warn mr-1">uwaga</span>
              <code>-march=native</code> generuje kod, który może nie działać na innej maszynie —
              binarki takie nie nadają się do dystrybucji, tylko do użytku lokalnego. W Gentoo jest to
              naturalne (każdy pakiet i tak budujesz sam), w Arch/openSUSE dotyczy tylko pakietów
              przebudowanych ręcznie.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
