const { admin } = require('../firebase');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(user.uid);
    res.status(200).send({ token: customToken });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  loginUser,
};
