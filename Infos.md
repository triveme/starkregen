## Informationen zum Aufsetzen des Projekts
Das Projekt besteht aus einem React-Frontend, einem Node-Backend und einer MySQL-Datenbank.

Sowohl im Frontend, als auch im Backend müssen ENV-Variablen hinterlegt werden:

### ENV-Variablen-Frontend
Im Frontend werden folgende ENV-Variablen benötigt:
- für die Verbindung zum Backend die Backend-Url (REACT_APP_BASE_URL)
- für die Verwendung der Mapbox-Karten ein Mapbox-Token (REACT_APP_MAPBOX_ACCESS_TOKEN)

Bsp-ENV:
```ruby
REACT_APP_BASE_URL=http://localhost:3333 
REACT_APP_MAPBOX_ACCESS_TOKEN=beispiel-token
```

### ENV-Variablen-Backend
Im Backend werden folgende ENV-Variablen benötigt:
- die Portnummer, auf der das Backend laufen soll (PORT)
- die URL des Frontends, um Anfragen des Frontends (cors) zu erlauben (FRONTEND_HOST)
- ein Secret für die Verschlüsseln der Authentifizierungsdaten (SECRET)
- Informationen zum Verbinden mit der Datenbank: Host, Username, Password & Datenbankname (DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE)
- der initiale Admin-Username + Passwort für die Starkregenplattform (DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD)
- das Verzeichnis, in dem die Meldungsbilder abgelegt werden sollen (IMAGE_DIR)

Bsp-ENV:
```ruby
PORT=3333
FRONTEND_HOST=http://localhost:3000
SECRET=beispiel-secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=beispiel-pw
DB_DATABASE=starkregen-db
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=password
IMAGE_DIR=/public/images
```
