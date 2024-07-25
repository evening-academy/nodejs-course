# Aufgabe: REST-Service

## Beschreibung

Versuchen wir, einen Home Library Service zu erstellen! `Benutzer` können Daten über `Künstler`, `Titel` und `Alben` erstellen, lesen, aktualisieren, löschen und diese in ihre eigenen Favoriten in der Home Library hinzufügen!

Hinweis: Sie müssen [Nest](https://nestjs.com/) benutzen  

**Erstellen Sie eine Anwendung, die mit folgenden Ressourcen arbeitet:**

- `User` (mit Attributen):
  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // Ganzzahl, erhöht sich bei Updates
    createdAt: number; // Zeitstempel der Erstellung
    updatedAt: number; // Zeitstempel der letzten Aktualisierung
  }
  ```

- `Artist` (mit Attributen):
  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```

- `Track` (mit Attributen):
  ```typescript
  interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // verweist auf Artist
    albumId: string | null; // verweist auf Album
    duration: number; // Ganzzahl
  }
  ```

- `Album` (mit Attributen):
  ```typescript
  interface Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // verweist auf Artist
  }
  ```

- `Favorites` (mit Attributen):
  ```typescript
  interface Favorites {
    artists: string[]; // IDs der bevorzugten Künstler
    albums: string[]; // IDs der bevorzugten Alben
    tracks: string[]; // IDs der bevorzugten Titel
  }
  ```

**Details:**

1. Für `Users`, `Artists`, `Albums`, `Tracks` und `Favorites` sollen REST-Endpunkte mit separaten Router-Pfaden erstellt werden:
* `Users` (`/user` Route)
    * `GET /user` - alle Benutzer abrufen
        - Der Server soll mit `Statuscode` **200** und allen Benutzer-Datensätzen antworten.
    * `GET /user/:id` - einzelnen Benutzer nach ID abrufen
        - Der Server soll mit `Statuscode` **200** und dem Datensatz mit `id === userId` antworten, falls vorhanden.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `userId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === userId` nicht existiert.
    * `POST /user` - Benutzer erstellen (DTO verwenden)
      `CreateUserDto`
      ```typescript
          interface CreateUserDto {
            login: string;
            password: string;
          }
      ```
        - Der Server soll mit `Statuscode` **201** und dem neu erstellten Datensatz antworten, wenn die Anfrage gültig ist.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls der Anfrage-Body nicht die **erforderlichen** Felder enthält.
    * `PUT /user/:id` - Passwort des Benutzers aktualisieren
      `UpdatePasswordDto` (mit Attributen):
      ```typescript
      interface UpdatePasswordDto {
        oldPassword: string; // altes Passwort
        newPassword: string; // neues Passwort
      }
      ```
        - Der Server soll mit `Statuscode` **200** und dem aktualisierten Datensatz antworten, wenn die Anfrage gültig ist.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `userId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === userId` nicht existiert.
        - Der Server soll mit `Statuscode` **403** und entsprechender Nachricht antworten, falls `oldPassword` falsch ist.
    * `DELETE /user/:id` - Benutzer löschen
        - Der Server soll mit `Statuscode` **204** antworten, falls der Datensatz gefunden und gelöscht wurde.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `userId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === userId` nicht existiert.

* `Tracks` (`/track` Route)
    * `GET /track` - alle Titel abrufen
        - Der Server soll mit `Statuscode` **200** und allen Titel-Datensätzen antworten.
    * `GET /track/:id` - einzelnen Titel nach ID abrufen
        - Der Server soll mit `Statuscode` **200** und dem Datensatz mit `id === trackId` antworten, falls vorhanden.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `trackId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === trackId` nicht existiert.
    * `POST /track` - neuen Titel erstellen
        - Der Server soll mit `Statuscode` **201** und dem neu erstellten Datensatz antworten, wenn die Anfrage gültig ist.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls der Anfrage-Body nicht die **erforderlichen** Felder enthält.
    * `PUT /track/:id` - Titel-Info aktualisieren
        - Der Server soll mit `Statuscode` **200** und dem aktualisierten Datensatz antworten, wenn die Anfrage gültig ist.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `trackId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === trackId` nicht existiert.
    * `DELETE /track/:id` - Titel löschen
        - Der Server soll mit `Statuscode` **204** antworten, falls der Titel in den Favoriten war und nun gelöscht wurde.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `trackId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der entsprechende Titel nicht in den Favoriten ist.

* `Artists` (`/artist` Route)
    * `GET /artist` - alle Künstler abrufen
        - Der Server soll mit `Statuscode` **200** und allen Künstler-Datensätzen antworten.
    * `GET /artist/:id` - einzelnen Künstler nach ID abrufen
        - Der Server soll mit `Statuscode` **200** und dem Datensatz mit `id === artistId` antworten, falls vorhanden.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `artistId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === artistId` nicht existiert.
    * `POST /artist` - neuen Künstler erstellen
        - Der Server soll mit `Statuscode` **201** und dem neu erstellten Datensatz antworten, wenn die Anfrage gültig ist.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls der Anfrage-Body nicht die **erforderlichen** Felder enthält.
    * `PUT /artist/:id` - Künstler-Info aktualisieren
        - Der Server soll mit `Statuscode` **200** und dem aktualisierten Datensatz antworten, wenn die Anfrage gültig ist.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `artistId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === artistId` nicht existiert.
    * `DELETE /artist/:id` - Künstler löschen
        - Der Server soll mit `Statuscode` **204** antworten, falls der Datensatz gefunden und gelöscht wurde.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `artistId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === artistId` nicht existiert.

* `Albums` (`/album` Route)
    * `GET /album` - alle Alben abrufen


      - Der Server soll mit `Statuscode` **200** und allen Album-Datensätzen antworten.
    * `GET /album/:id` - einzelnes Album nach ID abrufen
      - Der Server soll mit `Statuscode` **200** und dem Datensatz mit `id === albumId` antworten, falls vorhanden.
      - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `albumId` ungültig ist (nicht `uuid`).
      - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === albumId` nicht existiert.
    * `POST /album` - neues Album erstellen
      - Der Server soll mit `Statuscode` **201** und dem neu erstellten Datensatz antworten, wenn die Anfrage gültig ist.
      - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls der Anfrage-Body nicht die **erforderlichen** Felder enthält.
    * `PUT /album/:id` - Album-Info aktualisieren
      - Der Server soll mit `Statuscode` **200** und dem aktualisierten Datensatz antworten, wenn die Anfrage gültig ist.
      - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `albumId` ungültig ist (nicht `uuid`).
      - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === albumId` nicht existiert.
    * `DELETE /album/:id` - Album löschen
      - Der Server soll mit `Statuscode` **204** antworten, falls der Datensatz gefunden und gelöscht wurde.
      - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `albumId` ungültig ist (nicht `uuid`).
      - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der Datensatz mit `id === albumId` nicht existiert.

* `Favorites`
    * `GET /favs` - alle Favoriten abrufen
        - Der Server soll mit `Statuscode` **200** und allen Favoriten-Datensätzen (**nicht deren IDs**), aufgeteilt nach Entitätstypen antworten:
      ```typescript
      interface FavoritesResponse{
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      }
      ```
    * `POST /favs/track/:id` - Titel zu den Favoriten hinzufügen
        - Der Server soll mit `Statuscode` **201** und entsprechender Nachricht antworten, wenn der Titel mit `id === trackId` existiert.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `trackId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **422** und entsprechender Nachricht antworten, falls der Titel mit `id === trackId` nicht existiert.
    * `DELETE /favs/track/:id` - Titel aus den Favoriten löschen
        - Der Server soll mit `Statuscode` **204** antworten, wenn der Titel in den Favoriten war und jetzt gelöscht wurde.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `trackId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der entsprechende Titel nicht in den Favoriten ist.
    * `POST /favs/album/:id` - Album zu den Favoriten hinzufügen
        - Der Server soll mit `Statuscode` **201** und entsprechender Nachricht antworten, wenn das Album mit `id === albumId` existiert.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `albumId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **422** und entsprechender Nachricht antworten, falls das Album mit `id === albumId` nicht existiert.
    * `DELETE /favs/album/:id` - Album aus den Favoriten löschen
        - Der Server soll mit `Statuscode` **204** antworten, wenn das Album in den Favoriten war und jetzt gelöscht wurde.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `albumId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls das entsprechende Album nicht in den Favoriten ist.
    * `POST /favs/artist/:id` - Künstler zu den Favoriten hinzufügen
        - Der Server soll mit `Statuscode` **201** und entsprechender Nachricht antworten, wenn der Künstler mit `id === artistId` existiert.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `artistId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **422** und entsprechender Nachricht antworten, falls der Künstler mit `id === artistId` nicht existiert.
    * `DELETE /favs/artist/:id` - Künstler aus den Favoriten löschen
        - Der Server soll mit `Statuscode` **204** antworten, wenn der Künstler in den Favoriten war und jetzt gelöscht wurde.
        - Der Server soll mit `Statuscode` **400** und entsprechender Nachricht antworten, falls `artistId` ungültig ist (nicht `uuid`).
        - Der Server soll mit `Statuscode` **404** und entsprechender Nachricht antworten, falls der entsprechende Künstler nicht in den Favoriten ist.

2. Derzeit sollen diese Endpunkte nur mit **im Speicher** (hardcodierten) Daten arbeiten. In den nächsten Aufgaben werden wir eine Datenbank verwenden. Sie sollten Ihre Module so organisieren, dass die Datenquelle bald geändert werden kann.

3. Das Format `application/json` sollte für Anfrage- und Antwort-Body verwendet werden.

4. Vermeiden Sie es, alles in eine Datei zu packen – verwenden Sie separate Dateien für die Anwendungsinitialisierung (Bootstrapping), für Controller (Router) und für Geschäftslogik. Teilen Sie die Dateien auch in verschiedene Module auf, je nach Domain (benutzerbezogen, künstlerbezogen usw.).

5. Das Passwort des `User` sollte von der Serverantwort ausgeschlossen werden.

6. Wenn ein `Artist`, `Album` oder `Track` gelöscht wird, sollte seine `id` aus den Favoriten entfernt werden (falls vorhanden) und Referenzen darauf in anderen Entitäten sollten `null` werden. Beispiel: `Artist` wird gelöscht => diese `artistId` in den entsprechenden `Albums` und `Tracks` wird `null` + die `id` dieses Künstlers wird aus den Favoriten gelöscht, dieselbe Logik für `Album` und `Track`.

7. Nicht existierende Entitäten können nicht zu den Favoriten hinzugefügt werden.

8. Zum Starten des Services sollte der Befehl `npm start` verwendet werden.

9. Der Service sollte standardmäßig auf PORT `4000` lauschen, der PORT-Wert wird in der `.env`-Datei gespeichert.

10. Eingehende Anfragen sollten validiert werden.

11. Sie können die OpenAPI-Datei im `doc`-Ordner anpassen und verwenden.

**Hinweise**

* Um alle Entitäten-IDs zu generieren, verwenden Sie das [uuid](https://www.npmjs.com/package/uuid)-Paket oder das [Node.js-Äquivalent](https://nodejs.org/dist/latest-v20.x/docs/api/crypto.html#cryptorandomuuidoptions).