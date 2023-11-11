const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../../models/User");

// @desc    Create stripe checkout session
// @route   POST /api/stripe/checkout-session
// @access  Private
const createCheckoutSession = async (req, res) => {
  const { tier } = req.params;
  const { id } = req.query;
  if (!tier) {
    return res.status(400).json({ msg: "Please select a payment tier" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price:
          tier === "User"
            ? "price_1MYsEBIkzhBkf9zaZ0YvFIaH"
            : "price_1MZWerIkzhBkf9zaHbc0qq2q",
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=${tier}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  const user = await User.findById(id);
  user.verificationToken = session.id;
  await user.save();
  res.redirect(303, session.url);
};

//@desc fetch verificationToken
//@route GET /stripe/fetch
//@access Private
const getVerificationToken = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ verificationToken: user.verificationToken });
};
module.exports = {
  createCheckoutSession,
  getVerificationToken,
};
