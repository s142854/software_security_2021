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

# Hashing

In dit labo gaan we dieper in op hashing van bestanden en van paswoorden

### Wat ga je leren in dit labo?
- Een hash laten berekenen van een gedownload bestand.

### Voorbereiding
- Neem de slides over hashing nog eens uitvoerig door.
- Neem de gitbook pagina over de library crypto-js door:

    `https://apwt.gitbook.io/g-pro-software-security/hashing/crypto.js`

### Stappenplan

1. Je hebt in vorig labo Burpsuite gedownload. Ga naar de download pagina van burpsuite (community edition) en probeer de SHA256 checksum van dit bestand te weten te komen. Geef deze hieronder in het tekstvak in:

    <textarea style="width: 100%;" rows="1">
    </textarea>

2. Gebruik CertUtil (of openssl) commando om de SHA256 hash te berekenen van dit bestand. 

    Neem een screenshot van je terminal en sleep deze hieronder in:

    <div id="holder1" style="" class="holder_default">
          <img src="" id="holder1_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('holder1')
        });
    </script>

3. Deze SHA256 hash moet hetzelfde als die je op de website hebt gevonden. Waarom?

    <textarea style="width: 100%;" rows="4">
    </textarea>

4. Doe een git clone van de volgende repository:

    ```https://github.com/similonap/software_security_2021.git```

   Ga naar de directory `labo_encryptie` en voer het commando 

   ```
   npm install
   ```
   
   uit.

2. In dit deel van het labo zijn we aangenomen om de bank 'UNSAFE BANK INC.' te helpen met hun security problemen. Jij bent uiteraard na de cursus Software Security de aangewezen persoon om hun daarbij te helpen.

3. Ze hebben ons een script aangeboden dat hun ```users``` databank afprint. Je kan het script laten lopen door
    ```
    node password_db_print.js
    ```

    uit te voeren in je terminal. 

    Wat merk je op in verband met de paswoorden?

    <textarea style="width: 100%;" rows="4">
    </textarea>

4. Om in te loggen hebben ze ook een script aangeboden. Je kan het laten uitvoeren door 
    ```
    node login.js
    ```
    in de terminal uit te voeren. Log in met 1 van de users die je in de vorige stap hebt gezien.

5. We moeten deze passwoorden nu ```hashen``` zodat deze niet meer leesbaar zijn voor hackers indien deze zouden gestolen worden.

6. Ga naar het bestand ```security.js``` en pas de ```hash``` functie aan zodat deze het ```PBKDF2``` algoritme gebruikt om het passwoord te hashen. Zorg ervoor dat er maar 1 iteration wordt gedaan en dit de salt gebruikt die daar boven aangemaakt wordt. We willen hier de hexadecimale string representatie van.

    ***Opgelet***: gebruik hiervoor de ```iterations``` en ```salt``` constante die boven de functie al klaarstaat.

7. Voer nu terug het 

    ```
    node password_db_print.js
    ```

    script uit. Nu zal je zien dat de paswoorden niet meer zomaar uitleesbaar zijn.

    Neem hier een screenshot van:

    <div id="holder2" style="" class="holder_default">
          <img src="" id="holder2_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('holder2')
        });
    </script>


8. Na je wijziging klagen de klanten van de bank dat ze niet meer kunnen inloggen met het ```login.js``` script.

    Dit komt omdat het passwoord dat je ingeeft ook eerst moet gehashed worden met de ```hash``` functie vooraleer je die aan de ```login``` functie moet meegeven. Pas het ```login.js``` bestand aan zodat je terug kan inloggen. 

9. Je hebt al opgemerkt dat er in de output vaak:

    ```[DEBUG] hash(admin123) took 1 ms```

    stond. Dit is omdat we ook de snelheid van het hashing algoritme willen testen. Met 1 iteratie ging dit heel snel. Veel te snel! Dit betekent dat een hacker dit zelf ook heel snel kan berekenen. Hij moet dit natuurlijk wel voor alle combinaties testen. 

    De bank wil dat jij het aantal iteraties van het hashing algoritme verhoogt zodat dit gemiddeld gezien ongeveer 200ms zal duren om een hash te berekenen. 

    Test de snelheid van je hashing functie door

    ```
    node hashing_speed_test.js
    ``` 

    uit te voeren. Indien het niet rond 200ms ligt, pas je het aantal iterations in ```security.js``` aan en herhaal je de stap. 

10. We gaan nu weer even terug naar de juice shop. We hebben via een andere hacker een gehashed paswoord te pakken gekregen van de gebruiker admin@juice-sh.op:

    `0192023a7bbd73250516f069df18b500`

    gebruik nu de website 
    
    ```https://www.nitrxgen.net/md5db/```
    
    om het originele paswoord te bepalen. 

    Neem een screenshot van je browser en sleep deze hieronder in:

    <div id="holder3" style="" class="holder_default">
          <img src="" id="holder3_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('holder3')
        });
    </script>

12. Log in met deze gebruiker en verifieer of het paswoord klopt.

11. Print deze pagina af als PDF en slaag deze op als `naam_voornaam_labo_hashing.pdf`

    Zip alle bestanden die je in dit labo hebt aangemaakt en stuur deze in via digitap. Deze bestanden zijn:
    - security.js
    - login.js
    - naam_voornaam_labo_hashing.pdf

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

