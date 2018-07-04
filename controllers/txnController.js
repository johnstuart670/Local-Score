const db = require("../models");


// Defining methods for the booksController
module.exports = {
	findAll: function (req, res) {
		db.Transaction
			.find({})
			.sort({ Date: -1 })
			.then(dbModel => res.send(dbModel))
			.catch(err => res.status(422).json(err));
	},
	// find all the transactions associated with the transaction
	findHistory: function (req, res) {
		db.Product
			.findById(req.params.id)
			.populate('TxnHistory')
			// if the result doesn't have any PreviousTxns in the key then we know that the transaction is an origination and we can just send it
			.then(productResults => {
				res.json(productResults)
			})
			.catch(err => res.status(422).json(err));
	},

	checkTxnStatus: function(req, res, next) {
		// first check the transaction to see if it has been rejected or not.  proceed after
		db.Transaction.findById(req.params._id)
		.then( txnCheck => {
			if (!txnCheck.Rejected || !txnCheck.Completed){
				//do the things
				this.next(req, res)
			} else {
				// else don't do the things
				return res.send("FAILURE");
			}
		})
		.catch(err => res.status(422).json(err))
	},
	rejectTxn: function (req, res) {
		db.Transaction
			.findByIdAndUpdate(
				{ _id: TransactionID }, 
				{"$set" : { "Rejected": true, "Completed": true}},
			(err, response) => err ? res.json(err) : res.json(response)
			)
			.catch(err => res.status(422).json(err))
	},

	approveTxn: function(req, res) {
		db.Transaction
			.findByIdAndUpdate(
				{ _id: req.params.id }, 
				{"$set" : { "Completed": true, "Party2Approved" : true}},
			(err, response) => err ? res.json(err) : res.json(response)
			)
			.catch(err => res.status(422).json(err))
	},

//end reject txn
	newProduct: function (req, res) {
		// create a new product using the JSON built from the state
		db.Product.create(req.body)
		// take the information from the new product we just posted 
			.then(newProduct => {
				//destructure
				const { _id, CreatedBy, TxnHistory } = newProduct;
				//build new object
				const txnInfo = {
					Party1: CreatedBy,
					Party2: CreatedBy,
					Party2Approved: true,
					ProductID: _id,
					Completed: true
				};
				//make a new transaction (because posting an object means that you are having a transaction)
				db.Transaction
					.create(txnInfo)
					// take the new txn information
					.then(newTxnInfo => {
					// update the Product that we built by pushing into the TxnHistory
						db.Product
						.updateOne({_id: _id}, {"$push" : {"TxnHistory": newTxnInfo._id}}, (err, result) => {
							//end the function
							err ? res.json(err) : res.json("SUCCESS")
						} )
					})
			})
	},
	newTxn: function(req, res) {
		// make a new transaction
		db.Transaction.create(req.body)
		// take the new info 
		.then(newTxn => {
			// query the product database and update the TxnHistory Array to include the newTxn
			db.Product.findByIdAndUpdate(req.body.ProductID, {"$push" : {"TxnHistory" : newTxn._id }}, (err, result) => err ? res.json(err) : res.json("SUCCESS") 
		)
		})}

};
