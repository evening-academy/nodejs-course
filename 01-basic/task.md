# Aufgabe: Node.js Grundlagen

## Beschreibung

Ihre Aufgabe ist es, mehrere einfache Aufgaben zu erfüllen, um die Grundlagen von Node.js zu lernen.

Die Aufgabe enthält mehrere verschachtelte Ordner im Verzeichnis `src`. Ihre Aufgabe ist es, die erforderliche Funktionalität in diesen Ordnern zu implementieren.

## Technische Anforderungen

- Externe Werkzeuge und Bibliotheken sind verboten.
- Verwenden Sie die Version LTS von Node.js (v20.16.0).
- Ändern Sie nicht die Signatur der vorgegebenen Funktionen (z. B. ändern Sie deren Namen nicht, machen Sie sie nicht synchron, usw.).
- Bevorzugen Sie asynchrone APIs, wann immer es möglich ist.

## Teilaufgaben

### Dateisystem (src/fs)

Sie sollten mehrere Funktionen in den entsprechenden Dateien implementieren:
- `create.js` - Implementieren Sie eine Funktion, die eine neue Datei `fresh.txt` mit dem Inhalt `I am fresh and young` im Ordner `files` erstellt (wenn die Datei bereits existiert, muss ein Fehler mit der Nachricht `FS operation failed` ausgelöst werden).
- `copy.js` - Implementieren Sie eine Funktion, die den Ordner `files` mit seinem gesamten Inhalt in den Ordner `files_copy` auf derselben Ebene kopiert (wenn der Ordner `files` nicht existiert oder `files_copy` bereits erstellt wurde, muss ein Fehler mit der Nachricht `FS operation failed` ausgelöst werden).
- `rename.js` - Implementieren Sie eine Funktion, die die Datei `wrongFilename.txt` in `properFilename.md` umbenennt (wenn keine Datei `wrongFilename.txt` existiert oder `properFilename.md` bereits existiert, muss ein Fehler mit der Nachricht `FS operation failed` ausgelöst werden).
- `delete.js` - Implementieren Sie eine Funktion, die die Datei `fileToRemove.txt` löscht (wenn keine Datei `fileToRemove.txt` existiert, muss ein Fehler mit der Nachricht `FS operation failed` ausgelöst werden).
- `list.js` - Implementieren Sie eine Funktion, die alle Dateinamen aus dem Ordner `files` in der Konsole ausgibt (wenn der Ordner `files` nicht existiert, muss ein Fehler mit der Nachricht `FS operation failed` ausgelöst werden).
- `read.js` - Implementieren Sie eine Funktion, die den Inhalt der Datei `fileToRead.txt` in der Konsole ausgibt (wenn keine Datei `fileToRead.txt` existiert, muss ein Fehler mit der Nachricht `FS operation failed` ausgelöst werden).

### Befehlszeilenschnittstelle (Command line interface) (src/cli)

Sie sollten mehrere Funktionen in den entsprechenden Dateien implementieren:
- `env.js` - Implementieren Sie eine Funktion, die Umgebungsvariablen mit dem Präfix `RSS_` parst und sie in der Konsole im Format `RSS_name1=value1; RSS_name2=value2` ausgibt.
- `args.js` - Implementieren Sie eine Funktion, die Befehlszeilenargumente (im Format `--propName value --prop2Name value2`, eine Validierung ist nicht erforderlich) parst und sie in der Konsole im Format `propName is value, prop2Name is value2` ausgibt.

### Module (src/modules)

Sie sollten die Datei refaktorisieren (ggf. zusätzliche Importe hinzufügen):
- `cjsToEsm.cjs` - Schreiben Sie die Datei in der äquivalenten ECMAScript-Notation um (und benennen Sie sie in `esm.mjs` um).

### Hash (src/hash)

Sie sollten mehrere Funktionen in den entsprechenden Dateien implementieren:
- `calcHash.js` - Implementieren Sie eine Funktion, die den SHA256-Hash für die Datei `fileToCalculateHashFor.txt` berechnet und ihn als `hex` in der Konsole ausgibt, unter Verwendung der Streams API.

### Streams (src/streams)

Sie sollten mehrere Funktionen in den entsprechenden Dateien implementieren:
- `read.js` - Implementieren Sie eine Funktion, die den Inhalt der Datei `fileToRead.txt` mit einem Readable Stream liest und den Inhalt in `process.stdout` ausgibt.
- `write.js` - Implementieren Sie eine Funktion, die Daten von `process.stdin` in die Datei `fileToWrite.txt` mit einem Writable Stream schreibt.
- `transform.js` - Implementieren Sie eine Funktion, die Daten von `process.stdin` liest, den Text mit einem Transform Stream umkehrt und dann in `process.stdout` schreibt.

### Zlib (src/zip)

Sie sollten mehrere Funktionen in den entsprechenden Dateien implementieren:
- `compress.js` - Implementieren Sie eine Funktion, die die Datei `fileToCompress.txt` mit `zlib` und Streams API in `archive.gz` komprimiert.
- `decompress.js` - Implementieren Sie eine Funktion, die `archive.gz` mit `zlib` und Streams API zurück in `fileToCompress.txt` dekomprimiert, wobei der Inhalt derselbe wie vor der Kompression sein sollte.

### Worker Threads (src/wt)

Sie sollten mehrere Funktionen in den entsprechenden Dateien implementieren:
- `worker.js` - Erweitern Sie die gegebene Funktion, um mit Daten vom Hauptthread zu arbeiten und implementieren Sie eine Funktion, die das Ergebnis der Berechnung an den Hauptthread sendet.
- `main.js` - Implementieren Sie eine Funktion, die eine Anzahl von Worker-Threads erstellt (entsprechend der Anzahl der logischen CPU-Kerne des Host-Computers) aus der Datei `worker.js` und in der Lage ist, Daten an diese Threads zu senden und das Ergebnis der Berechnung von ihnen zu empfangen. Sie sollten eine fortlaufende Nummer, beginnend bei `10`, an jeden `worker` senden. Zum Beispiel: auf einem Host-Computer mit **4** Kernen sollten Sie **4** Worker erstellen und **10** an den ersten `worker`, **11** an den zweiten `worker`, **12** an den dritten `worker` und **13** an den vierten `worker` senden. Nachdem alle Worker fertig sind, sollte die Funktion ein Array von Ergebnissen in der Konsole protokollieren. Die Ergebnisse sind ein Array von Objekten mit 2 Eigenschaften:
    - `status` - `'resolved'`, wenn der Wert erfolgreich vom `worker` empfangen wurde, oder `'error'`, wenn ein Fehler im `worker` aufgetreten ist
    - `data` - Wert vom `worker` im Erfolgsfall oder `null`, im Falle eines Fehlers im Worker

Die Ergebnisse im Array müssen in der gleichen Reihenfolge sein, in der die Worker erstellt wurden.

### Child Processes (src/cp)

Sie sollten mehrere Funktionen in den entsprechenden Dateien implementieren:
- `cp.js` - Implementieren Sie die Funktion `spawnChildProcess`, die ein Array von Argumenten `args` erhält und einen Kindprozess aus der Datei `script.js` erstellt, wobei diese `args` übergeben werden. Diese Funktion sollte einen IPC-Kanal zwischen `stdin` und `stdout` des Master-Prozesses und des Kindprozesses erstellen:
  - Der `stdin` des Kindprozesses sollte Eingaben vom `stdin` des Master-Prozesses erhalten.
  - Der `stdout` des Kindprozesses sollte Daten an den `stdout` des Master-Prozesses senden.