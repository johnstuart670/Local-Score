const router = require("express").Router();
const txnController = require ("../../controllers/txnController.js");
const app = require("express");

// Matches with "/api/transactions/All
router.route("/All")
  .get(
		txnController.findAll);

// match for the individual transaction routes being passed as /api/transactions/:id
router.route("/:id")
	.get(txnController.findHistory);

router.route("/new_product")
.post(txnController.newProduct);

router.route("/new_transaction")
		.post(txnController.newTxn);

router.route("/rejectTxn/:id")
		.put(txnController.checkTxnStatus(req, res, rejectTxn));

router.route("/approveTxn/:id")
		.put(txnController.checkTxnStatus(req, res, approveTxn));



module.exports = router;
