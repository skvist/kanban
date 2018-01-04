# User Service API


## User

Hanterar användare och skapar JSON Web Tokens.


Modell:
```
username: { type: String, required: true, unique: true },
name: String,
email: { type: String, required: true, unique: true },
password: String,
admin: Boolean
```

## Endpoints


### GET /api/createuser

Skapa en testanvändare (doe) - enbart för test

Exempel
```
GET /api/createuser
```
<details>
    <summary>Resultat</summary>

    {
        success: true,
        message: "User doe created!"
    }

</details>

### GET /api/all

Visar alla användare och deras data exklusive lösenord - enbart för test

Exempel
```
GET /api/all
```
<details>
    <summary>Resultat</summary>

    [
        {
            "_id": "5a3e3665c55dd9001ec902a7",
            "username": "doe",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "__v": 0
        },
        {
            ...
        }
    ]
</details>

### GET /api/show/:username

Visar en användare exklusive lösenord

Exempel
```
GET /api/show/doe
```

<details>
    <summary>Resultat</summary>

    {
        "_id": "5a3e3665c55dd9001ec902a7",
        "username": "doe",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "__v": 0
    },

</details>

### POST /api/create

Visar en användare exklusive lösenord

Se modell för allt som bodyn kan innehålla.

Exempel
```
POST /api/create

body:

username: janedoe,
name: Jane Doe,
email: jane.doe@example.com,
password: password,

```

<details>
    <summary>Resultat</summary>

    {
        success: true,
        title: 'UserCreated',
        message: `User janedoe created.`
    }

</details>

### POST /api/login

Logga in med användarnamn och lösenord, returnerar en en JWT-token vid lyckad inloggning.


Exempel
```
POST /api/login

body:
    username: janedoe
    password: password

```

<details>
    <summary>Resultat</summary>

    {
        "success": true,
        "title": "LoginSuccessful",
        "message": "Login successful, token created.",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZS 6ImRvZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTE0MjA3MTA0LCJleHAiOjE1MTQyOTM1MDR9.nz-938YbmPyresZT-3GYE2wFSestOjsAIT2loSMhFWs",
        "username": "janedoe"
    }

</details>

## Errors
```

DB-error:
{
    success: false,
    title: err.name,
    message: err.message
}

No username
{
    success: false,
    title: 'NoUsernameProvided',
    message: 'No username provided.'
}

No Password
{
    success: false,
    title: 'NoPasswordProvided',
    message: `No password provided.`
}

Wrong password
{
    success: false,
    title: 'WrongPassword',
    message: 'The provided password does not match.'
}

```

### Not implemented:

### POST /api/update/:id

### POST /api/delete/:id
