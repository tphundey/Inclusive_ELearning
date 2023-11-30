import GoogleAccount from "../models/googleAccount";

export const getAllAccount = async (req, res) => {
    try {
      const googleAccount = await GoogleAccount.find()
      if (!googleAccount) {
        return res.status(400).json({
          message: err.message,
        });
      }
      console.log(googleAccount);
      return res.status(200).json(googleAccount);
    } catch (error) {
      return res.status(500).json({
        message: "loi cmnr",
      });
    }
  };
  
  export const getAccountById = async (req, res) => {
    try {
      const googleAccount = await GoogleAccount.findById(req.params.id);
  
      if (!googleAccount || googleAccount.length == 0) {
        return res.status(404).json();
      }
      res.status(200).json(googleAccount);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };