# Encryptie HTTPS/SSL

## HTTP/HTTPS
### Wat ga je leren in dit labo?
- Een self signed certificate aanmaken met openssl.
- Wireshark installeren en gebruiken.
- Wireshark gebruiken om paketten te sniffen verstuurd via onbeveiligde http.
- Het verschil begrijpen tussen http en https.
### Stappenplan

1. We raden je aan om google chrome te gebruiken voor dit labo. Wens je dat niet te doen zal je voor sommige settings zelf op zoek moeten gaan.

0. Doe een git clone van de volgende repository (of git pull indien je deze repo al hebt)

    ```https://github.com/similonap/software_security_2021.git```

1. Open de terminal in ```labo_https_ssl``` via visual studio code en installeer alle npm dependencies met

    ```
    npm install
    ```

2. We hebben voor deze oefening een webserver in node js geschreven. Je kan deze opstarten met

    ```
    node http.js
    ```

    Merk op dat er een opmerking staat die vermeld:

    ```
    You have not generated a certificate yet. 
    ```

    Dit lossen we zodra op.

3. Open je browser (liefst chrome) op de adressen die in de terminal zijn gegeven. 

    Op http://localhost:3000 zal je een website te zien krijgen die twee links bevat: "Form with GET" en "Form with POST".

    Op https://localhost:3001 krijg je een foutboodschap te zien:

    <img src="http_error_1.png" width="400">

    Dit komt omdat we nog geen certificaat hebben aangemaakt voor onze webserver.

4. Sluit de webserver terug af door CTRL-C te drukken in je terminal venster.

5. Om de webserver correct te laten opstarten moeten we met openssl een self signed certificaat maken. Normaal gezien worden certificaten afgeleverd door een certificaten autoriteit (certificate authority). Dit is is een organisatie die digitale certificaten aan personen of bedrijven verleent na hun identiteit gecontroleerd te hebben. Dit kost meestal geld dus we gaan natuurlijk in deze cursus dit niet doen. Wij gaan gewoon zelf ons eigen certificaat signen en daar mee werken. 

6. Voer in dezelfde directory als hiervoor het volgende commando uit:

    ```
    openssl req -x509 -sha256 -nodes -newkey rsa:2048 -keyout key.pem -out cert.pem
    ```

    Je krijgt hier een aantal vragen met informatie die in het certificaat zullen opgeslagen worden ter identificatie:

    ```
    Country Name (2 letter code) []:BE
    State or Province Name (full name) []:Antwerpen
    Locality Name (eg, city) []:Antwerpen
    Organization Name (eg, company) []:AP
    Organizational Unit Name (eg, section) []:Software Security
    Common Name (eg, fully qualified host name) []:localhost
    Email Address []:voornaam.achternaam@ap.be
    ```

    Dit zal twee bestanden aanmaken key.pem en cert.pem. Het eerste bestand is je private sleutel waarmee je je certificaat mee gesigned hebt. En het tweede bestand is het certificaat zelf. 

    **Merk op:** Als je het bestand key.pem opendoet merk je op dat dit heel hard trekt op de private sleutel uit het vorige labo over encryptie.

7. Als je nu de webserver terug opstart met ```node http.js``` dan zal je niet meer dezelfde fout krijgen bij het opstarten. 

8. Als je nu naar https://localhost:3001 gaat dan krijg je de volgende boodschap te zien: 

    <img src="http_warning_1.png" width="400">

    Dit is omdat de browser by default geen self signed certificates vertrouwd. 

    Klik op Advanced (Geavanceerd) en dan krijg klapt het open en dan klik je op "Proceed to localhost(unsafe)"

    <img src="http_warning_2.png" width="400">

    dan krijg je gewoon de website te zien zoals bij de http versie.

    Je kan deze foutmelding ook vermijden door:

    ```chrome://flags/#allow-insecure-localhost``` 
    
    in je adresbalk in te geven in chrome en dan de setting "Allow invalid certificates for resources loaded from localhost.
"op Enabled zetten. Verget daarna niet op Relauch te drukken om chrome te herstarten.

9. Installeer wireshark van op 
https://www.wireshark.org/. Als er gevraagd wordt of je ncap adapter wil installeren doe dit ook anders kan je niet naar je localhost capturen. 

    <iframe src="https://ap.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1194de02-db5b-4971-94ea-ab8501537469&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" width=420 height=236 style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

    <iframe src="https://ap.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=e6a5cca4-f1ea-4b3c-b98b-ab850151ffa4&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" width=420 height=236 style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

10. Als alles geïnstalleerd is start je wireshark op. Bekijk eerst het filmpje over filteren in wireshark:

    <iframe src="https://ap.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=50f56683-e4e5-43d5-8bff-ab870155f73f&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" width=420 height=236 style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

11. Dubbelklik op de loopback interface:

    <img src="loopback.png" width="400">

    In windows heet dit "Adapter for loopback traffic capture" (of iets gelijkaardig)

    <img src="loopback_windows.png" width="400">

12. Wireshark maakt het mogelijk om alle netwerk paketten individueel op te vangen en lezen. Je zal dit zien dat er vanalles op je scherm zal komen. 

13. Zorg ervoor dat je enkel de paketten te zien krijgt op poort 3000 door in de balk bovenaan: ```tcp.port == 3000``` in te typen.

    <img src="port3000.png" width="400">

14. Ga naar http://localhost:3000/get en probeer met een login en paswoord in te loggen (willekeurig)

15. Zoek het pakket voor deze GET en zoek achter het paswoord dat je hebt ingegeven. Deze paketten zullen niet altijd direct te vinden zijn, dus wat speurwerk kan nodig zijn. 

    Je kan ook zoeken achter paketten door Find Packet te doen (ctrl-f). 

    <img src="search.png" width="400">

16. Maak een screenshot van het gevonden pakket en plaats deze in de exercise1 directory. Zorg ervoor dat het passwoord en login zichtbaar is. Noem de file ```http_get.png``` (of een andere bestandstype)

17. Herhaal 14-15 maar dan voor http://localhost:3000/post en slaag de screenshot op als ```http_post.png```

18. Verander nu de filter in de balk bovenaan naar: ```tcp.port == 3001```

19. Ga nu naar https://localhost:3001/get en probeer in te loggen met eender welk login en passwoord.

20. Als je nu gaat zoeken in de paketten die hij gesniffed heeft zal je opmerken dat je deze niet meer vind. Dat is omdat deze geencrypteerd zijn en dus niet meer leesbaar zijn voor wireshark.

21. Zoek een veld met 'Application Data' en rechtermuisklik daar op. Neem een screenshot van dit scherm en noem het ```https_get.png```.