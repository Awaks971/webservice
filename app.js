require("dotenv").config();

/**
 * Modules
 */
const express = require("express");
const path = require("path");
const app = express();
const helmet = require("helmet");
const limiter = require("./config/limiter");
const {
  user_verification,
  technician_verification
} = require("./config/auth_verification");

/**
 * Handlers
 */
const fill_cash_journals_handler = require("./handlers/cash_journal/fill_cash_journals");
const create_tax_documents_head = require("./handlers/tax_document/create_tax_documents_head");
const create_company_handler = require("./handlers/company/create_company");
const create_user_handler = require("./handlers/user/create_user");

/**
 * Some security
 */
app.disable("x-powered-by");
app.use(helmet());
app.use(limiter);

/**
 * Use express.json() to read JSON
 * And to read data in POST request in req.body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Set view engine on Pug
 * Set the views directory on ./mails/templates
 * It is only use for sending email
 */
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/mails/templates"));

/**
 * Users routes to store their data in dashboard database
 */
app.post("/fill-cash-journals", fill_cash_journals_handler);
app.post("/fill-tax-documents", create_tax_documents_head);

/**
 * Technician routes to create users and companies
 */
app.post("/create-company", create_company_handler);
app.post("/create-user", create_user_handler);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
