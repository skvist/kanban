# Kanban Service API

Varje bräde består av fyra kolumner - Backlog, In Progress, Test och Done, som sedan kan innehålla featuers/objekt (items) som ska utföras och sedan flyttas till nästa kolumn (type).


## Boards


Alla routes går igenom ett middleware som kontrollerar att en JSON Web Token har skickats med och är giltig.

Modell:
```
title: { type: String, required: true },
description: String,
owner: { type: String, required: true },
users: [ String ],
created: { type: Date, default: Date.now },
deleted: { type: Boolean, default: false },
```

## Endpoints

### GET /api/board/all

Visar alla brädor - enbart för test

Exempel
```
GET /api/board/all
```
<details>
    <summary>Resultat</summary>

    {
        "_id": "5a3eb44fec502a009528f523",
        "title": "Exempelbräde",
        "description": "Ett exempel",
        "owner": "doe",
        "__v": 0,
        "deleted": false,
        "created": "2017-12-23T19:53:51.006Z",
        "users": [
            "doe"
        ]
    },

</details>


### GET /api/board/show/:id

Visa ett specifikt bräde, kräver att användaren är ägare eller deltagare av brädan.

Exempel
```
GET /api/board/show/5a3eb44fec502a009528f523

```

<details>
    <summary>Resultat</summary>

    {
        "_id": "5a3eb44fec502a009528f523",
        "title": "Exempelbräde",
        "description": "Ett exempel",
        "owner": "doe",
        "__v": 0,
        "deleted": false,
        "created": "2017-12-23T19:53:51.006Z",
        "users": [
            "doe"
        ]
    }

</details>


### POST /api/board/create

Skapa ett nytt bräde.

Exempel

```
POST /api/board/create

body:
    title: "Exempel2",
    description: "Exempelbeskrivning",
    owner: "doe",
    users: ["doe"],
    create: "2017-12-23T19:53:51.006Z",
    deleted: false
```

<details>
    <summary>Resultat</summary>

    {
        success: true,
        title: "BoardCreated",
        message: 'Board Exempel2 created.'
    }

</details>

### POST /api/board/update/:id

Uppdatera ett bräde.

Exempel

```
POST /api/board/update/5a3eb44fec502a009528f523

body:
    title: "Nytt exempel",
    description: "En bättre exempelbeskrivning "
```

<details>
    <summary>Resultat</summary>

    {
        success: true,
        title: "BoardUpdated",
        message: 'Board Exempel2 updated.'
    }

</details>

### DELETE /api/board/delete/:id

Radera ett bräde.

Exempel

```
DELETE /api/board/delete/5a3eb44fec502a009528f523

```

<details>
    <summary>Resultat</summary>

    {
        success: true,
        title: "BoardDeleted",
        message: 'Board Exempel2 deleted.'
    }

</details>

### GET /api/board/user

Visa alla bräden som tillhör användaren (ägare och deltagare), användaren hämtas från JWT-payloaden.

#### Exempel

```
GET /api/board/user
```

<details>
    <summary>Resultat</summary>

    [
        {
            "_id": "5a3eb44fec502a009528f523",
            "title": "Exempelbräde",
            "description": "Ett exempel",
            "owner": "doe",
            "__v": 0,
            "deleted": false,
            "created": "2017-12-23T19:53:51.006Z",
            "users": [
                "doe"
            ]
        },
        {
            ...
        }
    ]

</details>


## Items

Items är motsvarande featuers eller post-its som är kopplade till ett bräde.

Alla routes går igenom ett middleware som kontrollerar att en JSON Web Token har skickats med och är giltig.

Modell:
```
title: { type: String, required: true },
description: String,
type: { type: String, required: true },
created: { type: Date, default: Date.now },
modified: { type: Date, default: Date.now },
duedate: { type: Date },
deleted: { type: Boolean, default: false },
position: Number,
createdby: String,
assigned: String,
timelog: [{
    user: String,
    description: String,
    time: Number,
}],
board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }
```

### GET /api/item/all

Visa alla items - enbart för test

#### Exempel

```
GET /api/item/all
```

<details>
    <summary>Resultat</summary>

    [
        {
            "_id": "5a3eb44fec502a009528f524",
            "title": "Feature X",
            "description": "Den ska returnera x",
            "type": "backlog",
            "duedate": "2017-12-22T17:17:17.000Z",
            "position": 1,
            "createdby": "doe",
            "assigned": "doe",
            "board": "5a3eb44fec502a009528f523",
            "__v": 0,
            "timelog": [],
            "deleted": false,
            "modified": "2017-12-22T17:17:17.000Z",
            "created": "2017-12-22T17:17:17.000Z"
        },
        {
            ....
        },
    ]

</details>

### GET /api/item/show/:id

Visa ett item baserat på ID.
Användaren måste vara ägare eller deltagare av brädet som objektet tillhör.

#### Exempel

```
GET /api/item/show/5a3eb44fec502a009528f524
```

<details>
    <summary>Resultat</summary>

    {
        "_id": "5a3eb44fec502a009528f524",
        "title": "Feature X",
        "description": "Den ska returnera x",
        "type": "backlog",
        "duedate": "2017-12-22T17:17:17.000Z",
        "position": 1,
        "createdby": "doe",
        "assigned": "doe",
        "board": "5a3eb44fec502a009528f523",
        "__v": 0,
        "timelog": [],
        "deleted": false,
        "modified": "2017-12-22T17:17:17.000Z",
        "created": "2017-12-22T17:17:17.000Z"
    }

</details>


### POST /api/item/create/:boardid/

Skapa ett nytt item (feature).
Användaren måste vara ägare eller deltagare av brädet som objektet tillhör.

Type kan vara "backlog", "inprogress", "test" eller "done".

Se modell för vad som kan skickas med i bodyn.

#### Exempel

```
POST /api/item/create/5a3eb44fec502a009528f523

body:
    "title": "Feature X",
    "description": "Den ska returnera x",
    "type": "backlog",
    "created": "2017-12-22 17:17:17",
    "duedate": "2017-12-22 17:17:17",
    "position": 1,
    "createdby": "doe",
    "assigned": "doe",
```

<details>
    <summary>Resultat</summary>

    {
        success: true,
        title: "ItemCreated",
        message: "Item Feature X created."
    }

</details>

### POST /api/item/update/:id/

Uppdatera ett objekt (item, feature).
Användaren måste vara ägare eller deltagare av brädet som objektet tillhör.

Type kan vara "backlog", "inprogress", "test" eller "done" (eller ingenting om den inte ska ändras).

Se modellen för vad som kan skickas med i bodyn.

#### Exempel

```
POST /api/item/update/5a3eb44fec502a009528f524

body:
    "title": "Feature X",
    "description": "Den ska returnera Y",
```

<details>
    <summary>Resultat</summary>

    {
        success: true,
        title: "ItemUpdated",
        message: "Item Feature X Updated."
    }

</details>

### DELETE /api/item/delete/:id/

Radera ett objekt (item, feature).
Användaren måste vara ägare eller deltagare av brädet som objektet tillhör.


#### Exempel

```
DELETE /api/item/delete/5a3eb44fec502a009528f524
```

<details>
    <summary>Resultat</summary>

    {
        success: true,
        title: "ItemUpdated",
        message: "Item Feature X Updated."
    }

</details>

### GET /api/item/board/:id/

Hämta alla objekt som till hör ett bräde.
Användaren måste vara ägare eller deltagare av brädet som objektet tillhör.

ID är brädets ID.

#### Exempel

```
GET /api/item/board/5a3eb44fec502a009528f523
```

<details>
    <summary>Resultat</summary>

    [
        {
            "_id": "5a3eb44fec502a009528f524",
            "title": "Feature X",
            "description": "Den ska returnera x",
            "type": "backlog",
            "duedate": "2017-12-22T17:17:17.000Z",
            "position": 1,
            "createdby": "doe",
            "assigned": "doe",
            "board": "5a3eb44fec502a009528f523",
            "__v": 0,
            "timelog": [],
            "deleted": false,
            "modified": "2017-12-22T17:17:17.000Z",
            "created": "2017-12-22T17:17:17.000Z"
        },
        {
            ....
        }
    ]

</details>