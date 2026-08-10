// Współdzielone typy danych dla całej aplikacji Linux Rolling Hub.

export type DistroId = 'gentoo' | 'arch' | 'tumbleweed' | 'debianStable' | 'debianLts' | 'fedora' | 'fedoraRawhide'

export interface DistroMeta {
  id: DistroId
  name: string
  tagline: string
  releaseModel: string
  color: string // klasa tailwind wykorzystywana do akcentów w tabeli
}

export interface PackageVersionEntry {
  /** Wersja upstream (najnowsza wydana przez projekt) */
  upstream: string
  /** Wersja aktualnie dostępna w danej dystrybucji (stabilna gałąź) */
  current: string
  /** Liczba dni opóźnienia względem wydania upstream */
  lagDays: number
  /** Czy wersja jest zbudowana lokalnie (source-based) czy binarnie */
  buildMode: 'source' | 'binary' | 'hybrid'
}

export interface TrackedPackage {
  id: string
  category: string
  name: string
  description: string
  versions: Record<DistroId, PackageVersionEntry>
}
