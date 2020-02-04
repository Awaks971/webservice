require("dotenv").config();

/**
 * Modules
 */
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const limiter = require("./middlewares/limiter");
const {
  technician_verification_middleware,
  user_verification_middleware
} = require("./middlewares/auth_verification");

/**
 * Handlers
 */
const fill_cash_journals_handler = require("./handlers/cash_journal/fill_cash_journals");
const create_tax_documents_head = require("./handlers/tax_document/create_tax_document_head");
const create_tax_document_lines = require("./handlers/tax_document/create_tax_document_lines");
const create_company_handler = require("./handlers/company/create_company");
const create_user_handler = require("./handlers/user/create_user");
const user_verification_handler = require("./handlers/user/user_verification");
const send_welcome = require("./mails/handlers/welcome");

const app = express();

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

app.post("/check-user-validity", user_verification_handler);

/**
 * Users routes to store their data in dashboard database
 */
app.post(
  "/fill-cash-journals",
  user_verification_middleware,
  fill_cash_journals_handler
);
app.post(
  "/fill-tax-documents-head",
  user_verification_middleware,
  create_tax_documents_head
);
app.post(
  "/fill-tax-document-lines",
  user_verification_middleware,
  create_tax_document_lines
);

/**
 * Technician routes to create users and companies
 */
app.post("/create-company", create_company_handler);
app.post("/create-user", create_user_handler);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
