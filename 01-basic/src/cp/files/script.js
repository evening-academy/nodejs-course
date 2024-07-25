// Holen Sie sich die Kommandozeilenargumente ab dem dritten Element
const args = process.argv.slice(2);

// Ausgabe der Gesamtzahl der Argumente
console.log(`Total number of arguments is ${args.length}`);
// Ausgabe der Argumente als JSON-String
console.log(`Arguments: ${JSON.stringify(args)}`);

// Funktion zum Echo der Eingabe
const echoInput = (chunk) => {
    // Konvertiere den Chunk in einen String
    const chunkStringified = chunk.toString();
    // Überprüfen, ob der String "CLOSE" enthält, und das Programm beenden
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    // Ausgabe der erhaltenen Daten
    process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

// Ereignis-Listener für Eingabedaten
process.stdin.on('data', echoInput);
