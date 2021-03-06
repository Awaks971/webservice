# TPV_webservice

Webservice who help us to hydrate the dashboard database from physical TPV.

- **Express** : Minimal and flexible Node.js web application framework

- **Nodemailer** : Module for Node.js to send emails

- **MariaDB** : One of the most popular open source relational databases. It's made by the original developers of MySQL and guaranteed to stay open source

- **Pug** : Pug is a high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers

# Config

We are using a remote MariaDB server with pool connections.

To perform async opérations in the database we have write a custom method `queryAsync`. You can see it in `./config/database.js` on the bottom of th file

# Handlers

We have group all of our handlers by features.

For example, in `./handlers/user` we have some functions that allow us to create/update a user. Basicly, in each folder in `./handlers` you have a `C.R.U.D.` in.

In `./handlers/ressources` you can find examples of what you can send to use the handlers, like create a user or a company

# Mails

We are using `nodemailer-promise` to send emails to our users. We had create a `send_email` function that allow us to send emails easly with a `OAuth2` verification with a `refreshToken` and `accessToken`.

To send an email, follow these steps:

- Create a email tempalte if you don't have one ready
- Place your data you want to get in your email using `#{my_data_here}` pug templating method ( example: Bonjour #{user_name} )
- Use the `send_email` function:

```javascript
await send_email({
  to: "my_user@email.com",
  subject: "Welcome",
  template: "welcome.pug",
  email_data: {
    user_name: "USER_NAME",
    email: "USER_EMAIL",
    password: "USER_PASSWORD"
  }
});
```

> Notice that the root directory to get a template is already set in `./mails/templates`.
> All you have to do is create your template in this folder and just call the name in the `send_email` function
