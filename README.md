etygsgrundande gruppuppgift: Filmvisarna
Introduktion

Företaget Filmvisarna AB är en liten biografkedja som vill börja konkurrera lokalt med SF. De har ett par biografsalonger i Småstad och har säkrat rättigheter att visa ett antal olika filmtitlar.

Nu behöver de hjälp att bygga en prototyp för en webbsajt, där besökarna ska kunna:

    Få information om filmer som visas, inkl. datum och tider.
    Se trailers för filmerna
    Boka sina biobiljetter online - och få reda på totalpris, placeringar (rad och stolsnr) samt bokningsnummer.
    (Logga in och) se sina bokningar (både historik och kommande).

Inlämning

Inlämning sker via PingPong vecka 14, senast söndag 11 april kl 23.55
Sprintar: 2 st, sprint 1: 9 mars - 26 mars, sprint 2: 29 mars - 8 april
Inlämningen skall bestå av en

    Github-länk
    En länk till en publik trello-board.
    Lista över vilka github-användarnamn som motsvarar era riktiga namn
    Att ni berättar om ni har satsat på att klara uppgiften på G eller VG-nivå
    En representant från gruppen (SCRUM-master) lämnar in.

Tekniska krav

    Trello för projektplanering.
    Git för versionshantering, med tydliga (beskrivande) commit-meddelanden.
    Feature-branches i Git (inga personliga).
    Backend: Ni kommer att få skelettkod i Node.js/JavaScript som ni kan komplettera, den kommer att möjliggöra att spara bokningar och användare till JSON-filer.
    Bra systemarkitektur med tydlig mappstruktur. (Inte en mapp som innehåller hela programmet)
    Ingen fil ska vara över 300 rader. (Över 200 och det är dags att bryta ut delar i annan fil)
    Alla i gruppen ska arbeta med både HTML/CSS och JavaScript.
    Ni skall arbeta agilt enligt SCRUM, t.ex. med sprint planering, daily stands up m.m.
    Skriv er kod objektorienterat (med tydliga klassnamn och metodnamn etc) alternativt med uppdelad i tydligt namngivna funktioner.
    Använd inte komplexa frontendramverk som Angular, Vue eller React.
    Använd gärna jQuery som hjälpbibliotek (inte ett krav, men ett tips).

Hur börjar vi?

    Utse en SCRUM-master för sprint 1.
    Börjar med att skissa (lo-fi / wireframes) på hur sajten ska se ut.
    Genomför sprintplanering (nedbrytning av user stories till task + spela poker och lägg upp user stories och tasks i Trello)
    SCRUM-master sätter upp ett git-repo och bjud in alla medlemmar som “collaborators”
    Skapa nödvändig JSON-data (för visningar, filmer och salonger) och spara i JSON-filer…
    Börja arbeta med tasks och träffas dagligen för “daily standup” via Teams eller annan kanal.

User stories
G-krav

Samtliga dessa krav/user stories ska vara uppfyllda för G:

    Som besökare vill jag få information om filmer jag kan se på biograferna.
    Som besökare vill jag kunna veta när en film visas på en biograf.
    Som besökare vill jag kunna boka biljetter till filmer.
    Som systemägare vill jag se en prototyp med minst 5 filmer, fördelade på 3 dagliga visningar under 4 veckors (fiktiva) visningsdatum över våra 2 biografsalonger.
    Som besökare vill jag kunna se lediga platser i en salong på en specifik visning.
    Som besökare vill jag kunna gå till en detaljsida för en specifik film.
    Som besökare vill jag kunna boka platser på en visning.
    Som besökare vill jag inte kunna boka redan bokade platser.
    Som besökare vill jag få en bekräftelse på bokning, innehållande valda stolsnummer, vilken film och datum/tid.
    Som systemägare vill jag att alla bokningar sparas.
    Som användare vill jag kunna se mina bokningar och bokningshistorik (genom att logga in eller att de sparas lokalt på min dator via localStorage).
    Som besökare vill jag kunna boka biljetter med olika pris:
        Barn: 65kr
        Normal: 85kr
        Pensionär: 75kr

VG-krav

Uppfyll alla G-krav, samt minst 4 av följande VG-krav/user stories:

    Se till att bygga sajten som en s.k. Single Page Application.
    Sajten ska vara responsiv - dvs klara av att visas på olika stora skärmar (mobiler, plattor, datorskärmar av olika storlek).
    Som besökare vill jag kunna filtrera visningar på datum.
    Som besökare vill jag kunna filtrera filmer på åldersgrupp.
    Som besökare vill jag kunna se trailers på filmer.
    Som besökare vill jag se live när stolar blir bokade när jag ska välja stolar på en visning.
    Som användare vill jag kunna avboka en framtida bokning.

Individuell bedömning

Ovanstående krav är på gruppnivå. Som individ kan du dock få ett annat betyg om du t.ex:

    bidrar med mycket mer kod än andra gruppmedlemmar
    bidrar med mycket mindre kod än andra gruppmedlemmar
    inte deltar aktivt i grupparbetet
    inte skriver kod som stämmer överens med de tasks du har åtagit dig att utföra.
