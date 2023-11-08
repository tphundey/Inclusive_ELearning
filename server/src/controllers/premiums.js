import Premium, { find, findById } from "../models/premiums";
import { pagingnation } from "./Pagingnation";

export const addPremiumOption = (req, res) => {
  const {
    premiumname,
    priceOriginal,
    priceDiscount,

    benefit,
    rules,
    description,
    durationByMonth,
    status,
    meta_data,
  } = req.body;
  try {
    const premium = new Premium({
      premiumname: premiumname,
      priceOriginal: priceOriginal,
      priceDiscount: priceDiscount,
      benefit: benefit || "Benefit is coming",
      rules: rules || "No Rules",
      durationByMonth,
      description: description || "No Description",
      meta_data: meta_data || "", //to side data
    });
    // return save result as a response
    premium
      .save()
      .then((result) =>
        res.status(201).send({ result, msg: "Add Premium Option Successfully" })
      )
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ error: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export async function getPremiums(req, res) {
  try {
    const premium = await find();
    res.send(premium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updatePremium(req, res) {
  const fieldsToUpdate = [
    "premiumname",
    "priceOriginal",
    "priceDiscount",
    "benefit",
    "rules",
    "roles",
    "durationByMonth",
    "description",
    "status",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.premium[field] = req.body[field];
    }
  }
  try {
    const updatePremium = await res.premium.save();
    res.json(updatePremium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getPremiumById(req, res, next) {
  let premium;
  try {
    premium = await findById(req.body._id);
    if (premium === null) {
      return res.status(404).json({ message: "Cannot Find Premium" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.premium = premium;
  next();
}
