# En introduktion till JSON Web Token

JSON Web Token (JWT) är en öppen standard som kan finns i sin helhet i [RFC 7519](https://tools.ietf.org/html/rfc7519).

Det är ett JSON-objekt som används till att dela information mellan olika parter och består av en huvud, en nyttolast och en signatur i följande format `header.payload.signature`. Token i säg är en sträng så är det enkelt att skicka den mellan två parter i exempelvis en HTTP-header eller en query.

---

### Header

Huvudet består av två delar, där den första deklarerar att det JWT och den andra vilken hash-algorithm som används.

```
{
    "typ":"JWT",
    "alg":"HS256"
}
```

Sedan kodas denna med base64url_encode vilket skapar den första delen av vår Token -
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`.

---

### Payload

Sedan har vi payloaden, även kallat JWT Claims. Det finns tre typer; Registered Claim Names, Public Claim Names och Private Claim Names och de måste vara unika.

De registrerade är förutbestämda och återfinns i [RFC 7519 sektion 10.1](https://tools.ietf.org/html/rfc7519#section-10.1), det är exempelvis 'exp' vilket är giltlighetstiden för en token.

Privata Claims kan användas som registrereade claims mellan producent och konsument och kan skapa kollisioner då de måste vara unika.

Publika Claims är det som används när vi bestämmer vilken egen information som ska skickas med, det kan exempelvis vara ett användarnamn eller information ifall användare är en administratör.

---

### Payload
```
{
 "username": "doe",
 "admin": false,
 "iat": 1515508875,
 "exp": 1515512513,
 "jti": "66f76712-480c-4d2d-b7dd-27f47bc6732e"
}
```

Även detta kodas med base64url_encode och blir den andra delen i vår token `eyJ1c2VybmFtZSI6ImRvZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTE1NTA4ODc1LCJleHAiOjE1MTU1OTUyNzV9`


### Signature

Den tredje och sista delen i vår JWT är signaturen, den består av vår header, payload och vår hemliga nyckel ('secret') som tillsammans hashas med HMACSHA256.

`HMACSHA256 ( header.payload,secret )`

`HMACSHA256 ( eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTE1NTA4ODc1LCJleHAiOjE1MTU1OTUyNzV9,secret )`

Vilket resulterar i hela vår Token:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTE1NTA4ODc1LCJleHAiOjE1MTU1OTUyNzV9.rARHrZuL7lxMi67BeYUxLW1uVOFiiX1Uy7-CbUq3XFk`

---

## Ett NodeJS-exempel

Ett vanligt upplägg är att en Token skapas och returneras efter man loggat in och sedan kan man skicka med denna till exempelvis ett Rest API för authentisering. I API:et så verifierars ens Token hjälp av ens hemliga nyckel.

Det finns färdiga paket till de flesta språk och här följer ett exempel i NodeJS hur jag använde det i mitt slutprojekt i kursen Ramverk2.

Detta förutsätter att du har en klient och en server med valfria ramverk.

Klienten sparar sin Token i localStorage eller liknande och skickar med den vid sina HTTP-anrop.

```
npm install jsonwebtoken --save # installera ett av alla paket som finns
```

### Login-server
```
...
// Kod för att kontrollera att användarnamn och lösenord stämmer överens
// och returnera till ett user-objekt
...

const jwt = require('jsonwebtoken);

const payload = {
    username: user.username,
    admin: user.admin
};

var token = jwt.sign(payload, 'secret', {
    expiresIn: 60*60*24
});

response.json({
    success: true,
    title: 'LoginSuccessful',
    message: 'Login successful, token created.',
    token: token,
});
```

Rest API

```
const jwt = require('jsonwebtoken);

const token = req.body.token || req.query.token || req.headers['x-access-token'];

if (!token) {
    return response.status(403).send({
        success: false,
        status: 403,
        title: 'NoTokenProvided',
        description: "Forbidden, missing token."
    });
}

jwt.verify(token, 'secret', options, (err, decoded) => {
    if (err) {
        return response.status(403).send({
            success: false,
            status: 403,
            title: err.name,
            description: `Forbidden. ${err.message}`

        });
    } else {
        // Svara på API-anropet
    }
```

---

Det var allt för denna gång, vi avslutar med några länkar.


JWT RFC 7519 [https://tools.ietf.org/html/rfc7519](https://tools.ietf.org/html/rfc7519)

Testa och lek med Tokens: [https://jwt.io](https://jwt.io/)

Auth0 har mycket material och paket till de flesta språken [https://auth0.com/docs/jwt](https://auth0.com/docs/jwt)