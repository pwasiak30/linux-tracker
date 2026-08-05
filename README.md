# Linux Rolling Hub

Nowoczesna aplikacja webowa inspirowana DistroWatch, skupiona na praktycznych,
technicznych aspektach Linuksa — ze szczególnym uwzględnieniem dystrybucji
rolling-release (Gentoo, Arch Linux, openSUSE Tumbleweed) i optymalizacji pod
konkretny sprzęt. Stylistyka interfejsu nawiązuje do **kernel.org**: gęste,
tabelaryczne dane, ciemny motyw, minimalna liczba elementów dekoracyjnych,
czcionka monospace dla danych technicznych.

## Stos technologiczny

- **React 18** + **TypeScript** — komponenty i logika UI
- **Vite** — bundler / dev server (szybki HMR)
- **Tailwind CSS** — stylowanie utility-first, własna paleta kolorów w stylu kernel.org

Wybrałem React/Vite zamiast czystego HTML, ponieważ każda z czterech zakładek
ma stan interaktywny (filtry, wyszukiwarki, generator konfiguracji, wizard) —
komponentowa architektura znacznie ułatwi dalszą rozbudowę każdej sekcji
niezależnie.

## Struktura projektu

```
rolling-linux-hub/
├── index.html                     # punkt wejścia HTML (Vite)
├── package.json
├── vite.config.ts
├── tailwind.config.js             # paleta kolorów "kernel.org dark"
├── postcss.config.js
├── tsconfig.json
├── src/
│   ├── main.tsx                   # bootstrap React
│   ├── App.tsx                    # główny layout: header, nawigacja zakładek, footer
│   ├── index.css                  # Tailwind + komponenty wspólne (.k-table, .k-panel…)
│   ├── types.ts                   # współdzielone typy (DistroMeta, TrackedPackage…)
│   ├── data/
│   │   └── rollingData.ts         # dane pakietów (obecnie mock — patrz niżej)
│   └── components/
│       └── tabs/
│           ├── RollingTracker.tsx     # Zakładka 1 — PEŁNA implementacja
│           ├── UseFlagMatrix.tsx      # Zakładka 2 — szkielet UI
│           ├── DesktopMatrix.tsx      # Zakładka 3 — szkielet UI
│           └── KernelExplorer.tsx     # Zakładka 4 — szkielet UI
```

## Stan implementacji zakładek

| # | Zakładka | Status |
|---|----------|--------|
| 1 | Linux Rolling Tracker | ✅ Pełna implementacja: tabela porównawcza wersji, wizualizacja lag trackera (paski postępu z progami kolorystycznymi), sekcja z gotowymi poleceniami kompilacji pod sprzęt (`-march=native` dla Gentoo/Arch/openSUSE) |
| 2 | Gentoo Use-Flag Matrix | 🚧 Szkielet: układ tabeli flag USE + działający (lokalny) generator snippetu `package.use` na przykładowych danych |
| 3 | Desktop Environment Matrix | 🚧 Szkielet: tabela cech DE/WM z przykładowymi danymi + zarys wizarda dopasowania |
| 4 | Kernel Config & Feature Explorer | 🚧 Szkielet: wyszukiwarka opcji Kconfig na przykładowych danych + tabela porównania configów dystrybucji |

Zakładki 2–4 mają gotowy layout i typy zgodne z resztą aplikacji — kolejny
krok to podłączenie realnych źródeł danych (patrz sekcja "Architektura
danych" poniżej) i rozbudowa logiki (wizard, kalkulatory).

## Architektura danych (do wdrożenia w kolejnym etapie)

Obecnie `src/data/rollingData.ts` zawiera dane **przykładowe (mock)**,
przygotowane wyłącznie do celów prototypu UI. W wersji produkcyjnej zalecane
podejście:

1. Osobny serwis/skrypt (np. cron w Pythonie lub Node) pobierający realne
   wersje pakietów z:
   - [repology.org](https://repology.org) (API porównawcze wersji pakietów w wielu dystrybucjach),
   - oficjalnych API dystrybucji (Arch: `https://archlinux.org/packages/`, Gentoo: `packages.gentoo.org`, openSUSE: OBS API),
   - GitHub/GitLab Releases dla wersji upstream.
2. Zapis danych do lekkiej bazy (SQLite/Postgres) lub statycznego JSON
   generowanego co kilka godzin.
3. Prosty endpoint REST/JSON serwowany np. przez Cloudflare Workers lub
   Vercel Edge Functions, konsumowany przez frontend zamiast statycznego
   importu z `rollingData.ts`.

## Instalacja i uruchomienie (krok po kroku)

Wymagania: **Node.js ≥ 18** oraz **npm** (dołączony do Node.js).

```bash
# 1. Rozpakuj/sklonuj projekt i wejdź do katalogu
cd rolling-linux-hub

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski (z hot-reload)
npm run dev
# → aplikacja dostępna pod http://localhost:5173

# 4. (opcjonalnie) Zbuduj wersję produkcyjną
npm run build
# → zoptymalizowane pliki statyczne trafiają do katalogu dist/

# 5. (opcjonalnie) Podejrzyj zbudowaną wersję produkcyjną lokalnie
npm run preview
```

### Wdrożenie (deployment)

Katalog `dist/` po `npm run build` to pojedynczy, samowystarczalny plik
`index.html` (JS i CSS są w niego wbudowane przez `vite-plugin-singlefile`) —
można go otworzyć od razu dwuklikiem w przeglądarce, bez żadnego serwera, a
także wystawić na dowolnym hostingu statycznym:

```bash
# przykład: szybki podgląd przez dowolny serwer HTTP
npx serve dist

# lub wdrożenie na Netlify / Vercel — wystarczy wskazać katalog `dist`
# jako publish directory po komendzie `npm run build`
```

### Publikacja na GitHub Pages przez GitHub Actions

Projekt zawiera gotowy workflow `.github/workflows/deploy.yml`, który przy
każdym pushu do gałęzi `main` automatycznie buduje aplikację i publikuje ją
na GitHub Pages. Kroki do wykonania (jednorazowo):

```bash
# 1. Utwórz na github.com nowe, PUSTE repozytorium (bez README/.gitignore) —
#    np. o nazwie "rolling-linux-hub"

# 2. W katalogu projektu zainicjuj repo i podepnij zdalne repozytorium
cd rolling-linux-hub
git init
git branch -M main
git add .
git commit -m "Initial commit: Linux Rolling Hub"
git remote add origin https://github.com/<TWOJA-NAZWA-UZYTKOWNIKA>/rolling-linux-hub.git

# 3. Wypchnij kod na GitHub
git push -u origin main
```

Następnie w ustawieniach repozytorium na GitHubie:

1. Wejdź w **Settings → Pages**.
2. Przy polu **Source** wybierz **GitHub Actions** (nie "Deploy from a branch").
3. Wróć do zakładki **Actions** — workflow „Deploy to GitHub Pages" uruchomi
   się automatycznie po pushu (lub kliknij **Run workflow**, aby odpalić go
   ręcznie).
4. Po zakończeniu (zielony ✓) aplikacja będzie dostępna pod adresem
   `https://<TWOJA-NAZWA-UZYTKOWNIKA>.github.io/rolling-linux-hub/`.

Każdy kolejny `git push` do `main` automatycznie przebuduje i ponownie
opublikuje stronę — nie trzeba nic klikać ręcznie.

## Paleta kolorów (styl kernel.org)

Zdefiniowana w `tailwind.config.js` pod prefiksami `kbg-*`, `ktext-*`,
`kamber-*`, `ksteel-*`: ciemne, niemal czarne tło (`#0d1117`), stonowany
bursztynowy akcent (`#e8a33d` — nawiązanie do klasycznego linku kernel.org),
oraz stalowy niebieski jako kolor drugorzędny. Klasy pomocnicze `.k-table`,
`.k-panel`, `.k-badge`, `.k-heading` w `src/index.css` ujednolicają wygląd
tabel i paneli we wszystkich zakładkach.

## Dalsze kroki

- Podłączenie realnych danych pakietów (repology.org / API dystrybucji) dla Zakładki 1.
- Pełna implementacja generatora `package.use` z realną bazą opisów flag USE (Zakładka 2).
- Logika wizarda rekomendacji DE/WM na podstawie odpowiedzi użytkownika (Zakładka 3).
- Parser Kconfig jądra + wyszukiwarka pełnotekstowa (Zakładka 4).
- Testy jednostkowe (Vitest) dla logiki filtrowania/generatorów.
