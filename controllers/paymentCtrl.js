const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      console.log(user);
      if (!user)
        return res.status(400).json({ msg: "Foydalanuvchi mavjud emas!" });

      const { cart, paymentID } = req.body;
      const { _id, name, email } = user;

      const newPayment = await Payments({
        user_id: _id,
        name: name,
        email: email,
        paymentID: _id + "0301",
        cart: cart,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantitym, item.sold);
      });

      await newPayment.save();
      res.json({ newPayment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = paymentCtrl;
