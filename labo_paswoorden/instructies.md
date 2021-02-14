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

# Introductie

In deze labo sessie kruipen we weer in de rol van white hat hacker die de Juice Shop die jullie vorige les hebben  geïnstalleerd. Deze keer gaan we aan de hand van de tool BurpSuite het paswoord van de administrator brute force te hacken.

### Wat ga je leren in dit labo?
- Installeren van BurpSuite.
- Brute force hacken van een paswoord.

### Stappenplan

1. Open de registratie pagina van de juice shop web applicatie

2. Zijn alle paswoorden die je hier kan ingeven 'sterke paswoorden'? Zo niet, wat is er mis?

    <textarea style="width: 100%;" rows="4">
    </textarea>
    <details>
    <summary>Eerste tip</summary>
    
    Kijk op het hoofdstuk over <a href="https://app.gitbook.com/@apwt/s/g-pro-software-security/les-1-introductie/authenticatie-guidelines">paswoorden</a>. 
    
    </details>
 
3. Open je browser en ga naar de volgende website
    
    <a href="https://portswigger.net/burp/releases/professional-community-2021-2?requestededition=community" target="_blank">BurpSuite</a>
    
    en download de Community Edition van BurpSuite voor jouw platform.

2. Bekijk het filmpje over het installeren en de werking van BurpSuite proxy.

    <iframe src="https://ap.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=2aa79c25-52e0-4b17-b3fa-accd00e3b198&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen></iframe>

3. Vooraleer we kunnen beginnen met het kraken van het admin paswoord, moeten we op zoek gaan naar het email adres van de administrator. 

    <details>
    <summary>Eerste tip</summary>
    
    De email adressen van de gebruikers kan je gewoon uitlezen in de reviews van producten.
    
    </details>

4. We gaan uiteraard niet zelf alle mogelijkheden proberen. We gaan hier gebruik maken van een paswoord list. Ga naar de website

    https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials

    Dit is een grote collectie aan text bestanden die allemaal onveilige paswoorden bevatten. Voor deze beperkte opgave hoef je alleen `best1050.txt` te downloaden.

5. Start Burp Suite op en gebruik de proxy om de request op te vangen waarmee je probeert mee in te loggen (Zie filmpje hierboven). 

    Neem een screenshot van deze request en sleep deze hier onder in:

    <div id="holder" style="" class="holder_default">
          <img src="" id="holder_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('holder')
        });
    </script>

6. Gebruik deze request in de Intruder tool door op actions te klikken en vervolgens op 'send to intruder' te klikken. Ga vervolgens naar de intruder tab.

7. Zorg ervoor dat alleen het paswoord variabel is.

    <details>
    <summary>Eerste tip</summary>
    
    Zorg ervoor dat er alleen bij het paswoord een § symbool staat.
    
    </details>

8. Ga naar de payloads tab en zorg ervoor dat je de file `best1050.txt` gebruikt als paswoord lijst.

9. Start de aanval en maak een screenshot als het paswoord gevonden is. 

    Sleep de screenshot hier onder in:

    <div id="holder1" style="" class="holder_default">
          <img src="" id="holder1_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('holder1')
        });
    </script>

    **Opmerking:** Na maximum 200 pogingen zou het paswoord gevonden moeten zijn. Duurt dit langer, dan ben je op het foute spoor.

9. Vindt je dit een goed paswoord? Waarom wel/niet? 

    <textarea style="width: 100%;" rows="4">
    </textarea>

10. Spoor net zoals in vorig labo de 'administration' pagina op en log in met de admin email en paswoord. Neem hier een screenshot van en sleep deze hier onder in: 

    <div id="holder2" style="" class="holder_default">
          <img src="" id="holder2_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('holder2')
        });
    </script>

23. Print deze pagina af als PDF en zend deze via digitap in.

    **Opmerking:** Als dit niet lukt maak dan een zip file en stuur deze door.

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

