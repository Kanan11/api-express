# api-express
-->> Inlämning ETT att bygga REST API utan DB i Express <<--

har enkelt JSON med Rockgrupp namn lista och använd Express ramverk

GET,POST,PUT,DELETE fungerar som ska i båda back-end & front-end

för enkelt redovisningen alt back-end ligger i server.js filen och front-end i /public/logic.js

för att starta slå "npm start" eller "node server.js" i terminalen // OBS: har vald PORT 3012

ID-er random generar i varje server's start

1. Tryck "Visa Lista" för att se JSON listan // method GET
2. Slå TEXT i första "input" och tryck "Spara" knapp // method POST
3. Slå ID till första "input", från listan som du vill ta bort // method DELETE
4. Slå båda ID (första "input") och NY text (andra "input") att ändra // method PUT

för att se (kontrollera) resultat tryck "Visa Lista" varje gång

PS: installerad nodemon för live-server