require("dotenv").config();

/**
 * Modules
 */
import express, { json, urlencoded } from "express";
import { join } from "path";
import helmet from "helmet";
import limiter from "./middlewares/limiter";
import {
  technician_verification_middleware,
  user_verification_middleware
} from "./middlewares/auth_verification";

/**
 * Handlers
 */
import fill_cash_journals_handler from "./handlers/cash_journal/fill_cash_journals";
import create_tax_documents_head from "./handlers/tax_document/create_tax_document_head";
import create_tax_document_lines from "./handlers/tax_document/create_tax_document_lines";
import create_company_handler from "./handlers/company/create_company";
import create_user_handler from "./handlers/user/create_user";
import user_verification_handler from "./handlers/user/user_verification";
import send_welcome from "./mails/handlers/welcome";

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
app.use(json());
app.use(urlencoded({ extended: true }));

/**
 * Set view engine on Pug
 * Set the views directory on ./mails/templates
 * It is only use for sending email
 */
app.set("view engine", "pug");
app.set("views", join(__dirname, "/mails/templates"));

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
