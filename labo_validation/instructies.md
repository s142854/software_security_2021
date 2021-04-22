<!-- 
DISCLAIMER:

!!!!

GEBRUIK NIET DIT BESTAND OM HET LABO TE MAKEN MAAR GEBRUIK DE LINK OP DIGITAP!

!!!!
-->

<style>
.holder_default {
    width:500px; 
    height:150px; 
    border: 3px dashed #ccc;
}

.hover { 
    width:400px; 
    height:150px; 
    border: 3px dashed #0c0 !important; 
}

.hidden {
    visibility: hidden;
}

.visible {
    visibility: visible;
}
</style>

<script type="application/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>

<form action="/task" method="post">

# Input Validation 1

Zoals altijd kunnen de oefeningen binnengehaald worden door een git pull te doen.

```
git pull
```

of de git repository te clonen als je deze nog niet hebt.

```
git clone https://github.com/similonap/software_security_2021.git
```

### Wat ga je leren in dit labo?
- Gebruik maken van Chrome Developer Tools
- Het nut van server side input validation/output sanitization begrijpen
- Code injection / SQL Injection
- Regular expressions

### Stappenplan

1. Ga naar de `labo_validation` directory en doe vervolgens

    ```
    npm install
    ```

2. In deze directory staat een heel onveilige ticket reservatie applicatie. Je kan deze opstarten met

    ```
    node index.js
    ```

    en dan naar http://localhost:3000 te surfen.

3. Je komt dan op een login pagina. Je kan eens proberen in te loggen met 
    ```
    username: joske
    password: hunter2
    ```

    vergeet niet de captcha in te vullen door de puzzel op te lossen. (een simpele som)

4. Je kan hier een ticket kopen voor een fictief festival. Hier zijn een aantal regels vastgelegd die worden gevalideerd op je browser. 

    Kijk naar de bron code in chrome developer tools en geef hier een overzicht van welke regels er gelden voor het ticketten formulier:

    <textarea style="width: 100%;" rows="8">
    </textarea>

    *Tip:* Er wordt gebruik gemaakt van regular expressions. Kan je die niet lezen kan je ze gewoon uitproberen op https://regex101.com/

    **Wees volledig!**

5. Gebruik de chrome developer tools om nu de validatie regels van het formulier aan te passen zodat je 

    - Tickets kan bestellen op je eigen naam, zelfs al ben je ingelogd met Joske
    - 10 Tickets kan bestellen in plaats van het maximum aantal tickets.
    - Tickets bestellen met landscode FR (Frankrijk)

    Neem een screenshot waar duidelijk staat dat je de tickets hebt gekocht en de chrome developer tools op te zien zijn. Sleep deze hieronder in:

    <div id="tickets" style="" class="holder_default">
          <img src="" id="tickets_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('tickets')
        });
    </script>

6. We gaan nu een code injection aanval proberen te doen zodat we wat te weten kunnen komen over de server. Log uit en pas de broncode zodat je het veld `captchaSource` toch kan aanpassen (want die is nu readonly). 

    Zorg ervoor dat er in het log venster van de server 'Hey je bent gehacked' komt te staan. Neem hiervan een screenshot en sleep deze hieronder in"

    <div id="gehacked" style="" class="holder_default">
          <img src="" id="gehacked_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('gehacked')
        });
    </script>

    Zoek in de `index.js` bron code waarom je zomaar code kan uitvoeren via dit veld. Leg hieronder uit waarom dit is.

    <textarea style="width: 100%;" rows="5">
    </textarea>

7. Zorg dat de variabele `SESSION_SECRET` aan ons getoond wordt aan de hand van het onveilige captcha veld. Wat is inhoud van deze variabele:

    <textarea style="width: 100%;" rows="3">
    </textarea>

    Dit zal er ongeveer uitzien als `QW5kaWUgU2ltaWxvbg==`

6. De code van `index.js` bevat een functie die de tabel van de ticketten leegmaakt. Probeer nu ook deze functie aan te roepen via dit onveilige captcha veld.

    Er zal iets in je log van je terminal komen. Neem hier een screenshot van en sleep dit hieronder in:

    <div id="cleardb" style="" class="holder_default">
          <img src="" id="cleardb_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('cleardb')
        });
    </script>

7. Probeer nu aan de hand van de `require()` functie in javascript de code van 'magicword.js' te laten uitvoeren op de server. De server zal mogelijk vastlopen (CTRL-C om terug te beginnen). 

    Er zal iets in je log van je terminal komen. Neem hier een screenshot van en sleep dit hieronder in:

    <div id="dennis" style="" class="holder_default">
          <img src="" id="dennis_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('dennis')
        });
    </script>

8. Pas de code aan van `index.js` zodat er geen ticketten meer kunnen besteld worden met een foute naam, verkeerde hoeveelheid en foute landcodes.

    Tip: Je hebt hier enkel een paar if statements voor nodig. Zoek naar de TODO van server validation.

9. Pas de code aan van `index.js` zodat de captcha niet meer kan misbruikt worden voor code injection. Het mag alleen maar sommen bevatten en geen andere code. 

    Tip: Je moet input validatie op `req.body.captchaSource` doen aan de hand van een regular expression. Je mag zelf kiezen welke error message je terug geeft.

11. Print deze pagina af als PDF en slaag deze op als `naam_voornaam_labo_validation.pdf` en stuur de volgende files op via digitap:

    - naam_voornaam_labo_validation.pdf
    - tickets.db
    - index.js

<script>
function addDrop(id) {
    var holder = document.getElementById(id);
    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondrop = function (e) {
      this.className = 'hidden';
      e.preventDefault();
      var file = e.dataTransfer.files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
          document.getElementById(id + '_image_droped').className='visible'
          $('#' + id + '_image_droped').attr('src', event.target.result);
      }
      reader.readAsDataURL(file);
    };
}
</script>


