exports.PaymentAmount = function calculatePaymentAmount(a, r, n) {
    
    var rate = parseFloat((r / 1200).toFixed(7))
    var sub = (1+rate)**n
    var paymentAmt = parseFloat((rate*a*((1+rate)**n)/(((1+rate)**n)-1)).toFixed(2))
console.log(paymentAmt)
    return paymentAmt;
};

exports.PrincipalAmount = function calculatePrincipalAmount(A, r, N, n) {
    var rate = parseFloat((r / 1200).toFixed(7))
    var principalAmt = parseFloat((A*((1+rate)**((-1)*(1+N-n)))).toFixed(2))
    return principalAmt;
};

exports.InterestAmount = function calculateInterestAmount(paymentAmt, principalAmt) {

    var interestAmt = parseFloat((paymentAmt - principalAmt).toFixed(2))
    return interestAmt;
}

exports.OutstandingBalanceAmount = function calculateOutstandingBalanceAmount(interestAmt, r, principalAmt) {
    var rate = parseFloat((r / 1200).toFixed(7))
    var outstandingBalAmt = parseFloat(((interestAmt/(rate))-principalAmt).toFixed(2))
    return outstandingBalAmt;
}