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

# Encryptie

In dit labo gaan we dieper in op het onderwerp encryptie en decryptie.

### Wat ga je leren in dit labo?
- Burpsuite gebruiken voor Base64 decoding te doen
- Caesar Cypher toepassen
- GPG gebruiken voor encryptie en decryptie van files en berichten.

### Voorbereiding
- Lees het deel over base64 encoding in het onderdeel base64 encoding in de syllabus op gitbook.

    <a target="_blank" href="https://app.gitbook.com/@apwt/s/g-pro-software-security/hashing/base64-encoding">https://app.gitbook.com/@apwt/s/g-pro-software-security/hashing/base64-encoding</a>
- Lees het deel over asymmetrische encryptie in het onderdeel GPG in de syllabus op gitbook.

    <a target="_blank" href="https://app.gitbook.com/@apwt/s/g-pro-software-security/hashing/encryptie-tools#assymmetrische-encryptie">https://app.gitbook.com/@apwt/s/g-pro-software-security/hashing/encryptie-tools#assymmetrische-encryptie</a>

### Stappenplan

1. Download op open het eastere.gg bestand van de beveiligde ftp van de juice shop (zie labo 1) 

    Daar vind je een geheime boodschap dat geëncodeerd is in Base64. Decodeer eerst dit bericht en vul het hier onder in. 

    <textarea style="width: 100%;" rows="2">
    </textarea>

    <details>
    <summary>Eerste tip</summary>
    
    Je kan BurpSuite gebruiken om berichten die in base64 geëncodeerd te decoderen.
    
    </details>
    

4. Nu je dit bericht gedecodeerd hebt lijkt het nog altijd niet leesbaar te zijn. 

    Er is een een caesar cipher gebruikt. We weten wel niet hoeveel de letters opgeschoven worden (we noemen dit de shift). 

5. Je kan hiervoor een <a href="https://www.dcode.fr/caesar-cipher" target="_blank">caesar cipher webtool</a> voor gebruiken. Zorg er zeker voor dat je

    `TEST ALL POSSIBLE SHIFTS (BRUTE-FORCE ATTACK)`

    hebt aanstaan. 

6. Vul het geheime bericht hier in het tekstveld in:

    <textarea style="width: 100%;" rows="4">
    </textarea>

    en wat was de shift van de caesar cipher

    <input type="number" value="0"/>

7. Maak een bestand `wiebenik.txt` aan met als inhoud voor en achternaam in. 

8. Open je terminal en gebruik `gpg` om dit bestand te encrypteren met **symmetrische encryptie**. Gebruik het paswoord `labo_2021`. Je krijgt nu een bestand `wiebenik.txt.gpg`

9. Dit is een geëncrypteerd bestand. Probeer dit bestand eens uit te lezen met notepad of een andere editor, wat merk je op?

    <textarea style="width: 100%;" rows="2">
    </textarea>

10. Download het geëncrypteerd bestand <a href="awesome.jpg.gpg">awesome.jpg.gpg</a>. Decrypteer dit bestand gebruikmakende van `gpg` met het paswoord `labo_2021`.

11. Open dit bestand... And feel awesome! 🦄

9. Ga naar de online pgp tool op 
https://smartninja-pgp.appspot.com/#
10. Genereer zelf een PGP keypair voor jezelf. Kies RSA als algoritme en een keysize van 1024bit. Zorg ervoor dat de sleutel nooit vervalt. Kies een passphrase en zorg ervoor dat je deze onthoudt.
11. Probeer een bericht te encrypteren met mijn publieke sleutel. Je mag hier zelf kiezen wat je stuurt. Mijn publieke sleutel kan je <a href="public_key.txt" target="_blank">hier</a> vinden.
<!-- softwaresecurity2021 -->

12. Plaats het geëncrypteerde bericht in een bestand genaamd `encrypted_message.txt`.

13. Probeer met je eigen public key zelf een bericht naar jezelf te encrypteren en daarna vervolgens te decrypteren. 
14. Als extra kan je eens een bericht naar jezelf proberen te sturen met je eigen publieke sleutel. Of je probeert eens samen met iemand anders geheime berichten naar elkaar te sturen.

11. Print deze pagina af als PDF en slaag deze op als `naam_voornaam_labo_encryptie.pdf`

    Zip alle bestanden die je in dit labo hebt aangemaakt en stuur deze in via digitap. Deze bestanden zijn:
    - wiebenik.txt.gpg
    - encrypted_message.txt
    - awesome.jpg
    - naam_voornaam_labo_encryptie.pdf

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

