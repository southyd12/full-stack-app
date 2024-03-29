import Stripe from "stripe";
import sgMail from "@sendgrid/mail";
import { getSession } from "@auth0/nextjs-auth0";

import {
  empty,
  getUserBasketQuery,
} from "@/lib/api-functions/server/baskets/queries";

import { add } from "@/lib/api-functions/server/orders/queries";

const { STRIPE_SECRET_KEY, ADMIN_EMAIL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const stripe = new Stripe(STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Wrong Method. Only POST allowed" });
  }

  const { name, email, token, amount } = req.body;

  let rejectionMessage = "";
  // validate the form
  if (!name) {
    rejectionMessage = "Name not provided";
  } else if (!email) {
    rejectionMessage =
      "Maintainer Issue: Email not provided. Please contact us directly";
  } else if (!token) {
    rejectionMessage =
      "Maintainer Issue: Token not provided. Please contact us directly";
  } else if (!amount) {
    rejectionMessage =
      "Maintainer Issue: Amount not provided. Please contact us directly";
  }

  if (rejectionMessage) {
    return res.status(400).json({
      message: rejectionMessage,
    });
  }

  let charge = {};

  try {
    const customer = await stripe.customers.create({
      source: token,
      email,
    });
    console.log("customer", customer);
    console.log("amount", amount);
    charge = await stripe.charges.create({
      amount,
      currency: "GBP",
      customer: customer.id,
    });
    console.log(charge);
  } catch (err) {
    console.log("err doing stripe", err);
    return res.status(500).json({
      message: "Internal Server Error: " + err,
    });
  }

  try {
    const session = await getSession(req, res);
    req.user = session.user;
  } catch (err) {
    console.log(`Couldn't get user`, err);
  }
  let basket = { items: [] };
  try {
    basket = await getUserBasketQuery(req.user.sub);
    for (const item of basket.items) {
      item.quantity -= 1;
      await item.save();
    }
  } catch (err) {
    console.log(`Couldn't decrement items`, err);
  }

  try {
    add({
      owner: req.user.sub,
      items: basket.items,
      receiptURL: charge.receipt_url,
    });
  } catch (err) {
    console.log(`Couldn't save order`, err);
  }

  try {
    await empty(req.user.sub);
  } catch (err) {
    console.log(`Couldn't empty basket`, err);
  }

  const msg = {
    to: email,
    from: ADMIN_EMAIL,
    cc: ADMIN_EMAIL,
    replyTo: ADMIN_EMAIL,
    subject: `Order confirmation`,
    text: `Thank you ${name} for your order!\n\nYou can see a receipt here: ${charge.receipt_url}`,
    html: `<p>Thank you ${name} for your order!</p><p>You can see a receipt <a href="${charge.receipt_url}" target="_blank">here</a></p>`,
  };

  try {
    // console.log('sgsend', sgMail.send)
    sgMail.send(msg);
    console.log("confirmation email sent!");
    return res.status(200).json({
      message: "Purchase successfull!",
      receiptURL: charge.receipt_url,
    });
  } catch (err) {
    console.log("confirmation email send error", err);

    return res.status(500).json({
      message: "Internal Server Error: " + err,
    });
  }
};

export default handler;