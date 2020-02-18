# Handlers

All of this handlers have to be executed with a POST method. They had approximatively the same structure, a `payload` and `company_id`, expect the company and store creation who doesn't need the `company_id` field. This field is used to check company validity for each request. If the provided company_id isn't recognized by the database, you'll get a 401 - Unauthorized response.

## Vérifier la validité d'un utilisateur

```graphql
# https://progys.me/check-company-validity - POST
{
    company_id: ID!,
}
```

## Société

```graphql
# https://progys.me/create-company - POST
{
    payload: {
        id: ID!                 # ID de la société
        name: String!           # Nom de la société
        siret: ID!              # Siret de la société
        address: String         # Adresse (line_1)
        postal_code: String     # Code postal
        city: String            # Ville de la société
        country: String         # Pays
        phone: String           # Téléphone
        email: String           # Email
    },
}
```

> Note: Quand tu crée une company, je crée un utilisateur par défault avec l'email de la company
> **Important**: Il faut que l'email soit valide pour recevoir un email avec le mot de passe. Si l'email est pas valide, la requêtes tourne sans fin (je ne m'assur pas encore de la validité d'un email)

## Magasin

```graphql
# https://progys.me/create-store - POST
{
    payload: {
        id: ID!                 # ID du magasin
        name: String!           # Nom du magasin
        siret: ID!              # Siret du magasin
        address: String         # Adresse (line_1)
        postal_code: String     # Code postal
        city: String            # Ville du magasin
        country: String         # Pays
        phone: String           # Téléphone
        email: String           # Email
        company_id: String      # ID de la société
    },
}
```

## Journal de caisses

```graphql
# https://progys.me/fill-cash-journals - POST
{
    payload: {
        id: ID!                     # ID du journal de caisse
        store_id: ID!               # ID du magasin
        company_id: ID!             # ID de la société
        date: String                # Date du journal
        amount_ttc: Float           # Montant TTC
        amount_ht: Float            # Montant HT
        discount_count: Int         # Nombre de remises
        basket_median: Float        # Panier moyen
        canceled_lines: Int         # Lignes annulé
        profit_amount: Float        # Montant de la marge
        profit_rate: Float          # Taux de la marge
        article_count: Int          # Nombres d'articles
        receipt_count: Int          # Nombres de tickets
    },
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## En-tête de tickets

```graphql
# https://progys.me/fill-receipt-head - POST
{
    payload: [{
        id: ID!                     # ID du ticket
        receipt_number: String!     # Numéro du ticket
        store_id: ID!               # ID du magasin
        company_id: ID!             # ID de la société
        date: String                # Date du journal
        amount_ttc: Float           # Montant TTC
        amount_ht: Float            # Montant HT
        amount_vat: Float           # Montant de la TVA
        profit: Float               # Montant de la marge
        article_count: Int          # Nombres d'articles
        client_id: ID               # ID du client
        seller_id: ID               # ID du vendeur
        fees_rate: Float            # Taux des frais
        cash_journal_id: ID         # ID du journal de caisse
        canceled_lines: Int         # Nombre de lignes annulées
        discount_rate: Float        # Taux de la remise
        line_count: Int             # Nombres de lignes
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## Lignes de tickets

```graphql
# https://progys.me/fill-receipt-lines - POST
{
    payload: [{
        id: ID!                     # ID du ticket
        receipt_id: ID!             # ID du ticket
        amount_ttc: Float           # Montant TTC
        amount_ht: Float            # Montant HT
        amount_vat: Float           # Montant de la TVA
        vat_rate: Float             # Taux de la TVA
        amount_discount: Float      # Montant de la remise
        label: String               # Désignation du produit
        label_extra: String         # Désignation extra
        article_id: ID              # ID de l'article
        article_count: Int          # Nombres d'articles
        profit: Float               # Montant de la marge
        canceled_articles: Int      # Nombre de lignes annulées
        line_position: Int          # Position de la ligne sur le ticket
        purchase_price: Float       # Prix d'achat du produit
        sell_price: Float           # Prix de vente du produit
        store_id: ID                # ID du magasin
        date: String                # Date du ticket
        company_id: ID              # ID de la société
        sell_price: Float           # Prix de vente du produit
        payment_choice: String      # Méthode paiement du produit
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```
