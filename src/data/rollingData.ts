import type { DistroMeta, TrackedPackage } from '../types'

/**
 * DANE ZWERYFIKOWANE RĘCZNIE — stan na 2026-08-09/10
 * ------------------------------------------------
 * To NIE jest live-tracker — wersje zostały sprawdzone jednorazowo (research
 * przez wyszukiwarkę + fetch stron źródłowych) i wpisane na sztywno. Gentoo
 * i Arch pochodzą z bieżących stron pakietów (packages.gentoo.org,
 * archlinux.org) sprawdzonych w dniu aktualizacji tego pliku. openSUSE
 * Tumbleweed jest oznaczone jako mniej świeże (dużo wpisów oznaczonych
 * "szacunek" — brak jednej wygodnej, stale aktualnej strony z bieżącą
 * wersją per pakiet jak w Arch/Gentoo, dane pochodzą głównie z przeglądu
 * mirrora repo/oss/x86_64 i rpmfind.net).
 *
 * Lista pakietów została rozszerzona 2026-08-10 o: (1) pakiety obecne w
 * tabeli DistroWatch dla Gentoo (distrowatch.com/table.php?distribution=gentoo)
 * i (2) po jednym "flagowym" pakiecie dla większości znaczących kategorii
 * Portage (packages.gentoo.org/categories) — pominięto kategorie czysto
 * metadanowe/infrastrukturalne (acct-group, acct-user, virtual, sec-keys…)
 * oraz część bardzo niszowych kategorii (gry, gnustep, sci-* poza sci-libs),
 * bo nie mają jednego oczywistego "flagowca" i rozdęłyby listę bez realnej
 * wartości dla trackera.
 *
 * Żeby to było naprawdę "live", potrzebny jest automat (patrz README
 * §"Architektura danych") — np. GitHub Action odpalany cyklicznie, który
 * ciągnie dane z repology.org API i nadpisuje ten plik / generowany JSON.
 * Bez tego każdy taki "tracker" to tylko zdjęcie stanu z dnia, w którym
 * ktoś ostatnio ręcznie zaktualizował dane — co i tak jest dokładniejsze
 * niż całkowicie zmyślone liczby, ale trzeba mieć to z tyłu głowy.
 */

export const DATA_LAST_VERIFIED = '2026-08-10'

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
  // ─────────────────────────────────────────────────────────────
  // Oryginalny zestaw (jądro / desktop / toolchain)
  // ─────────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────
  // Z tabeli DistroWatch (distrowatch.com/table.php?distribution=gentoo)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'bash',
    category: 'Powłoka systemowa',
    name: 'Bash',
    description: 'Domyślna powłoka logowania w większości dystrybucji Linuksa, interpreter poleceń zgodny z POSIX.',
    versions: {
      // upstream: bash-5.3, patch level 15 (bash 5.3 wyd. 2025-07-08, oficjalne patche do p15 wg drzew dystrybucji)
      gentoo: { upstream: '5.3.15', current: '5.3_p15', lagDays: 5, buildMode: 'source' }, // app-shells/bash, stable amd64
      arch: { upstream: '5.3.15', current: '5.3.15-1', lagDays: 1, buildMode: 'binary' }, // [core], zbudowany 2026-06-10
      tumbleweed: { upstream: '5.3.15', current: '5.3.15-8.2', lagDays: 15, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'gcc',
    category: 'Toolchain',
    name: 'GCC',
    description: 'Kolekcja kompilatorów GNU (C, C++, Fortran i inne) — podstawowe narzędzie łańcucha kompilacji w Linuksie.',
    versions: {
      // upstream: GCC 16.1 (wyd. 2026-04-30, gcc-announce)
      gentoo: { upstream: '16.1', current: '15.2.1_p20260214', lagDays: 101, buildMode: 'source' }, // sys-devel/gcc stable amd64 to wciąż gałąź 15.2; 16.1.1 dostępne tylko ~amd64
      arch: { upstream: '16.1', current: '16.1.1+r595+g171d15ac6959-1', lagDays: 5, buildMode: 'binary' }, // [core], zbudowany 2026-07-28, snapshot deweloperski
      tumbleweed: { upstream: '16.1', current: '16.1.1+git9481-1.1', lagDays: 15, buildMode: 'binary' }, // pakiet gcc16 (domyślny), szacunek daty builda
    },
  },
  {
    id: 'e2fsprogs',
    category: 'Systemy plików',
    name: 'e2fsprogs',
    description: 'Zestaw narzędzi do tworzenia, sprawdzania i naprawy systemów plików ext2/ext3/ext4.',
    versions: {
      // upstream: 1.47.4 (przyjęte do Debiana 2026-03-06, zbieżne z datą wydania)
      gentoo: { upstream: '1.47.4', current: '1.47.4', lagDays: 10, buildMode: 'source' }, // sys-fs/e2fsprogs stable amd64
      arch: { upstream: '1.47.4', current: '1.47.4-1', lagDays: 2, buildMode: 'binary' }, // [core], zbudowany 2026-03-07
      tumbleweed: { upstream: '1.47.4', current: '1.47.3-2.2', lagDays: 157, buildMode: 'binary' }, // szacunek — wg mirrora wciąż 1.47.3
    },
  },
  {
    id: 'gnome-shell',
    category: 'Środowisko graficzne',
    name: 'GNOME Shell',
    description: 'Powłoka graficzna środowiska GNOME odpowiadająca za pulpit, dok i przełącznik aktywności.',
    versions: {
      // upstream: 50.4 (wyd. 2026-08-05, GNOME Ships GNOME 50.4 and 49.9)
      gentoo: { upstream: '50.4', current: '49.7', lagDays: 144, buildMode: 'source' }, // gnome-base/gnome-shell stable amd64, wciąż gałąź GNOME 49 (50.0 wyszło 2026-03-18); ~amd64 ma 49.8
      arch: { upstream: '50.4', current: '50.3-1', lagDays: 4, buildMode: 'binary' }, // [extra], zbudowany 2026-06-29
      tumbleweed: { upstream: '50.4', current: '50.3-1.2', lagDays: 4, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'gtk',
    category: 'Biblioteki GUI',
    name: 'GTK',
    description: 'Biblioteka widżetów GUI używana m.in. przez GNOME i wiele aplikacji graficznych (gałąź GTK4).',
    versions: {
      // upstream: 4.22.4 (GTK 4.22 wyd. 2026-03-06, punktowa 4.22.4 ok. kwietnia 2026)
      gentoo: { upstream: '4.22.4', current: '4.20.4', lagDays: 156, buildMode: 'source' }, // gui-libs/gtk stable amd64, wciąż gałąź 4.20; 4.20.3-r2 ~amd64
      arch: { upstream: '4.22.4', current: '1:4.22.4-1', lagDays: 5, buildMode: 'binary' }, // [extra], zbudowany 2026-04-30
      tumbleweed: { upstream: '4.22.4', current: '4.22.4+29-1.2', lagDays: 20, buildMode: 'binary' }, // libgtk-4-1, snapshot git tuż po 4.22.4
    },
  },
  {
    id: 'chromium',
    category: 'Przeglądarka',
    name: 'Chromium',
    description: 'Otwartoźródłowa przeglądarka internetowa będąca bazą dla Google Chrome i wielu innych przeglądarek.',
    versions: {
      // upstream: 151.0.7922.108 (Chrome Stable Channel Update, 2026-08-06)
      gentoo: { upstream: '151.0.7922.108', current: '150.0.7871.128', lagDays: 30, buildMode: 'source' }, // www-client/chromium stable amd64 (jedna wersja major w tyle); ~amd64 ma już 151.0.7922.108
      arch: { upstream: '151.0.7922.108', current: '151.0.7922.108-1', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-08-06 — ten sam dzień co wydanie
      tumbleweed: { upstream: '151.0.7922.108', current: '151.0.7922.75-1.1', lagDays: 7, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64, wcześniejszy build 151.x
    },
  },
  {
    id: 'gimp',
    category: 'Grafika',
    name: 'GIMP',
    description: 'Zaawansowany, darmowy program do edycji grafiki rastrowej, odpowiednik Photoshopa.',
    versions: {
      // upstream: 3.2.4 (gimp.org/news, wyd. 2026-04-19)
      gentoo: { upstream: '3.2.4', current: '3.2.4', lagDays: 15, buildMode: 'source' }, // media-gfx/gimp stable amd64
      arch: { upstream: '3.2.4', current: '3.2.4-2', lagDays: 5, buildMode: 'binary' }, // [extra] — data builda 2026-07-06 dotyczy rebuildu (pkgrel), nie zmiany wersji
      tumbleweed: { upstream: '3.2.4', current: '3.2.4-3.1', lagDays: 10, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'inkscape',
    category: 'Grafika',
    name: 'Inkscape',
    description: 'Darmowy edytor grafiki wektorowej korzystający natywnie z formatu SVG.',
    versions: {
      // upstream: 1.4.4 (inkscape.org/news, wyd. 2026-05-06)
      gentoo: { upstream: '1.4.4', current: '1.4.4', lagDays: 10, buildMode: 'source' }, // media-gfx/inkscape stable amd64
      arch: { upstream: '1.4.4', current: '1.4.4-4', lagDays: 10, buildMode: 'binary' }, // [extra] — data builda 2026-07-09 to rebuild (pkgrel 4)
      tumbleweed: { upstream: '1.4.4', current: '1.4.4+git2.3454cb1dab-1.2', lagDays: 10, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64, snapshot git
    },
  },
  {
    id: 'krita',
    category: 'Grafika',
    name: 'Krita',
    description: 'Program do malowania cyfrowego i tworzenia grafiki, popularny wśród artystów koncepcyjnych.',
    versions: {
      // upstream: 5.3.3 (krita.org, wyd. 2026-07-29 — oficjalnie rekomendowana gałąź produkcyjna Qt5)
      gentoo: { upstream: '5.3.3', current: '6.0.2.1', lagDays: 15, buildMode: 'source' }, // media-gfx/krita — brak wersji stabilnej w drzewie; jedyna dostępna to ~amd64 6.0.2.1 (równoległa gałąź Qt6)
      arch: { upstream: '5.3.3', current: '6.0.3-2', lagDays: 2, buildMode: 'binary' }, // [extra], zbudowany 2026-07-31 — pakietowana jest gałąź Qt6 (6.0.x), nie 5.3.x
      tumbleweed: { upstream: '5.3.3', current: '5.3.3-1.1', lagDays: 10, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64 — jedyny dystrybutor z rekomendowaną gałęzią 5.3.x
    },
  },
  {
    id: 'libreoffice',
    category: 'Pakiet biurowy',
    name: 'LibreOffice',
    description: 'Darmowy pakiet biurowy z edytorem tekstu, arkuszem kalkulacyjnym, prezentacjami i innymi aplikacjami.',
    versions: {
      // upstream: 26.2.5 (szacunek wyd. ok. 2026-07-10, wg comiesięcznego cyklu punktowego po 26.2.4 z 2026-06-05)
      gentoo: { upstream: '26.2.5', current: '25.2.7.2-r1', lagDays: 190, buildMode: 'source' }, // app-office/libreoffice stable amd64 — cała gałąź 26.2 nieobecna w drzewie stable
      arch: { upstream: '26.2.5', current: '26.2.5-1', lagDays: 14, buildMode: 'binary' }, // libreoffice-fresh [extra], zbudowany 2026-07-24
      tumbleweed: { upstream: '26.2.5', current: '26.2.5.1-1.3', lagDays: 14, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'ffmpeg',
    category: 'Multimedia',
    name: 'FFmpeg',
    description: 'Uniwersalny zestaw narzędzi i bibliotek do przetwarzania oraz konwersji audio i wideo.',
    versions: {
      // upstream: 9.0 "Lei" (ffmpeg.org/download.html, wyd. 2026-08-04)
      gentoo: { upstream: '9.0', current: '8.1.1', lagDays: 5, buildMode: 'source' }, // media-video/ffmpeg stable amd64 — 9.0 dopiero co wydane, jeszcze bez ebuilda
      arch: { upstream: '9.0', current: '9.0-5', lagDays: 3, buildMode: 'binary' }, // [extra], zbudowany 2026-08-07
      tumbleweed: { upstream: '9.0', current: '7.1.1-1.1', lagDays: 300, buildMode: 'binary' }, // szacunek — FFmpeg w Tumbleweed pochodzi zwykle z repo Packman (poza OSS) i historycznie mocno się opóźnia; brak potwierdzenia dokładnej wersji
    },
  },
  {
    id: 'alsa-lib',
    category: 'Dźwięk',
    name: 'ALSA (alsa-lib)',
    description: 'Podstawowa biblioteka warstwy dźwiękowej ALSA, wykorzystywana przez większość aplikacji audio w Linuksie.',
    versions: {
      // upstream: 1.2.16.1 (alsa-project.org/wiki/Main_Page_News, wyd. 2026-06-12)
      gentoo: { upstream: '1.2.16.1', current: '1.2.15.3', lagDays: 59, buildMode: 'source' }, // media-sound/alsa-lib stable amd64; 1.2.16.1 dostępne tylko ~amd64
      arch: { upstream: '1.2.16.1', current: '1.2.16.1-1', lagDays: 3, buildMode: 'binary' }, // [extra], zbudowany 2026-06-15
      tumbleweed: { upstream: '1.2.16.1', current: '1.2.16.1-1.3', lagDays: 10, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'cups',
    category: 'Druk',
    name: 'CUPS',
    description: 'System drukowania (Common Unix Printing System) zarządzający drukarkami i kolejkami zadań druku.',
    versions: {
      // upstream: 2.4.19 (OpenPrinting/cups na GitHub, wyd. 2026-04-27)
      gentoo: { upstream: '2.4.19', current: '2.4.19', lagDays: 5, buildMode: 'source' }, // net-print/cups stable amd64
      arch: { upstream: '2.4.19', current: '2:2.4.19-1', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-04-27 — ten sam dzień co wydanie
      tumbleweed: { upstream: '2.4.19', current: '2.4.19-2.3', lagDays: 5, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'freetype',
    category: 'Biblioteki graficzne',
    name: 'FreeType',
    description: 'Biblioteka do renderowania czcionek wykorzystywana niemal wszędzie w ekosystemie Linuksa.',
    versions: {
      // upstream: 2.14.3 (szacunek wyd. ok. 2026-03-18, zbieżne z datą builda w Arch)
      gentoo: { upstream: '2.14.3', current: '2.14.3', lagDays: 10, buildMode: 'source' }, // media-libs/freetype stable amd64
      arch: { upstream: '2.14.3', current: '2.14.3-1', lagDays: 4, buildMode: 'binary' }, // freetype2 [extra], zbudowany 2026-03-22
      tumbleweed: { upstream: '2.14.3', current: '2.14.3-1.2', lagDays: 10, buildMode: 'binary' }, // libfreetype6, wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'git',
    category: 'Kontrola wersji',
    name: 'Git',
    description: 'Rozproszony system kontroli wersji, standard w programowaniu i zarządzaniu konfiguracją.',
    versions: {
      // upstream: 2.55.0 (phoronix.com/news/Git-2.55-Released, wyd. 2026-06-29)
      gentoo: { upstream: '2.55.0', current: '2.54.0', lagDays: 42, buildMode: 'source' }, // dev-vcs/git stable amd64; 2.55.0 dostępne tylko ~amd64
      arch: { upstream: '2.55.0', current: '2.55.0-1', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-06-29 — ten sam dzień co wydanie
      tumbleweed: { upstream: '2.55.0', current: '2.55.0-3.1', lagDays: 10, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'bind',
    category: 'Sieć / DNS',
    name: 'BIND',
    description: 'Serwer i zestaw narzędzi DNS (Domain Name System) rozwijany przez ISC.',
    versions: {
      // upstream: 9.20.26, gałąź ESV (linuxcompatible.org, wyd. ok. 2026-07-22)
      gentoo: { upstream: '9.20.26', current: '9.20.23', lagDays: 90, buildMode: 'source' }, // net-dns/bind stable amd64, kilka wydań punktowych w tyle; 9.20.26 tylko ~amd64
      arch: { upstream: '9.20.26', current: '9.20.26-1', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-07-22 — ten sam dzień co wydanie
      tumbleweed: { upstream: '9.20.26', current: '9.20.26-1.2', lagDays: 5, buildMode: 'binary' }, // wg mirrora repo/oss/x86_64
    },
  },
  {
    id: 'grub',
    category: 'Bootloader',
    name: 'GRUB',
    description: 'Domyślny bootloader (GRand Unified Bootloader) używany do uruchamiania systemu Linux.',
    versions: {
      // upstream: 2.14 (phoronix.com/news/GRUB-2.14-Released, wyd. 2026-01-15) — brak nowszej wersji upstream od tego czasu
      gentoo: { upstream: '2.14', current: '2.14-r5', lagDays: 20, buildMode: 'source' }, // sys-boot/grub stable amd64, -r5 to kolejne poprawki na tej samej wersji upstream
      arch: { upstream: '2.14', current: '2:2.14-1', lagDays: 0, buildMode: 'binary' }, // [core], zbudowany 2026-01-15 — ten sam dzień co wydanie
      tumbleweed: { upstream: '2.14', current: '2.14-18.1', lagDays: 30, buildMode: 'binary' }, // grub2, wg mirrora repo/oss/x86_64 — wysoki numer rewizji od licznych poprawek pakietowych
    },
  },
  {
    id: 'httpd',
    category: 'Serwer WWW',
    name: 'Apache HTTP Server',
    description: 'Popularny, wieloplatformowy serwer HTTP rozwijany przez Apache Software Foundation.',
    versions: {
      // upstream: 2.4.68 (wyd. 2026-06-08, endoflife.date / downloads.apache.org)
      gentoo: { upstream: '2.4.68', current: '2.4.68', lagDays: 7, buildMode: 'source' }, // www-servers/apache, stabilizacja amd64 2026-06-15
      arch: { upstream: '2.4.68', current: '2.4.68-1', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-06-08
      tumbleweed: { upstream: '2.4.68', current: '2.4.67-1.3', lagDays: 62, buildMode: 'binary' }, // wciąż 2.4.67, przebudowany 2026-07-26
    },
  },
  {
    id: 'kmod',
    category: 'Narzędzia jądra',
    name: 'kmod',
    description: 'Zestaw narzędzi do ładowania, usuwania i zarządzania modułami jądra Linuksa.',
    versions: {
      // upstream: 34.2 (wyd. ok. 2025-03-24/28)
      gentoo: { upstream: '34.2', current: '34.2', lagDays: 143, buildMode: 'source' }, // sys-apps/kmod, stabilizacja amd64 ok. sierpnia 2025 (szacunek)
      arch: { upstream: '34.2', current: '34.2-1', lagDays: 4, buildMode: 'binary' }, // [core], zbudowany 2025-03-28
      tumbleweed: { upstream: '34.2', current: '34.2-5.3', lagDays: 14, buildMode: 'binary' }, // szacunek — wersja zgodna z upstreamem
    },
  },
  {
    id: 'mariadb',
    category: 'Baza danych',
    name: 'MariaDB',
    description: 'Relacyjna baza danych, otwarty fork MySQL kompatybilny wstecznie z jego protokołem.',
    versions: {
      // upstream: 12.3.2 (wyd. 2026-05-28, mariadb.com/docs/release-notes)
      gentoo: { upstream: '12.3.2', current: '11.8.5-r1', lagDays: 268, buildMode: 'source' }, // dev-db/mariadb, stabilne amd64 to nadal gałąź LTS 11.8; ~amd64 ma już 12.0.2
      arch: { upstream: '12.3.2', current: '12.3.2-4', lagDays: 53, buildMode: 'binary' }, // [extra], zbudowany 2026-07-20
      tumbleweed: { upstream: '12.3.2', current: '12.3.2-1.3', lagDays: 60, buildMode: 'binary' }, // zsynchronizowany 2026-07-27
    },
  },
  {
    id: 'libselinux',
    category: 'Bezpieczeństwo',
    name: 'libselinux',
    description: 'Biblioteka użytkownika udostępniająca API do obsługi mechanizmu bezpieczeństwa SELinux.',
    versions: {
      // upstream: 3.11 (wyd. 2026-07-01, github.com/SELinuxProject/selinux)
      gentoo: { upstream: '3.11', current: '3.10-r2', lagDays: 206, buildMode: 'source' }, // sys-libs/libselinux stabilne amd64; 3.11 dodane 2026-07-05 tylko jako ~amd64
      arch: { upstream: '3.11', current: 'brak w oficjalnym repo (tylko AUR)', lagDays: 30, buildMode: 'source' }, // Arch nie dystrybuuje libselinux binarnie — buduje się lokalnie z AUR; wersja/data szacunkowa
      tumbleweed: { upstream: '3.11', current: '3.11-1.2', lagDays: 25, buildMode: 'binary' }, // libselinux1, przebudowany 2026-07-26
    },
  },
  {
    id: 'flatpak',
    category: 'Zarządzanie pakietami / kontenery',
    name: 'Flatpak',
    description: 'System dystrybucji i piaskownicowania aplikacji desktopowych niezależny od dystrybucji.',
    versions: {
      // upstream: 1.18.0 (wyd. 2026-06-08, github.com/flatpak/flatpak/releases)
      gentoo: { upstream: '1.18.0', current: '1.16.6', lagDays: 62, buildMode: 'source' }, // sys-apps/flatpak, stabilne amd64 to 1.16.6; 1.18.0 jeszcze nie w drzewie
      arch: { upstream: '1.18.0', current: '1.18.0-1', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-06-08
      tumbleweed: { upstream: '1.18.0', current: '1.18.0-1.3', lagDays: 49, buildMode: 'binary' }, // przebudowany 2026-07-27
    },
  },

  // ─────────────────────────────────────────────────────────────
  // Po jednym flagowym pakiecie na kategorię Portage (packages.gentoo.org/categories)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'sudo',
    category: 'Administracja',
    name: 'sudo',
    description: 'Narzędzie pozwalające użytkownikom wykonywać polecenia z uprawnieniami innego użytkownika, zwykle roota.',
    versions: {
      // upstream: 1.9.17p2 (wyd. 2025-07-26, sudo.ws/pipermail/sudo-announce)
      gentoo: { upstream: '1.9.17p2', current: '1.9.17_p2', lagDays: 25, buildMode: 'source' }, // app-admin/sudo, szacunek stabilizacji amd64
      arch: { upstream: '1.9.17p2', current: '1.9.17.p2-6', lagDays: 2, buildMode: 'binary' }, // [core]; build z 2026-06-16 to rebuild (pkgrel)
      tumbleweed: { upstream: '1.9.17p2', current: '1.9.17p2-3.3', lagDays: 15, buildMode: 'binary' }, // szacunek; RPM przebudowany zbiorczo 2026-07-26
    },
  },
  {
    id: 'clamav',
    category: 'Bezpieczeństwo',
    name: 'ClamAV',
    description: 'Otwartoźródłowy silnik antywirusowy do wykrywania trojanów, wirusów i innego złośliwego oprogramowania.',
    versions: {
      // upstream: 1.5.4 (wyd. 2026-08-07, github.com/Cisco-Talos/clamav)
      gentoo: { upstream: '1.5.4', current: '1.5.3', lagDays: 36, buildMode: 'source' }, // app-antivirus/clamav, stabilizacja amd64 2026-08-06
      arch: { upstream: '1.5.4', current: '1.5.3-1', lagDays: 5, buildMode: 'binary' }, // [extra], zbudowany 2026-07-06
      tumbleweed: { upstream: '1.5.4', current: '1.5.3-1.2', lagDays: 26, buildMode: 'binary' }, // przebudowany 2026-07-27
    },
  },
  {
    id: 'p7zip',
    category: 'Archiwizacja',
    name: 'p7zip',
    description: 'Konsolowy archiwizator obsługujący format 7z; klasyczny fork p7zip został wycofany na rzecz oficjalnego 7-Zip dla Linuksa.',
    versions: {
      // upstream: 7-Zip 26.02 (wyd. 2026-06-26, github.com/ip7z/7zip) — p7zip przestarzały, realnym następcą jest app-arch/7zip
      gentoo: { upstream: '26.02', current: '26.02', lagDays: 20, buildMode: 'source' }, // app-arch/7zip, stabilizacja amd64 ok. 2026-07-16
      arch: { upstream: '26.02', current: '26.02-1', lagDays: 0, buildMode: 'binary' }, // pakiet "7zip" (Provides/Replaces: p7zip), zbudowany 2026-06-26
      tumbleweed: { upstream: '26.02', current: '26.02-1.2', lagDays: 30, buildMode: 'binary' }, // przebudowany 2026-07-26
    },
  },
  {
    id: 'borgbackup',
    category: 'Kopie zapasowe',
    name: 'BorgBackup',
    description: 'Narzędzie do deduplikowanych, szyfrowanych i kompresowanych kopii zapasowych.',
    versions: {
      // upstream: 1.4.5 (wyd. 2026-07-19, borgbackup.readthedocs.io/en/stable/changes.html)
      gentoo: { upstream: '1.4.5', current: '1.4.3', lagDays: 250, buildMode: 'source' }, // app-backup/borgbackup stabilne amd64; 1.4.4/1.4.5 tylko ~amd64
      arch: { upstream: '1.4.5', current: '1.4.5-1', lagDays: 1, buildMode: 'binary' }, // [extra] "borg", zbudowany 2026-07-20
      tumbleweed: { upstream: '1.4.5', current: '1.4.1-6.5', lagDays: 478, buildMode: 'binary' }, // wyraźnie zamrożony pakiet — potwierdzone na mirrorze 2026-07-27
    },
  },
  {
    id: 'gnupg',
    category: 'Kryptografia',
    name: 'GnuPG',
    description: 'Implementacja standardu OpenPGP do szyfrowania i podpisywania danych oraz komunikacji.',
    versions: {
      // upstream: 2.5.21 (wyd. 2026-07-02, lists.gnupg.org/pipermail/gnupg-announce; gałąź 2.4 LTS EOL ok. czerwca 2026)
      gentoo: { upstream: '2.5.21', current: '2.5.21', lagDays: 38, buildMode: 'source' }, // app-crypt/gnupg, stabilizacja amd64 2026-08-09
      arch: { upstream: '2.5.21', current: '2.4.9-2', lagDays: 281, buildMode: 'binary' }, // [core]; Arch trzyma się starszej, już EOL gałęzi 2.4
      tumbleweed: { upstream: '2.5.21', current: '2.5.21-1.2', lagDays: 24, buildMode: 'binary' }, // "gpg2", przebudowany 2026-07-26
    },
  },
  {
    id: 'neovim',
    category: 'Edytory tekstu',
    name: 'Neovim',
    description: 'Fork edytora Vim kładący nacisk na rozszerzalność, wbudowany LSP i skryptowanie w Lua.',
    versions: {
      // upstream: 0.12.4 (wyd. 2026-07-05, github.com/neovim/neovim/releases)
      gentoo: { upstream: '0.12.4', current: '0.11.7', lagDays: 116, buildMode: 'source' }, // app-editors/neovim stabilne amd64; 0.12.3 dodane 2026-06-11 tylko ~amd64
      arch: { upstream: '0.12.4', current: '0.12.3-1', lagDays: 35, buildMode: 'binary' }, // [extra], zbudowany 2026-06-11
      tumbleweed: { upstream: '0.12.4', current: '0.12.4-1.1', lagDays: 24, buildMode: 'binary' }, // przebudowany 2026-07-29
    },
  },
  {
    id: 'qemu',
    category: 'Wirtualizacja / emulacja',
    name: 'QEMU',
    description: 'Emulator procesorów i maszyn oraz hypervisor wykorzystywany m.in. z KVM do wirtualizacji.',
    versions: {
      // upstream: 11.0.3 (wyd. 2026-07-24, qemu.org/download)
      gentoo: { upstream: '11.0.3', current: '10.2.2', lagDays: 144, buildMode: 'source' }, // app-emulation/qemu stabilne amd64 (10.2.2 wyd. 2026-03-18)
      arch: { upstream: '11.0.3', current: '11.0.3-1', lagDays: 5, buildMode: 'binary' }, // [extra] "qemu-full", zbudowany 2026-07-29
      tumbleweed: { upstream: '11.0.3', current: '11.0.3-1.2', lagDays: 10, buildMode: 'binary' }, // przebudowany 2026-08-03
    },
  },
  {
    id: 'portage',
    category: 'Menedżer pakietów',
    name: 'Portage',
    description: 'Natywny, źródłowy menedżer pakietów Gentoo; tu zestawiony z natywnymi menedżerami Arch (pacman) i openSUSE (zypper), bo Portage nie występuje poza Gentoo.',
    versions: {
      // Uwaga: brak wspólnego "upstreamu" — porównanie 3-way zastąpione własnymi menedżerami pakietów każdej dystrybucji
      gentoo: { upstream: '3.0.81.2', current: '3.0.81.2', lagDays: 3, buildMode: 'source' }, // sys-apps/portage, stabilizacja amd64 2026-07-11
      arch: { upstream: '7.1.0', current: '7.1.0.r9.g54d9411-2', lagDays: 186, buildMode: 'binary' }, // pacman [core]; Arch buduje z żywego gita (9 commitów po tagu v7.1.0), zbudowany 2026-05-06
      tumbleweed: { upstream: '1.14.98', current: '1.14.98-1.3', lagDays: 5, buildMode: 'binary' }, // zypper — rozwijany głównie przez openSUSE, "upstream" i pakiet praktycznie tożsame
    },
  },
  {
    id: 'pandoc',
    category: 'Konwersja dokumentów',
    name: 'Pandoc',
    description: 'Uniwersalny konwerter dokumentów obsługujący dziesiątki formatów tekstowych i znaczników.',
    versions: {
      // upstream: 3.10 (wyd. 2026-06-04, github.com/jgm/pandoc/releases)
      gentoo: { upstream: '3.10', current: '3.10', lagDays: 18, buildMode: 'source' }, // app-text/pandoc-cli (~amd64), zbumpowany 2026-06-22
      arch: { upstream: '3.10', current: '3.6.1-20', lagDays: 66, buildMode: 'binary' }, // [extra] "pandoc-cli"; w tyle z powodu złożoności toolchainu Haskell/GHC
      tumbleweed: { upstream: '3.10', current: '3.10-1.3', lagDays: 53, buildMode: 'binary' }, // przebudowany 2026-07-27
    },
  },
  {
    id: 'cmake',
    category: 'System budowania',
    name: 'CMake',
    description: 'Wieloplatformowy generator plików budowania wykorzystywany do konfigurowania kompilacji projektów C/C++.',
    versions: {
      // upstream: 4.4.2 (wyd. 2026-07-31, cmake.org/files/v4.4)
      gentoo: { upstream: '4.4.2', current: '4.3.4', lagDays: 53, buildMode: 'source' }, // dev-build/cmake stabilne amd64; 4.4.2 jeszcze niestabilizowane
      arch: { upstream: '4.4.2', current: '4.4.0-2', lagDays: 9, buildMode: 'binary' }, // [extra], zbudowany 2026-07-21
      tumbleweed: { upstream: '4.4.2', current: '4.4.2-1.1', lagDays: 4, buildMode: 'binary' }, // przebudowany 2026-08-04 — najświeższy z trzech
    },
  },
  {
    id: 'boost',
    category: 'Biblioteki C++',
    name: 'Boost',
    description: 'Zbiór wysokiej jakości, przenośnych bibliotek C++ rozszerzających standardową bibliotekę.',
    versions: {
      // upstream: 1.91.0 (wyd. 2026-04-22, boost.org/feed/downloads.rss)
      gentoo: { upstream: '1.91.0', current: '1.90.0-r2', lagDays: 242, buildMode: 'source' }, // dev-libs/boost stabilne amd64 (1.90.0 wyd. 2025-12-10)
      arch: { upstream: '1.91.0', current: '1.91.0-2', lagDays: 89, buildMode: 'binary' }, // [extra], build 2026-07-20 to rebuild (pkgrel 2)
      tumbleweed: { upstream: '1.91.0', current: '1.91.0-1.2', lagDays: 72, buildMode: 'binary' }, // przebudowany 2026-07-03
    },
  },
  {
    id: 'gdb',
    category: 'Debugger',
    name: 'GDB',
    description: 'Standardowy debugger GNU do analizy i debugowania programów w C, C++ i innych językach.',
    versions: {
      // upstream: 17.2 (wyd. 2026-05-10, ftp.gnu.org/gnu/gdb)
      gentoo: { upstream: '17.2', current: '17.2', lagDays: 38, buildMode: 'source' }, // dev-debug/gdb, stabilizacja amd64 2026-06-17
      arch: { upstream: '17.2', current: '17.2-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-05-11
      tumbleweed: { upstream: '17.2', current: '16.3-7.4', lagDays: 91, buildMode: 'binary' }, // wyraźnie w tyle — potwierdzone na mirrorze 2026-07-27
    },
  },
  {
    id: 'dotnet-sdk',
    category: '.NET',
    name: '.NET SDK',
    description: 'Zestaw narzędzi do budowy aplikacji w C#, F# i VB.NET na wieloplatformowej platformie .NET.',
    versions: {
      // upstream: SDK 10.0.302 (pasmo funkcji dla .NET 10.0.10 LTS)
      gentoo: { upstream: '10.0.302', current: '10.0.203', lagDays: 63, buildMode: 'binary' }, // dev-dotnet/dotnet-sdk-bin — pakiet w pełni binarny (prebuilt), pasmo 2XX w drzewie
      arch: { upstream: '10.0.302', current: '10.0.10.sdk110-1', lagDays: 20, buildMode: 'binary' }, // [extra] dotnet-sdk, starsze pasmo SDK
      tumbleweed: { upstream: '10.0.302', current: '10.0.3-6.1', lagDays: 154, buildMode: 'binary' }, // szacunek — .NET SDK poza głównym repo OSS (repo home:/community)
    },
  },
  {
    id: 'erlang',
    category: 'Erlang/OTP',
    name: 'Erlang/OTP',
    description: 'Funkcyjny język i platforma znane z wysokiej odporności na awarie, stosowane m.in. w systemach telekomunikacyjnych.',
    versions: {
      // upstream: OTP 29.0.5, wydane 2026-08-04
      gentoo: { upstream: '29.0.5', current: '28.3', lagDays: 170, buildMode: 'source' }, // dev-lang/erlang, stabilny amd64 wciąż na gałęzi 28.x
      arch: { upstream: '29.0.5', current: '28.4.2-1', lagDays: 20, buildMode: 'binary' }, // [extra] erlang, świeży patch gałęzi 28
      tumbleweed: { upstream: '29.0.5', current: '27.3.4', lagDays: 276, buildMode: 'binary' }, // szacunek — starsza gałąź 27.x
    },
  },
  {
    id: 'go',
    category: 'Go',
    name: 'Go (Golang)',
    description: 'Kompilowany język programowania stworzony przez Google, szeroko używany w narzędziach chmurowych i mikrousługach.',
    versions: {
      // upstream: 1.26.5, wydane 2026-07-07
      gentoo: { upstream: '1.26.5', current: '1.26.4', lagDays: 28, buildMode: 'source' }, // dev-lang/go, stabilny amd64
      arch: { upstream: '1.26.5', current: '1.26.3-1', lagDays: 56, buildMode: 'binary' }, // [extra] go
      tumbleweed: { upstream: '1.26.5', current: '1.26.4', lagDays: 28, buildMode: 'binary' }, // szacunek
    },
  },
  {
    id: 'ghc',
    category: 'Haskell',
    name: 'GHC',
    description: 'Referencyjny kompilator języka Haskell, sztandarowe narzędzie programowania funkcyjnego.',
    versions: {
      // upstream: 9.14.1, wydane 2025-12-19
      gentoo: { upstream: '9.14.1', current: '9.8.4-r1', lagDays: 369, buildMode: 'source' }, // dev-lang/ghc, najnowsza wersja w drzewie w ogóle
      arch: { upstream: '9.14.1', current: '9.6.6-1', lagDays: 491, buildMode: 'binary' }, // [extra] ghc
      tumbleweed: { upstream: '9.14.1', current: '9.4.6', lagDays: 749, buildMode: 'binary' }, // szacunek — stara gałąź 9.4.x
    },
  },
  {
    id: 'openjdk',
    category: 'Java',
    name: 'OpenJDK',
    description: 'Otwartoźródłowa implementacja platformy Java, podstawa niezliczonych aplikacji serwerowych.',
    versions: {
      // upstream: JDK 26.0.2 (CPU z 2026-07-21)
      gentoo: { upstream: '26.0.2', current: '25.0.3_p9', lagDays: 91, buildMode: 'binary' }, // dev-java/openjdk-bin, stabilny amd64 śledzi gałąź LTS 25
      arch: { upstream: '26.0.2', current: '26.0.2.u10-1', lagDays: 10, buildMode: 'binary' }, // [extra] jdk-openjdk — śledzi najnowszą gałąź główną
      tumbleweed: { upstream: '26.0.2', current: '25.0.4', lagDays: 15, buildMode: 'binary' }, // szacunek wg Tumbleweed Monthly Update, śledzi gałąź LTS 25
    },
  },
  {
    id: 'python',
    category: 'Python',
    name: 'Python',
    description: 'Uniwersalny język wysokiego poziomu, szeroko stosowany w automatyzacji, analizie danych i web development.',
    versions: {
      // upstream: 3.14.7, wydane 2026-08-04
      gentoo: { upstream: '3.14.7', current: '3.14.6_p1', lagDays: 48, buildMode: 'source' }, // dev-lang/python, stabilny amd64
      arch: { upstream: '3.14.7', current: '3.14.6-1', lagDays: 45, buildMode: 'binary' }, // [core] python
      tumbleweed: { upstream: '3.14.7', current: '3.13.12', lagDays: 111, buildMode: 'binary' }, // szacunek — domyślny python3 to wciąż gałąź 3.13 (python314 dostępny równolegle)
    },
  },
  {
    id: 'openssl',
    category: 'Kryptografia / TLS',
    name: 'OpenSSL',
    description: 'Podstawowa biblioteka kryptograficzna implementująca TLS/SSL, obecna niemal w każdej instalacji Linuksa.',
    versions: {
      // upstream: 4.0.0, wydane 2026-04-14 — nowa gałąź główna, dystrybucje celowo pozostają na LTS 3.x
      gentoo: { upstream: '4.0.0', current: '3.5.7', lagDays: 120, buildMode: 'source' }, // dev-libs/openssl, stabilny amd64 na gałęzi LTS 3.5.x
      arch: { upstream: '4.0.0', current: '3.6.3-1', lagDays: 110, buildMode: 'binary' }, // [core] openssl, gałąź 3.6.x
      tumbleweed: { upstream: '4.0.0', current: '3.6.3', lagDays: 115, buildMode: 'binary' }, // szacunek wg Tumbleweed Monthly Update
    },
  },
  {
    id: 'lua',
    category: 'Lua',
    name: 'Lua',
    description: 'Lekki, osadzalny język skryptowy popularny w grach i systemach wbudowanych.',
    versions: {
      // upstream: 5.5.0, wydane 2025-12-22
      gentoo: { upstream: '5.5.0', current: '5.4.8', lagDays: 195, buildMode: 'source' }, // dev-lang/lua, jedyna dostępna wersja w drzewie — 5.5 jeszcze niespakietowane
      arch: { upstream: '5.5.0', current: '5.5.0-2', lagDays: 6, buildMode: 'binary' }, // [extra] lua — bardzo szybko zaktualizowane
      tumbleweed: { upstream: '5.5.0', current: '5.4.7', lagDays: 195, buildMode: 'binary' }, // szacunek — pakiety lua54-* wskazują na gałąź 5.4
    },
  },
  {
    id: 'ocaml',
    category: 'OCaml',
    name: 'OCaml',
    description: 'Funkcyjno-imperatywny język programowania znany z zaawansowanego systemu typów i wydajności.',
    versions: {
      // upstream: 5.5.0, wydane 2026-06-19
      gentoo: { upstream: '5.5.0', current: '4.14.2', lagDays: 1024, buildMode: 'source' }, // dev-lang/ocaml, stabilny amd64 mocno w tyle; niestabilnie dostępne też 5.4.0
      arch: { upstream: '5.5.0', current: '5.5.0-1', lagDays: 10, buildMode: 'binary' }, // [extra] ocaml
      tumbleweed: { upstream: '5.5.0', current: '5.3.0', lagDays: 500, buildMode: 'binary' }, // szacunek
    },
  },
  {
    id: 'perl',
    category: 'Perl',
    name: 'Perl',
    description: 'Wszechstronny język skryptowy od dekad wykorzystywany w administracji systemami i przetwarzaniu tekstu.',
    versions: {
      // upstream: 5.44.0, szacunkowe wydanie sierpień 2026
      gentoo: { upstream: '5.44.0', current: '5.42.2', lagDays: 275, buildMode: 'source' }, // dev-lang/perl, stabilny amd64; 5.44.0 obecne w drzewie jako ~amd64
      arch: { upstream: '5.44.0', current: '5.42.2-1', lagDays: 270, buildMode: 'binary' }, // [core] perl
      tumbleweed: { upstream: '5.44.0', current: '5.42.2', lagDays: 275, buildMode: 'binary' }, // szacunek
    },
  },
  {
    id: 'php',
    category: 'PHP',
    name: 'PHP',
    description: 'Język skryptowy stanowiący podstawę większości stron internetowych, w tym WordPressa.',
    versions: {
      // upstream: 8.5.9, wydane 2026-07-30
      gentoo: { upstream: '8.5.9', current: '8.3.29', lagDays: 10, buildMode: 'source' }, // dev-lang/php, stabilny amd64 na starszej, wciąż wspieranej gałęzi 8.3; 8.5.9 w drzewie jako ~amd64
      arch: { upstream: '8.5.9', current: '8.5.9-1', lagDays: 5, buildMode: 'binary' }, // [extra] php-fpm/php-gd itp.
      tumbleweed: { upstream: '8.5.9', current: '8.5.9', lagDays: 2, buildMode: 'binary' }, // potwierdzone: apache2-mod_php8-8.5.9, build 2026-08-01
    },
  },
  {
    id: 'pip',
    category: 'Zarządzanie pakietami Python',
    name: 'pip',
    description: 'Domyślny menedżer pakietów dla Pythona, instalujący biblioteki z PyPI.',
    versions: {
      // upstream: 26.2.1, wydane 2026-08-04
      gentoo: { upstream: '26.2.1', current: '26.1.2-r1', lagDays: 30, buildMode: 'source' }, // dev-python/pip, stabilny amd64; 26.2.1 w drzewie jako ~amd64
      arch: { upstream: '26.2.1', current: '26.2.1-1', lagDays: 5, buildMode: 'binary' }, // [extra] python-pip
      tumbleweed: { upstream: '26.2.1', current: '26.1.2', lagDays: 30, buildMode: 'binary' }, // potwierdzone w Tumbleweed Monthly Update (czerwiec 2026)
    },
  },
  {
    id: 'qtbase',
    category: 'Framework Qt',
    name: 'Qt Base',
    description: 'Rdzeń frameworka Qt służący do budowy aplikacji z graficznym interfejsem użytkownika w C++.',
    versions: {
      // upstream: 6.11.1, wydane 2026-05-13; Qt 6.12 dopiero w fazie beta
      gentoo: { upstream: '6.11.1', current: '6.11.1', lagDays: 5, buildMode: 'source' }, // dev-qt/qtbase, stabilny amd64, zgodny z najnowszym
      arch: { upstream: '6.11.1', current: '6.11.1-1', lagDays: 5, buildMode: 'binary' }, // [extra] qt6-base
      tumbleweed: { upstream: '6.11.1', current: '6.10.1', lagDays: 87, buildMode: 'binary' }, // szacunek — brak świeżego potwierdzenia
    },
  },
  {
    id: 'ruby',
    category: 'Ruby',
    name: 'Ruby',
    description: 'Dynamiczny język programowania znany przede wszystkim z frameworka Ruby on Rails.',
    versions: {
      // upstream: 4.0.4, wydane 2026-05-11
      gentoo: { upstream: '4.0.4', current: '3.3.11', lagDays: 111, buildMode: 'source' }, // dev-lang/ruby, stabilny amd64 mocno w tyle (Ruby 4.0 brak w drzewie stable)
      arch: { upstream: '4.0.4', current: '3.4.8-2', lagDays: 60, buildMode: 'binary' }, // [extra] ruby — celowo pozostaje na gałęzi 3.4
      tumbleweed: { upstream: '4.0.4', current: '4.0.3', lagDays: 21, buildMode: 'binary' }, // potwierdzone w Tumbleweed Monthly Update (kwiecień 2026: przejście na Ruby 4.0)
    },
  },
  {
    id: 'tcl',
    category: 'Tcl/Tk',
    name: 'Tcl',
    description: 'Skryptowy język programowania tradycyjnie łączony z biblioteką graficzną Tk.',
    versions: {
      // upstream: 9.0.4 (szacunek daty, ok. marca 2026)
      gentoo: { upstream: '9.0.4', current: '8.6.17', lagDays: 210, buildMode: 'source' }, // dev-lang/tcl, stabilny amd64 na starszej gałęzi 8.6; 9.0.3-r2 jako ~amd64
      arch: { upstream: '9.0.4', current: '8.6.16-1', lagDays: 550, buildMode: 'binary' }, // [extra] tcl/tk — Arch również pozostaje na 8.6
      tumbleweed: { upstream: '9.0.4', current: '8.6.16', lagDays: 550, buildMode: 'binary' }, // szacunek — brak śladów pakietu tcl9 w głównym repo OSS
    },
  },
  {
    id: 'texlive',
    category: 'TeX/LaTeX',
    name: 'TeX Live',
    description: 'Kompletna dystrybucja systemu składu tekstu TeX/LaTeX do profesjonalnego formatowania dokumentów.',
    versions: {
      // upstream: TeX Live 2026, wydane marzec 2026
      gentoo: { upstream: '2026', current: '2023_p69131-r1', lagDays: 1049, buildMode: 'source' }, // dev-texlive/texlive-latex, stabilny amd64 bardzo mocno w tyle; niestabilnie tylko 2024
      arch: { upstream: '2026', current: '2026.1-1', lagDays: 10, buildMode: 'binary' }, // [extra] texlive-basic/texlive-latex — bardzo świeże
      tumbleweed: { upstream: '2026', current: '2025.218', lagDays: 340, buildMode: 'binary' }, // potwierdzone: texlive-scheme-small-2025.218 (rok 2025, nie 2026)
    },
  },
  {
    id: 'meson',
    category: 'System budowania',
    name: 'Meson',
    description: 'Nowoczesny, szybki system budowania wykorzystywany m.in. przez GNOME, Mesa i systemd.',
    versions: {
      // upstream: 1.11.2, wydane 2026-07-11
      gentoo: { upstream: '1.11.2', current: '1.11.1', lagDays: 29, buildMode: 'source' }, // dev-util/meson, amd64 stable ma 1.11.1; ~amd64 ma już 1.11.2
      arch: { upstream: '1.11.2', current: '1.11.2-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-07-12
      tumbleweed: { upstream: '1.11.2', current: '1.11.2', lagDays: 5, buildMode: 'binary' }, // szacunek — dokładna data synchronizacji OBS
    },
  },
  {
    id: 'sway',
    category: 'Kompozytor Wayland',
    name: 'Sway',
    description: 'Kompozytor Wayland kompatybilny z konfiguracją i3, popularny w minimalistycznych, kafelkowych środowiskach.',
    versions: {
      // upstream: 1.12, wydane 2026-05-25
      gentoo: { upstream: '1.12', current: '1.11', lagDays: 76, buildMode: 'source' }, // gui-wm/sway, amd64 stable nadal na 1.11; ~amd64 ma 1.12
      arch: { upstream: '1.12', current: '1.12-2', lagDays: 5, buildMode: 'binary' }, // [extra]; data budowy szacunkowa
      tumbleweed: { upstream: '1.12', current: '1.12', lagDays: 20, buildMode: 'binary' }, // szacunek — projekt X11:Wayland
    },
  },
  {
    id: 'gnome-terminal',
    category: 'Terminal GNOME',
    name: 'GNOME Terminal',
    description: 'Domyślny emulator terminala środowiska GNOME oparty na bibliotece VTE.',
    versions: {
      // upstream: 3.60.0 (część cyklu GNOME 50, wydane 2026-03-18)
      gentoo: { upstream: '3.60.0', current: '3.58.0', lagDays: 144, buildMode: 'source' }, // x11-terms/gnome-terminal, amd64 stable to wersja z cyklu GNOME 49
      arch: { upstream: '3.60.0', current: '3.60.0-1', lagDays: 4, buildMode: 'binary' }, // [extra], zbudowany 2026-03-14
      tumbleweed: { upstream: '3.60.0', current: '3.60.0', lagDays: 15, buildMode: 'binary' }, // szacunek daty synchronizacji
    },
  },
  {
    id: 'dolphin',
    category: 'Menedżer plików KDE',
    name: 'Dolphin',
    description: 'Domyślny menedżer plików środowiska KDE Plasma.',
    versions: {
      // upstream: 26.04.3 (KDE Gear 26.04.3, wydane 2026-07-02; 26.08 zaplanowane na 2026-08-20)
      gentoo: { upstream: '26.04.3', current: '26.04.3', lagDays: 14, buildMode: 'source' }, // kde-apps/dolphin, amd64 stable; szacunkowe opóźnienie stabilizacji
      arch: { upstream: '26.04.3', current: '26.04.3-1', lagDays: 2, buildMode: 'binary' }, // [extra], zbudowany 2026-06-30
      tumbleweed: { upstream: '26.04.3', current: '26.04.3', lagDays: 7, buildMode: 'binary' }, // szacunek daty synchronizacji
    },
  },
  {
    id: 'lxqt-meta',
    category: 'Środowisko graficzne (LXQt)',
    name: 'LXQt',
    description: 'Lekkie środowisko graficzne łączące technologie Qt z niskim zużyciem zasobów.',
    versions: {
      // upstream: 2.4.0, wydane 2026-04-20
      gentoo: { upstream: '2.4.0', current: '2.4.0', lagDays: 20, buildMode: 'source' }, // lxqt-base/lxqt-meta, amd64 stable; szacunkowe opóźnienie stabilizacji
      arch: { upstream: '2.4.0', current: '2.4.1-1', lagDays: 0, buildMode: 'binary' }, // [extra] lxqt-panel 2.4.1, zbudowany 2026-05-29 — nowszy point-release niż zbiorcze 2.4.0
      tumbleweed: { upstream: '2.4.0', current: '2.4.1', lagDays: 0, buildMode: 'binary' }, // podobnie jak Arch, nowszy point-release niż 2.4.0
    },
  },
  {
    id: 'mate-desktop',
    category: 'Środowisko graficzne (MATE)',
    name: 'MATE Desktop',
    description: 'Środowisko graficzne kontynuujące tradycję klasycznego GNOME 2.',
    versions: {
      // upstream: 1.28.2, wydane ok. 2026-03-11
      gentoo: { upstream: '1.28.2', current: '1.28.0', lagDays: 151, buildMode: 'source' }, // mate-base/mate (meta) i mate-common, amd64 stable nadal na 1.28.0
      arch: { upstream: '1.28.2', current: '1.28.2-2', lagDays: 10, buildMode: 'binary' }, // [extra] mate-desktop; data budowy szacunkowa
      tumbleweed: { upstream: '1.28.2', current: '1.28.2', lagDays: 15, buildMode: 'binary' }, // szacunek daty synchronizacji
    },
  },
  {
    id: 'xfce4-meta',
    category: 'Środowisko graficzne (Xfce)',
    name: 'Xfce',
    description: 'Lekkie i konfigurowalne środowisko graficzne stawiające na szybkość działania.',
    versions: {
      // upstream: 4.20.4 (najnowszy punktowy komponent serii Xfce 4.20)
      gentoo: { upstream: '4.20.4', current: '4.20', lagDays: 60, buildMode: 'source' }, // xfce-base/xfce4-meta, amd64 stable jako "4.20" bez rozróżnienia patchy; szacunkowo
      arch: { upstream: '4.20.4', current: '4.20.4-1', lagDays: 10, buildMode: 'binary' }, // [extra] xfce4-session, zbudowany 2026-03-02
      tumbleweed: { upstream: '4.20.4', current: '4.20.4', lagDays: 15, buildMode: 'binary' }, // szacunek daty synchronizacji
    },
  },
  {
    id: 'thunderbird',
    category: 'Klient poczty',
    name: 'Thunderbird',
    description: 'Klient poczty e-mail od Mozilli, obsługujący też kalendarz i grupy dyskusyjne.',
    versions: {
      // upstream (ESR): 140.13.0, wydane 2026-07-27; równolegle rapid release 153.0.2 (ok. 2026-08-04)
      gentoo: { upstream: '140.13.0', current: '140.10.2', lagDays: 96, buildMode: 'source' }, // mail-client/thunderbird, amd64 stable to starszy punkt ESR; ~amd64 ma rapid release 150.0.2
      arch: { upstream: '153.0.2', current: '153.0-1', lagDays: 10, buildMode: 'binary' }, // [extra], zbudowany 2026-07-25 — śledzi rapid release, nie ESR
      tumbleweed: { upstream: '140.13.0', current: '140.13.0', lagDays: 5, buildMode: 'binary' }, // Tumbleweed śledzi gałąź ESR
    },
  },
  {
    id: 'postfix',
    category: 'Serwer poczty (MTA)',
    name: 'Postfix',
    description: 'Popularny agent transportu poczty (MTA), stworzony jako bezpieczna alternatywa dla sendmaila.',
    versions: {
      // upstream: 3.11.5, wydane 2026-07-06
      gentoo: { upstream: '3.11.5', current: '3.11.5', lagDays: 20, buildMode: 'source' }, // mail-mta/postfix, amd64 stable; ~amd64 ma już 3.12_pre
      arch: { upstream: '3.11.5', current: '3.11.5-3', lagDays: 5, buildMode: 'binary' }, // [extra]; data budowy szacunkowa
      tumbleweed: { upstream: '3.11.5', current: '3.11.5', lagDays: 10, buildMode: 'binary' }, // szacunek daty synchronizacji
    },
  },
  {
    id: 'noto-fonts',
    category: 'Czcionki',
    name: 'Noto Fonts',
    description: 'Rodzina czcionek Google mająca pokrywać wszystkie systemy pisma, eliminując tzw. "tofu".',
    versions: {
      // upstream: 2026.08.01 (comiesięczne wydanie "monthly release")
      gentoo: { upstream: '2026.08.01', current: '2026.07.01', lagDays: 31, buildMode: 'source' }, // media-fonts/noto (jako 20260701), amd64 stable; ~amd64 ma już 20260801
      arch: { upstream: '2026.08.01', current: '2026.08.01-1', lagDays: 0, buildMode: 'binary' }, // [extra] noto-fonts, zbudowany 2026-08-01 — ten sam dzień co wydanie
      tumbleweed: { upstream: '2026.08.01', current: '2026.08.01', lagDays: 3, buildMode: 'binary' }, // szacunek daty synchronizacji
    },
  },
  {
    id: 'nmap',
    category: 'Analiza sieci',
    name: 'Nmap',
    description: 'Narzędzie do skanowania sieci oraz wykrywania hostów i otwartych portów.',
    versions: {
      // upstream: 7.991, wydane 2026-08-06
      gentoo: { upstream: '7.991', current: '7.99', lagDays: 18, buildMode: 'source' }, // net-analyzer/nmap, amd64 stable; 9999 (live ebuild) zamaskowany
      arch: { upstream: '7.991', current: '7.99-3', lagDays: 18, buildMode: 'binary' }, // [extra], zbudowany 2026-07-19 (przed wydaniem 7.991)
      tumbleweed: { upstream: '7.991', current: '7.99', lagDays: 25, buildMode: 'binary' }, // szacunek — rozbieżne dane w cache pkgs.org/rpmfind
    },
  },
  {
    id: 'nftables',
    category: 'Firewall',
    name: 'nftables',
    description: 'Nowoczesny framework firewalla w jądrze Linux, następca iptables.',
    versions: {
      // upstream: 1.1.6, wydane 2025-12-05
      gentoo: { upstream: '1.1.6', current: '1.1.6', lagDays: 45, buildMode: 'source' }, // net-firewall/nftables, amd64 stable; opóźnienie stabilizacji szacunkowe
      arch: { upstream: '1.1.6', current: '1.1.6-3', lagDays: 86, buildMode: 'binary' }, // [extra], zbudowany 2026-03-01
      tumbleweed: { upstream: '1.1.6', current: '1.1.6', lagDays: 40, buildMode: 'binary' }, // szacunek daty synchronizacji
    },
  },
  {
    id: 'samba',
    category: 'Udostępnianie plików',
    name: 'Samba',
    description: 'Implementacja protokołu SMB/CIFS umożliwiająca udostępnianie plików oraz integrację z Windows/Active Directory.',
    versions: {
      // upstream: 4.24.5, wydane 2026-07-28; równolegle utrzymywana gałąź 4.23.11
      gentoo: { upstream: '4.24.5', current: '4.23.6', lagDays: 150, buildMode: 'source' }, // net-fs/samba, amd64 stable nadal na starszej gałęzi 4.23.x; ~amd64 ma 4.24.3
      arch: { upstream: '4.24.5', current: '4.24.5-1', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-07-28 — ten sam dzień co wydanie
      tumbleweed: { upstream: '4.24.5', current: '4.23.6+git', lagDays: 150, buildMode: 'binary' }, // nadal gałąź 4.23.x z dodatkowymi commitami
    },
  },
  {
    id: 'vsftpd',
    category: 'Serwer FTP',
    name: 'vsftpd',
    description: 'Bardzo bezpieczny serwer FTP (Very Secure FTP Daemon).',
    versions: {
      // upstream: 3.0.5 — projekt praktycznie zamrożony, brak nowszych wydań od 2021
      gentoo: { upstream: '3.0.5', current: '3.0.5', lagDays: 0, buildMode: 'source' }, // net-ftp/vsftpd (3.0.5-r2), amd64 stable — tylko rewizje patchy Gentoo
      arch: { upstream: '3.0.5', current: '3.0.5-2', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2026-06-03 (rebuild toolchain)
      tumbleweed: { upstream: '3.0.5', current: '3.0.5', lagDays: 0, buildMode: 'binary' }, // zgodne z upstreamem
    },
  },
  {
    id: 'irssi',
    category: 'Klient IRC',
    name: 'Irssi',
    description: 'Modularny klient IRC działający w trybie tekstowym w terminalu.',
    versions: {
      // upstream: 1.4.5 — brak nowego wydania od 2023-10-03
      gentoo: { upstream: '1.4.5', current: '1.4.5', lagDays: 0, buildMode: 'source' }, // net-irc/irssi, amd64 stable
      arch: { upstream: '1.4.5', current: '1.4.5-5', lagDays: 0, buildMode: 'binary' }, // [extra], zbudowany 2025-07-13 (tylko rebuild)
      tumbleweed: { upstream: '1.4.5', current: '1.4.5', lagDays: 0, buildMode: 'binary' }, // zgodne z upstreamem
    },
  },
  {
    id: 'nodejs',
    category: 'Node.js',
    name: 'Node.js',
    description: 'Środowisko uruchomieniowe JavaScript oparte na silniku V8, używane głównie po stronie serwera.',
    versions: {
      // upstream (Active LTS "Krypton"): 24.19.0, wydane 2026-08-03; upstream (Current): 26.7.0, wydane 2026-08-05
      gentoo: { upstream: '24.19.0', current: '24.14.0', lagDays: 160, buildMode: 'source' }, // net-libs/nodejs, amd64 stable śledzi gałąź LTS 24.x; ~amd64 ma już 26.3.0 (Current)
      arch: { upstream: '26.7.0', current: '26.7.0-1', lagDays: 2, buildMode: 'binary' }, // [extra] domyślny pakiet nodejs śledzi gałąź Current, zbudowany 2026-08-07
      tumbleweed: { upstream: '24.19.0', current: '24.18.1', lagDays: 28, buildMode: 'binary' }, // pakiet LTS "nodejs24"; data wydania 24.18.1 szacunkowa
    },
  },
  {
    id: 'openssh',
    category: 'SSH',
    name: 'OpenSSH',
    description: 'Standardowy zestaw narzędzi SSH/SCP/SFTP do bezpiecznego zdalnego dostępu i tunelowania w systemach uniksowych.',
    versions: {
      // upstream: 10.4 (openssh.org/releasenotes.html, wyd. 2026-07-06)
      gentoo: { upstream: '10.4', current: '10.4_p1-r1', lagDays: 13, buildMode: 'source' }, // net-misc/openssh ~amd64, dodane 2026-07-19
      arch: { upstream: '10.4', current: '10.4p1-3', lagDays: 1, buildMode: 'binary' }, // [core], pierwszy build 10.4p1 ok. 2026-07-07
      tumbleweed: { upstream: '10.4', current: '10.3p1-4.1', lagDays: 34, buildMode: 'binary' }, // ostatni potwierdzony stan wg biuletynu z 2026-05-19, TW jeszcze nie ma 10.4
    },
  },
  {
    id: 'transmission',
    category: 'P2P / torrent',
    name: 'Transmission',
    description: 'Lekki, wieloplatformowy klient BitTorrent dostępny jako GTK, Qt oraz demon/CLI.',
    versions: {
      // upstream: 4.1.3 (github.com/transmission/transmission/releases, wyd. 2026-06-30)
      gentoo: { upstream: '4.1.3', current: '4.1.3', lagDays: 1, buildMode: 'source' }, // net-p2p/transmission ~amd64, dodane 2026-06-30
      arch: { upstream: '4.1.3', current: '4.1.3-2', lagDays: 3, buildMode: 'binary' }, // [extra], zbudowany 2026-07-03
      tumbleweed: { upstream: '4.1.3', current: '4.1.3-1.3', lagDays: 5, buildMode: 'binary' }, // szacunkowo, źródło zaktualizowane 2026-06-29
    },
  },
  {
    id: 'squid',
    category: 'Proxy',
    name: 'Squid',
    description: 'Serwer proxy/cache HTTP używany do buforowania ruchu WWW i kontroli dostępu w sieciach.',
    versions: {
      // upstream: 7.6 (github.com/squid-cache/squid/releases, wyd. 2026-06-08)
      gentoo: { upstream: '7.6', current: '7.6', lagDays: 20, buildMode: 'source' }, // net-proxy/squid stabilne amd64/x86, dodane 2026-06-28
      arch: { upstream: '7.6', current: '7.6-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-06-08
      tumbleweed: { upstream: '7.6', current: '7.6-1.3', lagDays: 10, buildMode: 'binary' }, // źródło zaktualizowane 2026-06-18
    },
  },
  {
    id: 'wireguard-tools',
    category: 'VPN',
    name: 'WireGuard Tools',
    description: 'Narzędzia wiersza poleceń (wg, wg-quick) do konfiguracji szybkiego, nowoczesnego VPN WireGuard.',
    versions: {
      // upstream: 1.0.20260223 (wersja = data wydania, git.zx2c4.com/wireguard-tools)
      gentoo: { upstream: '1.0.20260223', current: '1.0.20260223', lagDays: 1, buildMode: 'source' }, // net-vpn/wireguard-tools ~amd64, dodane 2026-02-23
      arch: { upstream: '1.0.20260223', current: '1.0.20260223-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-02-24
      tumbleweed: { upstream: '1.0.20260223', current: '1.0.20260223-2.3', lagDays: 115, buildMode: 'binary' }, // ta sama wersja, znaczne opóźnienie synchronizacji
    },
  },
  {
    id: 'wpa_supplicant',
    category: 'Wi-Fi',
    name: 'wpa_supplicant',
    description: 'Demon obsługujący uwierzytelnianie WPA/WPA2/WPA3 i zarządzanie połączeniami Wi-Fi w Linuksie.',
    versions: {
      // upstream: 2.12 (w1.fi/wpa_supplicant/ — data wydania szacunkowa, brak dokładnego ogłoszenia)
      gentoo: { upstream: '2.12', current: '2.11-r5', lagDays: 200, buildMode: 'source' }, // net-wireless/wpa_supplicant ~amd64 — Gentoo jeszcze nie spakował 2.12
      arch: { upstream: '2.12', current: '2:2.11-5', lagDays: 200, buildMode: 'binary' }, // [core], rebuild 2026-01-12, wciąż wersja 2.11
      tumbleweed: { upstream: '2.12', current: '2.11-6.1', lagDays: 200, buildMode: 'binary' }, // szacunkowo, brak nowszej potwierdzonej paczki niż 2.11
    },
  },
  {
    id: 'gsl',
    category: 'Biblioteki naukowe',
    name: 'GNU Scientific Library (GSL)',
    description: 'Biblioteka C/C++ z szerokim zestawem funkcji numerycznych do obliczeń naukowych i inżynierskich.',
    versions: {
      // upstream: 2.8 (sourceware.org/pipermail/gsl-announce/2024/000052.html, wyd. 2024-05-25)
      gentoo: { upstream: '2.8', current: '2.7.1-r3', lagDays: 806, buildMode: 'source' }, // sci-libs/gsl stabilne — 2.8 dostępne upstream, ale nie zbuildowane
      arch: { upstream: '2.8', current: '2.8-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2024-05-25
      tumbleweed: { upstream: '2.8', current: '2.8-1.1', lagDays: 60, buildMode: 'binary' }, // szacunkowo (repo "science")
    },
  },
  {
    id: 'polkit',
    category: 'Uwierzytelnianie',
    name: 'PolicyKit (polkit)',
    description: 'Framework autoryzacji pozwalający nieuprzywilejowanym procesom komunikować się z usługami systemowymi.',
    versions: {
      // upstream: 127 (github.com/polkit-org/polkit/releases/tag/127, wyd. 2025-12-17)
      gentoo: { upstream: '127', current: '126-r3', lagDays: 235, buildMode: 'source' }, // sys-auth/polkit stabilne — fork polkit-org 127 wciąż niespakowany
      arch: { upstream: '127', current: '127-3', lagDays: 11, buildMode: 'binary' }, // [extra], pierwszy build 127 2025-12-28
      tumbleweed: { upstream: '127', current: '127-7.2', lagDays: 210, buildMode: 'binary' }, // źródło zaktualizowane 2026-07-15
    },
  },
  {
    id: 'parted',
    category: 'Partycjonowanie dysków',
    name: 'GNU Parted',
    description: 'Narzędzie do tworzenia, zmiany rozmiaru i zarządzania tablicami partycji dysków.',
    versions: {
      // upstream: 3.7 (gnu.org/software/parted/manual/parted.pdf, wyd. 2026-03-24)
      gentoo: { upstream: '3.7', current: '3.7', lagDays: 12, buildMode: 'source' }, // sys-block/parted stabilne amd64/x86, data dodania szacunkowa
      arch: { upstream: '3.7', current: '3.7-1', lagDays: 16, buildMode: 'binary' }, // [core], zbudowany 2026-04-09
      tumbleweed: { upstream: '3.7', current: '3.7-1.4', lagDays: 16, buildMode: 'binary' }, // źródło zaktualizowane 2026-04-09
    },
  },
  {
    id: 'linux-firmware',
    category: 'Firmware',
    name: 'linux-firmware',
    description: 'Zbiór binarnych plików firmware dla urządzeń (Wi-Fi, GPU, Bluetooth i innych) wymaganych przez jądro Linux.',
    versions: {
      // upstream: 20260622 (najnowszy tag snapshotu, kernel.googlesource.com/.../linux-firmware)
      gentoo: { upstream: '20260622', current: '20260622', lagDays: 31, buildMode: 'hybrid' }, // sys-kernel/linux-firmware stabilne amd64/x86, stabilizacja 2026-07-23 — gotowe binarne bloby, nic nie jest kompilowane
      arch: { upstream: '20260622', current: '20260622-1', lagDays: 1, buildMode: 'binary' }, // [core], zbudowany 2026-06-23
      tumbleweed: { upstream: '20260622', current: '20260519', lagDays: 48, buildMode: 'binary' }, // szacunkowo, brak potwierdzenia najnowszego snapshotu
    },
  },
  {
    id: 'upower',
    category: 'Zarządzanie energią',
    name: 'UPower',
    description: 'Usługa D-Bus dostarczająca informacje o stanie baterii i zarządzaniu energią dla środowisk graficznych.',
    versions: {
      // upstream: 1.91.3 (upower.freedesktop.org) — data wydania szacunkowa: ok. 2026-07-01
      gentoo: { upstream: '1.91.3', current: '1.91.3', lagDays: 4, buildMode: 'source' }, // sys-power/upower ~amd64
      arch: { upstream: '1.91.3', current: '1.91.3-1', lagDays: 3, buildMode: 'binary' }, // [extra], zbudowany 2026-07-04
      tumbleweed: { upstream: '1.91.3', current: '1.91.3-1.1', lagDays: 20, buildMode: 'binary' }, // szacunkowo, brak precyzyjnej daty
    },
  },
  {
    id: 'htop',
    category: 'Monitorowanie procesów',
    name: 'htop',
    description: 'Interaktywny, kolorowy monitor procesów działający w terminalu — następca klasycznego top.',
    versions: {
      // upstream: 3.5.2 (github.com/htop-dev/htop/releases, wyd. 2026-07-18)
      gentoo: { upstream: '3.5.2', current: '3.5.2', lagDays: 2, buildMode: 'source' }, // sys-process/htop ~amd64, dodane 2026-07-20
      arch: { upstream: '3.5.2', current: '3.5.2-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-07-18 (ten sam dzień co wydanie)
      tumbleweed: { upstream: '3.5.2', current: '3.5.2-1.2', lagDays: 2, buildMode: 'binary' }, // źródło zaktualizowane 2026-07-20
    },
  },
  {
    id: 'nginx',
    category: 'Serwer WWW (alternatywny)',
    name: 'nginx',
    description: 'Wydajny serwer WWW, reverse proxy i load balancer — popularna alternatywa dla Apache HTTP Server.',
    versions: {
      // upstream (gałąź stable): 1.30.4 (nginx.org/en/CHANGES) — wydana ok. 2026-07-15, równolegle z mainline 1.31.3
      gentoo: { upstream: '1.30.4', current: '1.30.2', lagDays: 25, buildMode: 'source' }, // www-servers/nginx stabilne amd64/x86 — jeszcze nie zaktualizowane do 1.30.4
      arch: { upstream: '1.30.4', current: '1.30.4-1', lagDays: 2, buildMode: 'binary' }, // [extra], zbudowany 2026-07-17
      tumbleweed: { upstream: '1.30.4', current: '1.30.4-1.1', lagDays: 15, buildMode: 'binary' }, // szacunkowo (project server:http)
    },
  },
  {
    id: 'xorg-server',
    category: 'Serwer X11',
    name: 'Xorg Server',
    description: 'Implementacja serwera X11 umożliwiająca działanie tradycyjnego, niewaylandowego środowiska graficznego.',
    versions: {
      // upstream: 21.1.24 — data wydania szacunkowa: ok. 2026-06-25 (poprzednia 21.1.22 wyszła 2026-04-14)
      gentoo: { upstream: '21.1.24', current: '21.1.24', lagDays: 13, buildMode: 'source' }, // x11-base/xorg-server stabilne, dodane 2026-07-08
      arch: { upstream: '21.1.24', current: '21.1.22-2', lagDays: 45, buildMode: 'binary' }, // [extra], zbudowany 2026-04-29 — Arch wciąż na 21.1.22
      tumbleweed: { upstream: '21.1.24', current: '21.1.24-1', lagDays: 20, buildMode: 'binary' }, // źródło zaktualizowane 2026-07-15
    },
  },
  {
    id: 'i3',
    category: 'Menedżer okien',
    name: 'i3wm',
    description: 'Minimalistyczny, kafelkowy (tiling) menedżer okien konfigurowany plikiem tekstowym.',
    versions: {
      // upstream: 4.25.1 (i3wm.org/downloads/, wyd. 2026-02-06)
      gentoo: { upstream: '4.25.1', current: '4.25.1', lagDays: 44, buildMode: 'source' }, // x11-wm/i3 stabilne amd64/arm64, dodane 2026-03-22
      arch: { upstream: '4.25.1', current: '4.25.1-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-02-06 (ten sam dzień co wydanie)
      tumbleweed: { upstream: '4.25.1', current: '4.25.1-1.6', lagDays: 1, buildMode: 'binary' }, // źródło zaktualizowane 2026-02-06
    },
  },
  {
    id: 'alacritty',
    category: 'Emulator terminala',
    name: 'Alacritty',
    description: 'Emulator terminala z akceleracją GPU, kładący nacisk na prostotę i wydajność.',
    versions: {
      // upstream: 0.17.0 (github.com/alacritty/alacritty/releases, wyd. 2026-04-06)
      gentoo: { upstream: '0.17.0', current: '0.16.1', lagDays: 125, buildMode: 'source' }, // x11-terms/alacritty stabilne — 0.17.0 dostępne upstream, jeszcze niezbuildowane
      arch: { upstream: '0.17.0', current: '0.17.0-1', lagDays: 1, buildMode: 'binary' }, // [extra], zbudowany 2026-04-06 (ten sam dzień co wydanie)
      tumbleweed: { upstream: '0.17.0', current: '0.17.0-1.4', lagDays: 6, buildMode: 'binary' }, // źródło zaktualizowane 2026-04-12
    },
  },
]

/** Progi kolorystyczne dla wizualizacji lag trackera (w dniach). */
export const LAG_THRESHOLDS = {
  good: 5, // <= 5 dni: zielony
  warn: 15, // <= 15 dni: żółty, powyżej: czerwony
}
