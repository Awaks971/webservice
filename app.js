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
const fill_payment_journals_handler = require("./handlers/payment_journal/fill_payment_journals");
const create_receipt_head = require("./handlers/receipt/create_receipt_head");
const create_receipt_lines = require("./handlers/receipt/create_receipt_lines");
const create_company_handler = require("./handlers/company/create_company");
const create_store_handler = require("./handlers/store/create_store_handler");
const user_verification_handler = require("./handlers/user/user_verification");
const valid_user_handler = require("./handlers/user/valid-user");
const lock_account_handler = require("./handlers/user/lock_user_account");
const create_articles_handler = require("./handlers/article/create_article_handler");
const create_families_handler = require("./handlers/family/create_families_handler");
const create_sellers_handler = require("./handlers/seller/create_seller_handler");
const create_supliers_handler = require("./handlers/suplier/create_supliers_handler.js");
const login_hanlder = require("./handlers/user/login");

const app = express();

/**
 * Some security
 */
app.disable("x-powered-by");
app.use(helmet());
// app.use(limiter);

/**
 * Use express.json() to read JSON
 * And to read data in POST request in req.body
 */
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);

/**
 * Set view engine on Pug
 * Set the views directory on ./mails/templates
 * It is only use for sending email
 */
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/mails/templates"));

app.post("/webservice/check-company-validity", user_verification_handler);
app.post(
  "/webservice/valid-user",
  user_verification_middleware,
  valid_user_handler
);
app.post("/webservice/login", login_hanlder);

/**
 * Users routes to store their data in dashboard database
 */
app.post(
  "/webservice/fill-cash-journals",
  user_verification_middleware,
  fill_cash_journals_handler
);
app.post(
  "/webservice/fill-receipt-head",
  user_verification_middleware,
  create_receipt_head
);
app.post(
  "/webservice/fill-receipt-lines",
  user_verification_middleware,
  create_receipt_lines
);
app.post(
  "/webservice/fill-payment-journals",
  user_verification_middleware,
  fill_payment_journals_handler
);
app.post(
  "/webservice/fill-articles",
  user_verification_middleware,
  create_articles_handler
);
app.post(
  "/webservice/fill-families",
  user_verification_middleware,
  create_families_handler
);
app.post(
  "/webservice/fill-sellers",
  user_verification_middleware,
  create_sellers_handler
);

app.post(
  "/webservice/fill-supliers",
  user_verification_middleware,
  create_supliers_handler
);

app.post("/webservice/lock-user-account", lock_account_handler);

/**
 * Technician routes to create stores and companies
 */
app.post("/webservice/create-company", create_company_handler);
app.post("/webservice/create-store", create_store_handler);

app.listen(4200, function() {
  console.log("App listening on port 4200!");
});
