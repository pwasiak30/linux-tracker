import { useState } from 'react'

/**
 * SZKIELET ZAKŁADKI — do rozbudowy w kolejnym kroku.
 * Docelowe funkcjonalności:
 *   1. Wyszukiwarka opcji Kconfig (np. CONFIG_BTRFS_FS) z pełnym opisem i
 *      informacją, czy dana opcja jest wymagana dla konkretnego sprzętu.
 *   2. Porównanie configów: gentoo-sources vs linux-firmware (Arch) vs
 *      kernel-default (openSUSE).
 */

const SAMPLE_OPTIONS = [
  {
    key: 'CONFIG_BTRFS_FS',
    title: 'System plików Btrfs',
    desc: 'Wbudowane wsparcie dla Btrfs — wymagane m.in. przez domyślną instalację openSUSE Tumbleweed (snapshoty + Snapper).',
    requiredFor: 'openSUSE (domyślnie), opcjonalnie Arch/Gentoo',
  },
  {
    key: 'CONFIG_ZSTD_COMPRESS',
    title: 'Kompresja ZSTD w jądrze',
    desc: 'Używana m.in. przy kompresji modułów jądra oraz jako opcja kompresji dla Btrfs/zram.',
    requiredFor: 'zalecane wszędzie',
  },
  {
    key: 'CONFIG_DRM_AMDGPU',
    title: 'Sterownik AMDGPU (DRM)',
    desc: 'Natywny sterownik kernel-space dla kart graficznych AMD (GCN i nowsze) — wymagany dla akceleracji Wayland/Mesa RADV.',
    requiredFor: 'sprzęt z GPU AMD',
  },
]

export default function KernelExplorer() {
  const [query, setQuery] = useState('')
  const results = SAMPLE_OPTIONS.filter(
    (o) =>
      !query ||
      o.key.toLowerCase().includes(query.toLowerCase()) ||
      o.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <section>
        <h2 className="k-heading mb-2">04 — Przewodnik po jądrze Linux</h2>
        <h3 className="text-2xl font-semibold text-ktext mb-2">Kernel Config & Feature Explorer</h3>
        <p className="text-sm text-ktext-muted max-w-3xl leading-relaxed">
          Szkielet wyszukiwarki opcji Kconfig wraz z przystępnymi opisami i informacją o wymaganiach
          sprzętowych. Docelowo dane mają pochodzić z parsowania plików <code>Kconfig</code> jądra
          (np. przez <code>scripts/kconfig/streamline_config.pl</code> lub bazę taką jak
          kernelnewbies.org) i cache'owane lokalnie.
        </p>
      </section>

      <section className="k-panel p-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj opcji jądra, np. BTRFS, AMDGPU, ZSTD…"
          className="w-full bg-kbg border border-kbg-border rounded-sm px-3 py-2 text-sm text-ktext placeholder:text-ktext-dim focus:outline-none focus:border-kamber/60"
        />
      </section>

      <section className="space-y-3">
        {results.map((o) => (
          <div key={o.key} className="k-panel p-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <h4 className="font-mono text-sm text-kamber-bright">{o.key}</h4>
              <span className="k-badge border-ksteel/40 bg-ksteel/10 text-ksteel-bright">{o.title}</span>
            </div>
            <p className="text-sm text-ktext-muted mb-2">{o.desc}</p>
            <p className="text-xs text-ktext-dim">
              <span className="text-ktext-muted">Wymagane dla:</span> {o.requiredFor}
            </p>
          </div>
        ))}
        {results.length === 0 && (
          <p className="text-sm text-ktext-dim">Brak wyników dla „{query}”.</p>
        )}
      </section>

      <section>
        <h3 className="k-heading mb-3">Porównanie configów dystrybucji (planowane)</h3>
        <div className="k-panel overflow-x-auto">
          <table className="k-table">
            <thead>
              <tr>
                <th>Źródło jądra</th>
                <th>Dystrybucja</th>
                <th>Charakterystyka</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-ksteel-bright">gentoo-sources</td>
                <td>Gentoo</td>
                <td className="text-ktext-muted text-xs">
                  Patchset Gentoo na bazie mainline; pełna kontrola nad configiem (make menuconfig),
                  możliwość genkernel lub ręcznej konfiguracji.
                </td>
              </tr>
              <tr>
                <td className="font-mono text-kamber-bright">linux (Arch)</td>
                <td>Arch Linux</td>
                <td className="text-ktext-muted text-xs">
                  Config zoptymalizowany pod ogólny desktop/serwer, zgodny z zaleceniami upstream;
                  alternatywy: linux-hardened, linux-zen, linux-lts.
                </td>
              </tr>
              <tr>
                <td className="font-mono text-kgood">kernel-default</td>
                <td>openSUSE Tumbleweed</td>
                <td className="text-ktext-muted text-xs">
                  Config testowany przez openQA przed wejściem do snapshotu; szeroki zestaw
                  wbudowanych sterowników (jeden obraz dla wielu konfiguracji sprzętowych).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
