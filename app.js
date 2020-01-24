require("dotenv").config();
const express = require("express");
const app = express();

const {
  fill_cash_journals_handler
} = require("./handlers/cash_journal/fill_cash_journals");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/fill-cash-journals", fill_cash_journals_handler);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
