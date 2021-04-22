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

# Input Validation 2

Zoals altijd kunnen de oefeningen binnengehaald worden door een git pull te doen.

```
git pull
```

of de git repository te clonen als je deze nog niet hebt.

```
git clone https://github.com/similonap/software_security_2021.git
```

### Wat ga je leren in dit labo?
- Uitvoeren van SQL Injection aanvallen
- Oplossen van SQL Injection risico's

### Database design 

De applicatie bestaat uit twee tabellen:

```
CREATE TABLE Ticket (name STRING, country STRING, tickets INTEGER)
CREATE TABLE User (username STRING, password STRING, admin BOOLEAN, fullname STRING)
```

### Stappenplan

1. Ga naar de `labo_validation` directory en doe vervolgens

    ```
    npm install
    ```

2. Hier vinden we weer onze onveilige web applicatie! Je kan deze opstarten net als vorig labo met 

    ```
    node index.js
    ```

3. Probeer een SQL injection aanval op het login scherm. Je kan het Username veld misbruiken om jezelf in te loggen als admin.

    **Tip:** De SQL Query wordt afgeprint in je console venster. Zo kan je gemakkelijker zien welke query er uitgevoerd wordt bij het inloggen.

    Welke string heb je moeten ingeven om de SQL aanval uit te voeren:

    <textarea style="width: 100%;" rows="2">
    </textarea>

    Neem een screenshot van de admin pagina en sleep deze hieronder in

    <div id="admin" style="" class="holder_default">
          <img src="" id="admin_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('admin')
        });
    </script>

4. Bij show ticket sales kun je een overzicht krijgen van alle gekochte tickets. Je kan daar ook zoeken op alle tickets. De query die hier gebruikt wordt is ook gevoelig aan een SQL injection aanval.

5. Het is mogelijk om alle tabellen van de database uit te printen aan de hand van een UNION gebaseerde aanval. 

    In SQLite kan je alle tabellen opvragen via
    ```
    SELECT name FROM sqlite_master WHERE type ='table';
    ```

    Je kan in het search input veld via de ticket sales pagina een SQL injection aanval doen door:

    ```
    %' UNION SELECT name FROM sqlite_master WHERE type ='table'; --
    ```

    in te geven in het invoerveld. Dit werkt jammer genoeg niet, waarom niet?

    <textarea style="width: 100%;" rows="5">
    </textarea>

    **Tip:** vergelijk het aantal kolommen van de query hier boven en de query die gedaan wordt om de Tickets op te vragen.

6. Pas nu de query string van hierboven aan zodat er evenveel kolommen geselecteerd worden als de query die wordt gedaan voor show-tickets.

    **Tip:** Je kan lege kolommen toevoegen a.d.h.v '' of gewoon de naam meerdere keren selecteren.

    Welke string heb je moeten ingeven om de SQL aanval uit te voeren:

    <textarea style="width: 100%;" rows="3">
    </textarea>

    Neem een screenshot van de uitgeprinte tabellen en sleep deze hieronder in:

    <div id="tables" style="" class="holder_default">
          <img src="" id="tables_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('tables')
        });
    </script>

5. Je kan aan de hand van een UNION sql injection aanval ook de User tabel uitlezen.

    Welke string heb je moeten ingeven om de SQL aanval uit te voeren:

    <textarea style="width: 100%;" rows="3">
    </textarea>

    Neem een screenshot van de uitgeprinte User tabel en sleep deze hieronder in:

    <div id="user" style="" class="holder_default">
          <img src="" id="user_image_droped"  style="max-width:80%; border: 3px dashed #7A97FC;" class=" hidden"/>
    </div>
    <script>
        $(document).ready(function() {
            addDrop('user')
        });
    </script>

7. **Extra:** Ook bij het kopen van tickets kan je een SQL Injection aanval doen. Probeer een User toe te voegen door het `Naam` veld te misbruiken. 

    Zorg er eerst voor dat je de wijzigingen voor server side validation van vorige les in commentaar zet!

    Wat moest je in het Naam veld ingeven om een User toe te voegen.

    <textarea style="width: 100%;" rows="2">
    </textarea>

6. **Extra:** Er zijn nog interessante Tabellen die je kan uitlezen!

8. Gebruik prepared statements om de applicatie veilig te maken voor SQL injection attacks.

   **Opgepast:** Zorg dat alles blijft werken. Bij de LIKE query zal je '%' + name + '%' moeten meegeven als parameter voor het vraagteken.

11. Print deze pagina af als PDF en slaag deze op als `naam_voornaam_labo_sql_injection.pdf` en stuur de volgende files op via digitap:

    - naam_voornaam_labo_sql_injection.pdf
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


