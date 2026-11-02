IL MIO BAR - PROGETTO APPLICAZIONE WINDOWS 11
Killa Records Games

COSA CONTIENE
- src/index.html: versione HTML del gioco usata come base.
- main.js e preload.js: contenitore desktop Electron e controllo aggiornamenti.
- package.json: configurazione installer NSIS x64 e aggiornamenti GitHub Releases.
- .github/workflows/windows-installer.yml: workflow GitHub Actions per creare l'installer su Windows.

IMPORTANTE
Questo pacchetto è il progetto sorgente, non è ancora l'installer .exe.
L'installer deve essere compilato da GitHub Actions su Windows. Non caricare questo ZIP come se fosse già il programma installabile.

PRIMA DELLA DISTRIBUZIONE
1. Integrare e testare il flusso di conferma email Supabase nell'app desktop. La pagina attuale usa Supabase persistente; la conferma email potrebbe aprirsi nel browser esterno e richiedere poi l'accesso manuale nell'app.
2. Verificare che i salvataggi locali e le sessioni Supabase vengano conservati tra aggiornamenti. Electron mantiene i dati utente nella cartella profilo dell'app e non li mette dentro l'installer.
3. Configurare il repository GitHub AbduKilla/ilmio-bar e il workflow.
4. Incrementare la versione in package.json prima di ogni release (es. 1.0.1), creare un tag v1.0.1 e pubblicarlo. Il workflow crea l'installer e i file di aggiornamento GitHub.
5. Testare installazione, NVDA, login/registrazione, conferma email, salvataggi e aggiornamento su un PC Windows 11 di prova prima di distribuirlo su itch.io.

AGGIORNAMENTI
Il sistema usa electron-updater con GitHub Releases. Il programma controlla gli aggiornamenti dopo l'avvio e propone il download. L'installazione dell'aggiornamento avviene alla chiusura dell'app.

REQUISITI PER COMPILARE
Node.js 22 e npm. La compilazione Windows è eseguita da GitHub Actions su windows-latest.
