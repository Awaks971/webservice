const DB = require("../../config/database");

async function fill_cash_journals_handler(req, res) {
  const { payload: cash_journals } = req.body;
  const {
    uuid_journal_caisse,
    TOTttc,
    TOTht,
    stat_nb_ticket,
    stat_panier_moy,
    stat_nb_annul,
    stat_nb_remise,
    stat_nb_art_promo,
    stat_nb_retour,
    stat_temps_travail,
    stat_pmarge,
    stat_mnt_marge,
    stat_nb_article,
    dateJournal,
    lastUpdate,
    uuid_magasin
  } = cash_journals;
  const createdCashJournals = await DB.queryAsync(`
      INSERT INTO journal_caisse 
          (
              uuid_journal_caisse,
              CA_TTC,
              CA_HT,
              stat_nb_ticket,
              stat_panier_moy,
              stat_nb_annul,
              stat_nb_remise,
              stat_nb_art_promo,
              stat_nb_retour,
              stat_temps_travail,
              stat_pmarge,
              stat_mnt_marge,
              stat_nb_article,
              dateJournal,
              lastUpdate,
              companyId
          ) 
      VALUES 
          (
              "${uuid_journal_caisse}",
              "${TOTttc}",
              "${TOTht}",
              "${stat_nb_ticket}",
              "${stat_panier_moy}",
              "${stat_nb_annul}",
              "${stat_nb_remise}",
              "${stat_nb_art_promo}",
              "${stat_nb_retour}",
              "${stat_temps_travail}",
              "${stat_pmarge}",
              "${stat_mnt_marge}",
              "${stat_nb_article}",
              "${dateJournal}",
              "${lastUpdate}",
              "${uuid_magasin}"
          )
    `);

  res.json({ createdCashJournals });
}

module.exports = fill_cash_journals_handler;
