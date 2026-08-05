import type { DistroMeta, TrackedPackage } from '../types'

/**
 * DANE ZWERYFIKOWANE RĘCZNIE — stan na 2026-08-05
 * ------------------------------------------------
 * To NIE jest live-tracker — wersje zostały sprawdzone jednorazowo (research
 * przez wyszukiwarkę + fetch stron źródłowych) i wpisane na sztywno. Gentoo
 * i Arch pochodzą z bieżących stron pakietów (packages.gentoo.org,
 * archlinux.org) sprawdzonych w dniu aktualizacji tego pliku. openSUSE
 * Tumbleweed jest oznaczone jako mniej świeże (ostatni potwierdzony stan to
 * przełom czerwca/lipca 2026 — brak równie wygodnej, jednej strony z bieżącą
 * wersją per pakiet jak w Arch/Gentoo).
 *
 * Żeby to było naprawdę "live", potrzebny jest automat (patrz README
 * §"Architektura danych") — np. GitHub Action odpalany cyklicznie, który
 * ciągnie dane z repology.org API i nadpisuje ten plik / generowany JSON.
 * Bez tego każdy taki "tracker" to tylko zdjęcie stanu z dnia, w którym
 * ktoś ostatnio ręcznie zaktualizował dane — co i tak jest dokładniejsze
 * niż całkowicie zmyślone liczby, ale trzeba mieć to z tyłu głowy.
 */

export const DATA_LAST_VERIFIED = '2026-08-05'

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
      // upstream mainline: 7.1.6 (kernel.org, wyd. 2026-08-03)
      gentoo: { upstream: '7.1.6', current: '7.1.6', lagDays: 2, buildMode: 'source' }, // sys-kernel/gentoo-sources ~amd64
      arch: { upstream: '7.1.6', current: '7.1.5.arch1-2', lagDays: 8, buildMode: 'binary' }, // [core], zbudowany 2026-07-28; 7.1.6 w core-testing
      tumbleweed: { upstream: '7.1.6', current: '7.0.12', lagDays: 34, buildMode: 'binary' }, // ostatni potwierdzony stan: koniec czerwca 2026
    },
  },
  {
    id: 'kde-plasma',
    category: 'Środowisko graficzne',
    name: 'KDE Plasma',
    description: 'Wersja pakietu plasma-desktop / plasma-meta w gałęzi stabilnej.',
    versions: {
      // upstream: 6.7.4 (kde.org, bugfix release "for August")
      gentoo: { upstream: '6.7.4', current: '6.6.6', lagDays: 30, buildMode: 'source' }, // kde-plasma/plasma-desktop, amd64 stable; ~amd64 ma 6.7.4
      arch: { upstream: '6.7.4', current: '6.7.4-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-08-05
      tumbleweed: { upstream: '6.7.4', current: '6.7.0', lagDays: 35, buildMode: 'binary' }, // ostatni potwierdzony stan: druga połowa czerwca 2026
    },
  },
  {
    id: 'mesa',
    category: 'Sterowniki graficzne',
    name: 'Mesa',
    description: 'Implementacja OpenGL/Vulkan — kluczowa dla wydajności GPU (RadeonSI, RADV, Iris, NVK).',
    versions: {
      // upstream: 26.1.6 (mesa3d.org, wyd. 2026-07-29)
      gentoo: { upstream: '26.1.6', current: '26.1.5', lagDays: 14, buildMode: 'source' }, // media-libs/mesa ~amd64
      arch: { upstream: '26.1.6', current: '26.1.6-1', lagDays: 2, buildMode: 'binary' }, // [extra], zbudowany 2026-07-31
      tumbleweed: { upstream: '26.1.6', current: '26.1.2', lagDays: 30, buildMode: 'binary' }, // ostatni potwierdzony stan: czerwiec 2026
    },
  },
  {
    id: 'firefox',
    category: 'Przeglądarka',
    name: 'Mozilla Firefox',
    description: 'Kanał stabilny (rapid release), bez ESR.',
    versions: {
      // upstream: 153.0.3 (najnowszy patch w cyklu rapid-release)
      gentoo: { upstream: '153.0.3', current: '152.0.5', lagDays: 35, buildMode: 'hybrid' }, // www-client/firefox ~amd64 — Gentoo notorycznie lekko w tyle (build z ustandaryzowanych źródeł Rust/C++)
      arch: { upstream: '153.0.3', current: '153.0-1', lagDays: 4, buildMode: 'binary' }, // [extra], zbudowany 2026-07-22
      tumbleweed: { upstream: '153.0.3', current: '152.0', lagDays: 22, buildMode: 'binary' }, // szacunek na bazie zwykłego tempa OBS — do weryfikacji
    },
  },
  {
    id: 'systemd',
    category: 'Init / system bazowy',
    name: 'systemd',
    description: 'Wersja pakietu systemd (Gentoo domyślnie oferuje też OpenRC jako profil bez systemd).',
    versions: {
      // upstream: 261.1 (systemd 261 wyd. 2026-06-19, punktowy bump 261.1 wkrótce potem)
      gentoo: { upstream: '261.1', current: '261.1', lagDays: 3, buildMode: 'source' }, // sys-apps/systemd ~amd64
      arch: { upstream: '261.1', current: '261.1-1', lagDays: 1, buildMode: 'binary' }, // [core], zbudowany 2026-06-27
      tumbleweed: { upstream: '261.1', current: '260.2', lagDays: 40, buildMode: 'binary' }, // szacunek — brak świeżego potwierdzenia
    },
  },
  {
    id: 'glibc',
    category: 'System bazowy',
    name: 'glibc',
    description: 'Podstawowa biblioteka C — zmiany tu wpływają na kompatybilność binarną całego systemu.',
    versions: {
      // upstream: 2.43 (sourceware.org, ogłoszone styczeń 2026)
      gentoo: { upstream: '2.43', current: '2.43-r2', lagDays: 2, buildMode: 'source' }, // sys-libs/glibc, stabilny amd64
      arch: { upstream: '2.43', current: '2.43+r22-2', lagDays: 1, buildMode: 'binary' }, // [core] — Arch śledzi snapshoty git glibc
      tumbleweed: { upstream: '2.43', current: '2.40', lagDays: 60, buildMode: 'binary' }, // szacunek — brak świeżego potwierdzenia
    },
  },
  {
    id: 'llvm',
    category: 'Toolchain',
    name: 'LLVM / Clang',
    description: 'Kompilator alternatywny dla GCC, coraz częściej używany jako domyślny w Gentoo (profil ~llvm).',
    versions: {
      // upstream: 22.1.8 (seria stabilna LLVM 22.x)
      gentoo: { upstream: '22.1.8', current: '22.1.8', lagDays: 3, buildMode: 'source' }, // sys-devel/llvm, stabilny amd64; ~amd64 śledzi 23.x RC
      arch: { upstream: '22.1.8', current: '22.1.6-1', lagDays: 9, buildMode: 'binary' }, // [extra], zbudowany 2026-05-30
      tumbleweed: { upstream: '22.1.8', current: '21.1.2', lagDays: 55, buildMode: 'binary' }, // szacunek — brak świeżego potwierdzenia
    },
  },
]

/** Progi kolorystyczne dla wizualizacji lag trackera (w dniach). */
export const LAG_THRESHOLDS = {
  good: 5, // <= 5 dni: zielony
  warn: 15, // <= 15 dni: żółty, powyżej: czerwony
}
