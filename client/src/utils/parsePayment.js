const parsePayment = (payment) => {
  if (payment) {
    let regex = /(?<=\: )\w+ *\w*/g;
    let found = payment.match(regex);
    if (found && found[0].length <= 3) {
      regex = /(?<=\: )\w+ *\w*, \w*/g;
      found = payment.match(regex)[0];
      return found;
    } else if (found) {
      return found;
    } else {
      return payment;
    }
  } else {
    return "none";
  }
};
export default parsePayment;
