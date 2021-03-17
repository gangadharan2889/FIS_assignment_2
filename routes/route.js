const express = require('express');
const router = express.Router();
var func = require('../functions');

router.get('/lastPaymentMethod', (req, res, next) => {
    res.send('Need to send the last calculated value');
})

router.post('/equalPaymentMethod', (req, res, next) => {
    console.log(req.body);
    const equalPaymentMethod = {
        loan_amount: req.body.loan_amount,
        loan_period: req.body.loan_period,
        annual_interest_rate: req.body.annual_interest_rate
    };
    var x;
    var y = 0;
    var paymentsForNthMonth = [];
    for (var j = 1; j <= equalPaymentMethod.loan_period; j++) {
        var ab = {};
        if (j < equalPaymentMethod.loan_period) {
            ab.payment_amount = func.PaymentAmount(equalPaymentMethod.loan_amount, equalPaymentMethod.annual_interest_rate, equalPaymentMethod.loan_period);
            ab.principal_amount_paid = func.PrincipalAmount(ab.payment_amount, equalPaymentMethod.annual_interest_rate, equalPaymentMethod.loan_period, j);
            ab.interest_amount_paid = func.InterestAmount(ab.payment_amount, ab.principal_amount_paid);
            ab.loan_outstanding_balance = func.OutstandingBalanceAmount(ab.interest_amount_paid, equalPaymentMethod.annual_interest_rate, ab.principal_amount_paid);
            if(j==equalPaymentMethod.loan_period-1){
                
                x=func.OutstandingBalanceAmount(ab.interest_amount_paid, equalPaymentMethod.annual_interest_rate, ab.principal_amount_paid);
            }
            paymentsForNthMonth.push(ab);
        }
        else {
            ab.payment_amount = func.PaymentAmount(equalPaymentMethod.loan_amount, equalPaymentMethod.annual_interest_rate, equalPaymentMethod.loan_period);
            ab.principal_amount_paid = x;
            console.log(x)
            ab.interest_amount_paid = func.InterestAmount(ab.payment_amount, ab.principal_amount_paid);
            ab.loan_outstanding_balance = y;
            paymentsForNthMonth.push(ab);
        }

    }
    console.log(paymentsForNthMonth);
    res.json({ paymentsForNthMonth });


});

// var x, y, i, o;
// var paymentsForNthMonth = new Array();
// // x = func.PaymentAmount(this.loan_amount, this.annual_interest_rate, this.loan_period);
// // y = func.PrincipalAmount(x, this.annual_interest_rate, this.loan_period, 1);
// // i = func.InterestAmount(x, y);
// // o = func.OutstandingBalanceAmount(i, this.annual_interest_rate, y);
// for (var j = 1; j <= this.loan_period; j++) {
//     // x[j] = func.PaymentAmount(this.loan_amount, this.annual_interest_rate, this.loan_period);
//     // y[j] = func.PrincipalAmount(x, this.annual_interest_rate, this.loan_period, j);
//     // i[j] = func.InterestAmount(x, y);
//     // o[j] = func.OutstandingBalanceAmount(i, this.annual_interest_rate, y);
//     var ab = {};
//     ab.payment_amount = func.PaymentAmount(this.loan_amount, this.annual_interest_rate, this.loan_period);
//     ab.principal_amount_paid = func.PrincipalAmount(x, this.annual_interest_rate, this.loan_period, j);
//     ab.interest_amount_paid = func.InterestAmount(x, y);
//     ab.loan_outstanding_balance = func.OutstandingBalanceAmount(i, this.annual_interest_rate, y);
//     // var ab = {
//     //     payment_amount:x[j],
//     //     principal_amount_paid:y[j],
//     //     interest_amount_paid:i[j],
//     //     loan_outstanding_balance:o[j]
//     // }
//     paymentsForNthMonth.push(ab);

// }
// console.log(paymentsForNthMonth);

module.exports = router;