# CaliNetX

Eine umfassende mobile Anwendung für iOS und Android, die speziell auf Calisthenics-Sportler zugeschnitten ist. Die App kombiniert soziale Netzwerk-Funktionalitäten mit Trainings-Tracking und standortbasierten Features.

## Features

- **Feed**: Instagram-ähnlicher Feed zum Teilen von Trainings und Interaktion mit anderen Nutzern
- **Community**: Überblick über Calisthenics-Vereine, -Gruppen und Veranstaltungen
- **Training/Workout**: Umfassende Workout-Planung, -Tracking und Fortschrittsverfolgung
- **Map**: Interaktive Karte mit Calisthenics-Parks und Anlagen
- **Profile**: Persönliche Profilseite mit Level-System und Aktivitätsübersicht

## Technologie-Stack

- **Frontend**: React Native mit Expo
- **Backend**: Supabase (PostgreSQL)
- **Authentifizierung**: Supabase Auth
- **Speicher**: Supabase Storage
- **API**: RESTful mit Supabase-Client

## Entwicklungsumgebung einrichten

### Voraussetzungen

- Node.js >= 16
- npm oder yarn
- Expo CLI
- Git

### Installation

1. Klone das Repository:
   ```
   git clone https://github.com/username/calisthenics-community-app.git
   cd calisthenics-community-app
   ```

2. Installiere die Abhängigkeiten:
   ```
   npm install
   ```

3. Erstelle eine `.env`-Datei im Stammverzeichnis mit den folgenden Variablen:
   ```
   EXPO_PUBLIC_SUPABASE_URL=deine-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=dein-supabase-anon-key
   ```

4. Starte die Entwicklungsumgebung:
   ```
   npm start
   ```

### Tests

Tests ausführen:
```
npm test
```

Linting ausführen:
```
npm run lint
```

## Projektstruktur

```
src/
├── components/       # Wiederverwendbare UI-Komponenten
├── screens/          # Hauptbildschirme der App
├── navigation/       # Navigation zwischen Screens
├── services/         # API-Calls und externe Dienste
├── hooks/            # Custom React Hooks
├── utils/            # Hilfsfunktionen
└── theme/            # Design-System und Styling
```

## Beitragen

1. Forke das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/neue-feature`)
3. Committe deine Änderungen (`git commit -m 'Feature hinzugefügt: XYZ'`)
4. Pushe zum Branch (`git push origin feature/neue-feature`)
5. Erstelle einen Pull Request

## CI/CD

Dieses Projekt verwendet GitHub Actions für die kontinuierliche Integration und Bereitstellung. Bei jedem Push und Pull Request werden automatisch Tests ausgeführt und bei erfolgreichen Tests wird die App auf Expo veröffentlicht.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.