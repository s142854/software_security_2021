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

<div id="alles">

# Cookies

Zoals altijd kunnen de oefeningen binnengehaald worden door een git pull te doen.

```
git pull
```

of de git repository te clonen als je deze nog niet hebt.

```
git clone https://github.com/similonap/software_security_2021.git
```

### Wat ga je leren in dit labo?
- Leren met cookies werken met chrome developer tools.
- De verschillende options mogelijk bij cookies begrijpen.
- Wireshark gebruiken om cookies te onderscheppen.

### Stappenplan

0. We raden je aan om google chrome te gebruiken voor dit labo. Wens je dat niet te doen zal je voor sommige settings zelf op zoek moeten gaan.
1. Open de terminal in ```labo_cookies``` via visual studio code en installeer alle npm dependencies met

    ```
    npm install
    ```

2. We hebben voor deze oefening net als vorig labo een webserver in node js geschreven. Je kan deze opstarten met

    ```
    node http.js
    ```

    Het certificaat voor deze server is al aangemaakt in deze sessie.

3. Open je browser op het volgende adres:  

    ```http://localhost:3000/show_cookies```

    Je zal daar de melding: 'No cookies... I'm hungry!' krijgen. 

    De show_cookies pagina zal via javascript code de cookies uitlezen en op je scherm laten zien. 

4. Ga daarna naar het adres:

    ```http://localhost:3000/set_cookies```

    daar krijg je de melding: 'Cookies set!'. Op dit moment heeft de webserver een aantal cookies gezet. Als je daarna terug naar de show_cookies pagina gaat dan krijg je er een aantal te zien. 

    *Neem screenshot en sleep bestand in het vak hieronder:*

    <div id="holder" style="" class="holder_default">
          <img src="" id="holder_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('holder')
        });
    </script>

5. Open de chrome developer tools via ```Ctrl + Shift + I``` (Windows) of ```Cmd + Opt + I``` (MacOS) en ga dan vervolgens naar het tabblad Application

    <img src="application.png" width="400">

    vervolgens ga je naar Cookies en klik je op ```http://localhost:3000```

    <img src="cookies.png" width="150">

    Je krijgt dan een lijst van cookies te zien.

    **Opmerking**: als je voor een reden in dit labo terug opnieuw wil beginnen kan je altijd rechter muisklikken en de cookies clearen. Vervolgens ga je terug naar ```http://localhost:3000/set_cookies``` om ze terug te zetten.

    <img src="clear_cookies.png" width="150">

    **Opmerking 2**: Negeer tot nader order de cookie *connect.sid*. Deze komt later aan bod.

6. Tot wanneer blijft cookie_1 geldig? 

    <textarea style="width: 100%">
    </textarea>

    In een cookie wordt dit het ```expires``` veld genoemd. De waarde van dit veld is een datum met tijdstip in string vorm.

7. cookie_2 zal snel vervallen. Indien je het niet ziet in de chrome developer tools. Ga dan nog eens naar ```http://localhost:3000/set_cookies``` en dan terug naar ```http://localhost:3000/show_cookies```. Binnen de 3 minuten zal cookie_2 altijd vervallen.

    In een cookie wordt dit het ```maxAge``` veld genoemd. De waarde van dit veld is het aantal milliseconden dat deze cookie zal blijven leven na het zetten ervan.

8. Hoeveel milliseconden zal een maxAge van 3 minuten zijn?

    <textarea style="width: 100%">
        </textarea>

9. Het ```HttpOnly``` veld op cookie_3 zorgt ervoor dat een cookie niet kan uitgelezen kan worden via javascript. Dit maakt het veilig zodat kwaadaardige scripts het niet kunnen uitlezen. 

    Maar hier een screenshot van en laat zeker zien dat je het HttpOnly vlag hebt gevonden. *Sleep het bestand in het vak hieronder:*

    <div id="httponly" class="holder_default">
          <img src="" id="httponly_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('httponly')
        });
    </script>

10. Ga nu naar 
    ```https://localhost:3001/set_cookies```

    en dan weer naar naar 

    ```https://localhost:3001/show_cookies```

    merk daar op dat er een nieuwe cookie is bijgekomen. Dit is omdat daarvoor deze cookie ```secure=true``` heeft staan.

11. Wat is de waarde van ```cookie_4```:

    <textarea style="width: 100%">
    </textarea>

    Waarom is de cookie nu pas zichtbaar?

    <textarea style="width: 100%">
    </textarea>

12. Ga nu naar 

    ```https://localhost:3001/hide_me/show_cookies```

    Daar is de laatste cookie ```cookie_5``` te vinden. Dit is omdat cookie_5 het veld ```path``` op '/hide_me' heeft gezet. Dit betekent dat de url 'hide_me' op zijn pad moet hebben (en alles daar onder)

13. Maak een screenshot van de developer tools waar alle 5 cookies op zichtbaar zijn. *Sleep het bestand in het vak hieronder:*

    <div id="allcookies" style="" class="holder_default">
          <img src="" id="allcookies_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('allcookies')
        });
    </script>

14. Je kan ook de waarden van de cookies aanpassen in de developer tools door te dubbelklikken op de value van de cookie

    <img src="change_value.png" width="200">

    Pas alle values aan van de cookies naar eender welke waarde en ga terug naar 

    ```https://localhost:3001/hide_me/show_cookies```

    *Maak hier een screenshot van en sleep het bestand in het vak hieronder:*

    <div id="allcookies_changed" style="" class="holder_default">
          <img src="" id="allcookies_changed_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('allcookies_changed')
        });
    </script>

15. Ook de ```expires``` en ```maxAge``` van een cookie kan aangepast worden. Zorg ervoor dat cookie_1 en cookie_2 niet meer vervallen. 

16. Ook het ```path``` kan aangepast worden. Zorg ervoor dat alle cookies ook zichtbaar zijn op

    ```https://localhost:3001/show_cookies```

17. het ```HttpOnly``` veld en het ```secure``` kan je jammer genoeg niet aanpassen. Maar zelfs daarvoor bestaat een oplossing:

    Klik op het lege gebied onder de cookies om een nieuwe cookie aan te maken. En maak een nieuwe cookie aan met de naam cookie_3 en dezelfde waarden als hiervoor. cookie_3 zal dan overschreven worden en het HttpOnly veld zal verdwenen zijn.

18. Maak een screenshot van de 

    ```https://localhost:3001/show_cookies```

    pagina (niet de developer tools!!). 
    *Sleep het bestand in het vak hieronder:*
    <div id="all_cookies_modified" style="" id="holder" class="holder_default">
          <img src="" id="all_cookies_modified_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('all_cookies_modified')
        });
    </script>

    **Alle 5 cookies moeten zichtbaar zijn.**

19. Open wireshark op de loopback interface (zie vorig labo) en probeer de cookies te vinden via wireshark. *Maak een screenshot en sleep het bestand in het vak hieronder:*

    <div id="wireshark" style="" id="holder" class="holder_default">
            <img src="" id="wireshark_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
        </div>
        <script>
            $(document).ready(function() {
                addDrop('wireshark')
            });
        </script>

    **Tip**: Herinner dat je https paketten niet kan uitlezen.

20. Vooraleer verder te gaan ga eerst naar de pagina

    ```https://localhost:3001```

    daar zal je ```Unauthorized``` terug krijgen omdat je nog moet inloggen.

21. Je kan inloggen door naar 

    ```https://localhost:3001/login?username=admin&password=admin``` 

    te surfen. Je zal hier ```login success!``` te zien krijgen. 

22. Ga terug naar 
    ```https://localhost:3001``` 

    je zal nu iets anders te zien krijgen dan hiervoor omdat je nu ingelogd bent.

21. Ga nu kijken in de developer tools window en je zult de session id daar terug vinden onder ```connect.sid```. Deze zal overeen komen met de session id op de server en zo weet de server welke gebruiker jij bent.

    *Maak een screenshot en sleep het bestand in het vak hieronder:*

    <div id="cookies_session" style="" class="holder_default">
            <img src="" id="cookies_session_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
        </div>
        <script>
            $(document).ready(function() {
                addDrop('cookies_session')
            });
        </script>

22. Als je nu de value van ```connect.sid``` veranderd naar iets anders en dan de webpagina refreshed dan zal je zien dat je weer uitgelogd bent. Waarom?

    <textarea style="width: 100%">
        </textarea>

23. Print deze pagina af als PDF en slaag deze op als `naam_voornaam_labo_cookies.pdf`.

    Stuur deze vervolgens in via digitap!

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

