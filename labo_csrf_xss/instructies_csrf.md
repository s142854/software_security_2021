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
- Het uitvoeren van een CSRF aanval
- het beschermen tegen een CSRF aanval

### Stappenplan

1. Ga naar de `labo_csrf_xss` directory en doe vervolgens

    ```
    npm install
    ```

2. In deze directory staat een heel onveilige bank applicatie waarmee je geld kan sturen van de ene persoon naar de andere.

    ```
    node index.js
    ```

    en dan naar http://localhost:3000 te surfen.

3. Je komt dan op een login pagina. Je kan eens proberen in te loggen met 
    ```
    username: dog
    password: hunter2
    ```

4. Pas de html file aan in de `public_cats` folder dat er naast het stelen van 100 euro ook automatisch een bericht wordt gestuurd naar dog waarin staat dat je het geld gestolen hebt. Je maakt hier gebruik van de `sendMessage` endpoint.

    Tip: Je gaat een extra iframe nodig hebben en een extra form. Deze moet je ook submitten a.d.v. javascript code.

5. Start de `cats.js` server en voer de CSRF aanval uit. Neem een screenshot van het ontvangen bericht.

    <div id="message" style="" class="holder_default">
          <img src="" id="message_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('message')
        });
    </script>

6. Gebruik net zoals de theorie de csurf library om een beveiliging in te bouwen tegen een CSRF aanval. Zorg ervoor dat alle forms een CSRF token hebben. 

7. Probeer de CSRF aanval nog een tweede keer uit te voeren. Dit zou niet meer mogen werken.

8. Gebruik de chrome developer tools om de CSRF token aan te passen in het formulier. Welke error krijg je als je deze token aanpast en waarom?

    <textarea style="width: 100%;" rows="8">
    </textarea>

8. Print deze pagina af als PDF en slaag deze op als `naam_voornaam_labo_csrf.pdf` en stuur de volgende files op via digitap:

    - naam_voornaam_labo_csrf.pdf
    - public_cats/index.html
    - views/login.ejs
    - views/main.ejs
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


