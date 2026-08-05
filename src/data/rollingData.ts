import type { DistroMeta, TrackedPackage } from '../types'

/**
 * UWAGA — DANE PRZYKŁADOWE (mock data)
 * ------------------------------------
 * Poniższe wersje pakietów są danymi ilustracyjnymi przygotowanymi na potrzeby
 * prototypu UI. W wersji produkcyjnej ta tablica powinna być zasilana z realnego
 * źródła danych (np. własny cron scraper repology.org / API dystrybucji,
 * GitHub Releases upstream, albo distrowatch-style baza), odświeżanego
 * cyklicznie (np. co 6h) i serwowanego przez lekkie API (patrz sekcja
 * "Architektura danych" w README).
 */

export const DISTROS: DistroMeta[] = [
  {
    id: 'gentoo',
    name: 'Gentoo',
    tagline: 'source-based, ~amd64 (testing)',
    releaseModel: 'Rolling / source-based (Portage)',
    color: 'text-ksteel-bright',
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    tagline: '[core] / [extra]',
    releaseModel: 'Rolling / binarny (pacman)',
    color: 'text-kamber-bright',
  },
  {
    id: 'tumbleweed',
    name: 'openSUSE Tumbleweed',
    tagline: 'openQA-gated snapshoty',
    releaseModel: 'Rolling / binarny, testowany przez openQA',
    color: 'text-kgood',
  },
]

export const TRACKED_PACKAGES: TrackedPackage[] = [
  {
    id: 'linux-kernel',
    category: 'Jądro systemu',
    name: 'Linux kernel',
    description: 'Główna gałąź jądra (mainline / stable, bez patchsetów dystrybucyjnych typu -zen czy -hardened).',
    versions: {
      gentoo: { upstream: '6.12.4', current: '6.12.4', lagDays: 1, buildMode: 'source' },
      arch: { upstream: '6.12.4', current: '6.12.3', lagDays: 6, buildMode: 'binary' },
      tumbleweed: { upstream: '6.12.4', current: '6.12.1', lagDays: 14, buildMode: 'binary' },
    },
  },
  {
    id: 'kde-plasma',
    category: 'Środowisko graficzne',
    name: 'KDE Plasma',
    description: 'Wersja pakietu plasma-desktop / plasma-meta w gałęzi stabilnej.',
    versions: {
      gentoo: { upstream: '6.2.4', current: '6.2.4', lagDays: 2, buildMode: 'source' },
      arch: { upstream: '6.2.4', current: '6.2.4', lagDays: 3, buildMode: 'binary' },
      tumbleweed: { upstream: '6.2.4', current: '6.2.3', lagDays: 9, buildMode: 'binary' },
    },
  },
  {
    id: 'mesa',
    category: 'Sterowniki graficzne',
    name: 'Mesa',
    description: 'Implementacja OpenGL/Vulkan — kluczowa dla wydajności GPU (RadeonSI, RADV, Iris, NVK).',
    versions: {
      gentoo: { upstream: '24.3.1', current: '24.3.0', lagDays: 5, buildMode: 'source' },
      arch: { upstream: '24.3.1', current: '24.3.1', lagDays: 2, buildMode: 'binary' },
      tumbleweed: { upstream: '24.3.1', current: '24.2.8', lagDays: 21, buildMode: 'binary' },
    },
  },
  {
    id: 'firefox',
    category: 'Przeglądarka',
    name: 'Mozilla Firefox',
    description: 'Kanał stabilny (rapid release), bez ESR.',
    versions: {
      gentoo: { upstream: '133.0', current: '133.0', lagDays: 3, buildMode: 'hybrid' },
      arch: { upstream: '133.0', current: '133.0', lagDays: 1, buildMode: 'binary' },
      tumbleweed: { upstream: '133.0', current: '132.0.2', lagDays: 18, buildMode: 'binary' },
    },
  },
  {
    id: 'systemd',
    category: 'Init / system bazowy',
    name: 'systemd',
    description: 'Wersja pakietu systemd (Gentoo domyślnie oferuje też OpenRC jako profil bez systemd).',
    versions: {
      gentoo: { upstream: '257', current: '256.8', lagDays: 12, buildMode: 'source' },
      arch: { upstream: '257', current: '257', lagDays: 2, buildMode: 'binary' },
      tumbleweed: { upstream: '257', current: '256.7', lagDays: 16, buildMode: 'binary' },
    },
  },
  {
    id: 'glibc',
    category: 'System bazowy',
    name: 'glibc',
    description: 'Podstawowa biblioteka C — zmiany tu wpływają na kompatybilność binarną całego systemu.',
    versions: {
      gentoo: { upstream: '2.40', current: '2.40', lagDays: 4, buildMode: 'source' },
      arch: { upstream: '2.40', current: '2.40', lagDays: 4, buildMode: 'binary' },
      tumbleweed: { upstream: '2.40', current: '2.39', lagDays: 30, buildMode: 'binary' },
    },
  },
  {
    id: 'llvm',
    category: 'Toolchain',
    name: 'LLVM / Clang',
    description: 'Kompilator alternatywny dla GCC, coraz częściej używany jako domyślny w Gentoo (profil ~llvm).',
    versions: {
      gentoo: { upstream: '19.1.4', current: '19.1.3', lagDays: 8, buildMode: 'source' },
      arch: { upstream: '19.1.4', current: '19.1.4', lagDays: 1, buildMode: 'binary' },
      tumbleweed: { upstream: '19.1.4', current: '18.1.8', lagDays: 45, buildMode: 'binary' },
    },
  },
]

/** Progi kolorystyczne dla wizualizacji lag trackera (w dniach). */
export const LAG_THRESHOLDS = {
  good: 5, // <= 5 dni: zielony
  warn: 15, // <= 15 dni: żółty, powyżej: czerwony
}
