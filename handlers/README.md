# Handlers

All of this handlers have to be executed with a POST method. They had approximatively the same structure, a `payload` and `company_id`, expect the company and store creation who doesn't need the `company_id` field. This field is used to check company validity for each request. If the provided company_id isn't recognized by the database, you'll get a 401 - Unauthorized response.

## Vérifier la validité d'un utilisateur

```graphql
# https://360.awaks.fr/webservice/check-company-validity - POST
{
    company_id: ID!,
}
```

## Société

```graphql
# https://360.awaks.fr/webservice/create-company - POST
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
# https://360.awaks.fr/webservice/create-store - POST
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
# https://360.awaks.fr/webservice/fill-cash-journals - POST
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
# https://360.awaks.fr/webservice/fill-receipt-head - POST
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
# https://360.awaks.fr/webservice/fill-receipt-lines - POST
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
        payment_choice: String      # Méthode paiement du produit
        family_id: String           # ID de la famille du produit
        seller_id: String           # ID du vendeur
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## Journal de règlements

```graphql
# https://360.awaks.fr/webservice/fill-payment-journals - POST
{
    payload: [{
        id: ID!                     # ID du mode de règlement
        receipt_id: ID              # ID du ticket
        store_id: ID                # ID du magasin
        cash_journal_id: ID         # ID du journal de caisse
        amount_to_paid: Float       # Montant à payé
        returned_amount: Float      # Montant rendu
        paid_amount: Float          # Montant payé
        payment_label: String       # Libellé du règlement
        receipt_number: String      # Numéro du ticket
        date: String                # Date du règlement
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## Articles

```graphql
# https://360.awaks.fr/webservice/fill-articles - POST
{
    payload: [{
        id: ID!                     # ID du mode de règlement
        store_id: ID                # ID du magasin
        name: String                # Nom de l'article
        amount_ttc: Float           # Montant TTC
        amount_ht: Float            # Montant HT
        amount_vat: Float           # Montant de la TVA
        sold_count: Int             # Nombre de vente
        generated_amount: Float     # Montant généré
        date: String                # Date de dernière mise à jour
        buy_count: Int              # Nombre d'achat
        return_count: Int           # Nombre de retour
        profit: Float               # Profit
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## Familles

```graphql
# https://360.awaks.fr/webservice/fill-families - POST
{
    payload: [{
        id: ID!                     # ID du mode de règlement
        store_id: ID                # ID du magasin
        name: String                # Nom de l'article
        amount_ttc: Float           # Montant TTC
        amount_ht: Float            # Montant HT
        amount_vat: Float           # Montant de la TVA
        date: String                # DateTime de dernière mise à jour (YYYY-MM-DD HH:MM:SS)
        buy_count: Int              # Nombre d'achat
        return_count: Int           # Nombre de retour
        profit: Float               # Profit
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## Vendeurs

```graphql
# https://360.awaks.fr/webservice/fill-sellers - POST
{
    payload: [{
        id: ID!                     # ID du mode de règlement
        store_id: ID                # ID du magasin
        name: String                # Nom du vendeur
        article_sold: Int           # Nombre d'article vendu
        generated_amount: Float     # Montant généré
        date: String                # DateTime de dernière mise à jour (YYYY-MM-DD HH:MM:SS)
        buy_count: Int              # Nombre d'achat
        return_count: Int           # Nombre de retour
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## Fournisseurs

```graphql
# https://360.awaks.fr/webservice/fill-supliers - POST
{
    payload: [{
        id: ID!                     # ID du mode de règlement
        store_id: ID                # ID du magasin
        name: String                # Nom du fournisseur
        article_sold: Int           # Nombre d'article vendu
        generated_amount: Float     # Montant généré
        date: String                # DateTime de dernière mise à jour (YYYY-MM-DD HH:MM:SS)
        buy_count: Int              # Nombre d'achat
        return_count: Int           # Nombre de retour
    }, { ... }],
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

## Ressources

Il faut toujours envoyer le meme structure (un payload et un champ `company_id`) necéssaire a la sécurité des webservices.

```graphql
# https://360.awaks.fr/webservice/get-ressources - POST
{
    payload: {
        table: String
        elements: [String]
        condition: Object
    },
    company_id: String!             # ID de la société --> Nécessaire a la vérification de chaque requêtes
}
```

- **tables**: `cash_journal`, `payment_journal`, `receipt_head`, `receipt_line`.
- **elements**: Tous les éléments des payloads défini ci-dessus.
- **conditions**: `by_company`, `by_store`, `by_id`, `by_range`. A condition biensur que la condition soit éxécutable. Par exemple les journaux de paiements n'ont pas de `company_id`. Toujours vérifier les structures que l'ont appelle pour éviter les erreurs.

#### Exemple

```javascript
{
  payload: {
    table: "cash_journal",
    elements: ["id", "date"],
    conditions: [
      {
        by_company:
          "4b069570ad3a94d39187c65a25cf075708d93174450635bffb96308c8d205081"
      },
      {
        by_range: {
          range: {
            start: "2020-01-01",
            end: "2020-03-01"
          }
        }
      }
    ]
  },
  company_id: "4b069570ad3a94d39187c65a25cf075708d93174450635bffb96308c8d205081"
};
```
