# Aufgabe: CRUD API

## Beschreibung

Ihre Aufgabe ist es, eine einfache CRUD-API mit einer In-Memory-Datenbank zu implementieren.

## Technische Anforderungen

- Die Aufgabe kann in JavaScript oder TypeScript implementiert werden.
- Es dürfen nur `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` und seine Plugins, `webpack-cli`, `webpack` und seine Plugins, `prettier`, `uuid`, `@types/*` sowie Bibliotheken für Tests verwendet werden.
- Verwenden Sie die Version 20 LTS von Node.js.
- Bevorzugen Sie die asynchrone API, wann immer es möglich ist.

## Implementierungsdetails

1. Implementieren Sie den Endpunkt `api/users`:
    - **GET** `api/users` wird verwendet, um alle Personen abzurufen
        - Der Server sollte mit dem `Statuscode` **200** und allen Benutzeraufzeichnungen antworten.
    - **GET** `api/users/{userId}`
        - Der Server sollte mit dem `Statuscode` **200** und dem Datensatz mit `id === userId` antworten, wenn dieser existiert.
        - Der Server sollte mit dem `Statuscode` **400** und der entsprechenden Nachricht antworten, wenn `userId` ungültig ist (nicht `uuid`).
        - Der Server sollte mit dem `Statuscode` **404** und der entsprechenden Nachricht antworten, wenn kein Datensatz mit `id === userId` existiert.
    - **POST** `api/users` wird verwendet, um einen neuen Benutzer zu erstellen und in der Datenbank zu speichern.
        - Der Server sollte mit dem `Statuscode` **201** und dem neu erstellten Datensatz antworten.
        - Der Server sollte mit dem `Statuscode` **400** und der entsprechenden Nachricht antworten, wenn der Anfragetext (`body`) keine **erforderlichen** Felder enthält.
    - **PUT** `api/users/{userId}` wird verwendet, um einen bestehenden Benutzer zu aktualisieren.
        - Der Server sollte mit dem `Statuscode` **200** und dem aktualisierten Datensatz antworten.
        - Der Server sollte mit dem `Statuscode` **400** und der entsprechenden Nachricht antworten, wenn `userId` ungültig ist (nicht `uuid`).
        - Der Server sollte mit dem `Statuscode` **404** und der entsprechenden Nachricht antworten, wenn kein Datensatz mit `id === userId` existiert.
    - **DELETE** `api/users/{userId}` wird verwendet, um einen bestehenden Benutzer aus der Datenbank zu löschen.
        - Der Server sollte mit dem `Statuscode` **204** antworten, wenn der Datensatz gefunden und gelöscht wurde.
        - Der Server sollte mit dem `Statuscode` **400** und der entsprechenden Nachricht antworten, wenn `userId` ungültig ist (nicht `uuid`).
        - Der Server sollte mit dem `Statuscode` **404** und der entsprechenden Nachricht antworten, wenn kein Datensatz mit `id === userId` existiert.
2. Benutzer werden als `Objekte` gespeichert, die folgende Eigenschaften haben:
    - `id` — eindeutiger Bezeichner (`string`, `uuid`), der auf der Serverseite generiert wird
    - `username` — Name des Benutzers (`string`, **erforderlich**)
    - `age` — Alter des Benutzers (`number`, **erforderlich**)
    - `hobbies` — Hobbys des Benutzers (`array` von `strings` oder leeres `array`, **erforderlich**)
3. Anfragen an nicht existierende Endpunkte (z. B. `some-non/existing/resource`) sollten behandelt werden (der Server sollte mit dem `Statuscode` **404** und einer entsprechenden benutzerfreundlichen Nachricht antworten).
4. Fehler auf der Serverseite, die während der Verarbeitung einer Anfrage auftreten, sollten behandelt und korrekt verarbeitet werden (der Server sollte mit dem `Statuscode` **500** und einer entsprechenden benutzerfreundlichen Nachricht antworten).
5. Der Wert von `port`, auf dem die Anwendung läuft, sollte in einer `.env`-Datei gespeichert werden.
6. Es sollte 2 Modi für die Ausführung der Anwendung geben (**Entwicklung** und **Produktion**):
    - Die Anwendung wird im Entwicklungsmodus mit `nodemon` oder `ts-node-dev` ausgeführt (es gibt ein `npm`-Skript `start:dev`).
    - Die Anwendung wird im Produktionsmodus ausgeführt (es gibt ein `npm`-Skript `start:prod`, das den Build-Prozess startet und dann die gebündelte Datei ausführt).
7. Es sollten einige Tests für die API implementiert werden (mindestens **3** Szenarien). Beispiel für ein Testszenario:
    1. Holen Sie alle Datensätze mit einer `GET`-Anfrage an `api/users` ab (ein leerer Array wird erwartet).
    2. Ein neues Objekt wird durch eine `POST`-Anfrage an `api/users` erstellt (eine Antwort, die den neu erstellten Datensatz enthält, wird erwartet).
    3. Mit einer `GET`-Anfrage an `api/user/{userId}` versuchen wir, den erstellten Datensatz anhand seiner `id` abzurufen (der erstellte Datensatz wird erwartet).
    4. Wir versuchen, den erstellten Datensatz mit einer `PUT`-Anfrage an `api/users/{userId}` zu aktualisieren (eine Antwort, die ein aktualisiertes Objekt mit derselben `id` enthält, wird erwartet).
    5. Mit einer `DELETE`-Anfrage an `api/users/{userId}` löschen wir das erstellte Objekt nach `id` (eine Bestätigung der erfolgreichen Löschung wird erwartet).
    6. Mit einer `GET`-Anfrage an `api/users/{userId}` versuchen wir, ein gelöschtes Objekt anhand seiner `id` abzurufen (die erwartete Antwort ist, dass es kein solches Objekt gibt).
8. Es sollte eine horizontale Skalierung für die Anwendung implementiert werden. Es sollte ein `npm`-Skript `start:multi` geben, das mehrere Instanzen Ihrer Anwendung mit der Node.js `Cluster` API (entsprechend der Anzahl der verfügbaren Parallelität - 1 auf dem Host-Computer) startet, wobei jede Instanz auf Port PORT + n hört, mit einem **Load Balancer**, der Anfragen auf diese verteilt (unter Verwendung des Round-Robin-Algorithmus). Zum Beispiel: Verfügbare Parallelität ist 4, `PORT` ist 4000. Beim Ausführen von `npm run start:multi` funktioniert es wie folgt:
- Auf `localhost:4000/api` hört der Load Balancer auf Anfragen.
- Auf `localhost:4001/api`, `localhost:4002/api`, `localhost:4003/api` hören die Worker auf Anfragen vom Load Balancer.
- Wenn der Benutzer eine Anfrage an `localhost:4000/api` sendet, leitet der Load Balancer diese Anfrage an `localhost:4001/api` weiter, die nächste Benutzeranfrage wird an `localhost:4002/api` gesendet und so weiter.
- Nachdem eine Anfrage an `localhost:4003/api` gesendet wurde, beginnt der Load Balancer wieder beim ersten Worker (sendet die Anfrage an `localhost:4001/api`).
- Der Zustand der Datenbank sollte zwischen den verschiedenen Workern konsistent sein, zum Beispiel:
    1. Die erste `POST`-Anfrage an `localhost:4001/api` erstellt einen Benutzer.
    2. Die zweite `GET`-Anfrage an `localhost:4002/api` sollte den erstellten Benutzer zurückgeben.
    3. Die dritte `DELETE`-Anfrage an `localhost:4003/api` löscht den erstellten Benutzer.
    4. Die vierte `GET`-Anfrage an `localhost:4001/api` sollte den Statuscode **404** für den erstellten Benutzer zurückgeben.