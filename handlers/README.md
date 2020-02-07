## Creation d'une company

```graphql
# https://progys.me/create-company - POST
{
    payload: {
        id: ID!
        name: String!
        siret: ID!
        address: String
        postal_code: String
        city: String
        country: String
        phone: String
        email: String
    },
}

```

> Note: Quand tu crée une company, je crée un utilisateur par défault avec l'email de la company
> **Important**: Il faut que l'email soit valide pour recevoir un email avec le mot de passe. Si l'email est pas valide, la requêtes tourne sans fin (je ne m'assur pas encore de la validité d'un email)

## Creation d'un magasin

```graphql
# https://progys.me/create-store - POST
{
    payload: {
        id: ID!
        name: String!
        siret: ID!
        address: String
        postal_code: String
        city: String
        country: String
        phone: String
        email: String
        company_id: String
    },
}

```

## Cash journals

```graphql
# https://progys.me/fill-cash-journals - POST
{
    payload: {
        id: ID!
        store_id: ID!
        company_id: ID!
        date: String
        amount_ttc: Float
        amount_ht: Float
        basket_median: Float
        canceled_lines: Int
        profit_amount: Float
        profit_rate: Float
        articles_count: Int
        receipts_count: Int
    },
    company_id: String
}

```
