const { validationResult } = require("express-validator");
const User = require("../models/User");
const Session = require("../models/Session");

exports.getLogin = async (req, res) => {
  if (req.cookies.sid) {
    const sid = req.cookies.sid;
    const session = await Session.findById(sid).populate("userId");
    if (session) {
      return res.redirect("/menu");
    }
  }
  res.render("register", { signup: false, error: [] });
};

exports.getSignup = async (req, res) => {
  if (req.cookies.sid) {
    const sid = req.cookies.sid;
    const session = await Session.findById(sid).populate("userId");
    if (session) {
      return res.redirect("/menu");
    }
  }
  res.render("register", { signup: true, error: [] });
};

exports.postSignup = async (req, res) => {
  const err = validationResult(req);
  // errors = _.uniqWith(errors, (a, b) => a.path !== b.path);
  // errors = errors.filter(
  //   (el, idx) =>
  //     idx ===
  //     errors.findIndex((err) => {
  //       err.path === el.path;
  //     })
  // );
  if (!err.isEmpty()) {
    // console.log(errors);
    return res.render("register", {
      signup: true,
      error: err.mapped(),
      // err1: [],
    });
    // const error = errors.map((e) => e.msg);
    // return res.render("register", { signup: true, error });
  }

  const { username, password, email } = req.body;
  let foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.render("register", {
      signup: true,
      error: [],
    });
  }
  foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.render("register", {
      signup: true,
      error: ["Email already exists"],
    });
  }
  const user = await User.create({ username, password, email });
  const session = await Session.create({ userId: user._id });

  res.cookie("sid", session._id).redirect("/menu");
};
exports.postLogin = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.render("register", { signup: false, error: err.mapped() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("register", {
      signup: false,
      error: ["Email does not exist"],
    });
  }
  if (user.password !== password) {
    return res.render("register", {
      signup: false,
      error: ["Email or password wrong"],
    });
  }

  const session = await Session.create({ userId: user._id });
  const options = req.body.remember
    ? { expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
    : {};
  res.cookie("sid", session._id, options).redirect("/menu");
};

exports.getMenu = async (req, res) => {
  if (!req.cookies.sid) {
    return res.redirect("/login");
  }
  const sid = req.cookies.sid;
  const session = await Session.findById(sid).populate("userId");
  if (!session.populated("userId")) {
    return res.redirect("/login");
  }
  res.render("menu", { username: session.userId.username });
};

exports.getLogout = async (req, res) => {
  if (!req.cookies.sid) {
    return res.redirect("/login");
  }
  const sid = req.cookies.sid;
  const session = await Session.findById(sid);
  if (!session) {
    return res.clearCookie("sid").redirect("/login");
  }
  await Session.findOneAndDelete({ _id: sid });
  res.clearCookie("sid").redirect("/login");
};

exports.getQuestions = async (req, res) => {
  if (!req.cookies.sid) {
    return res.redirect("/login");
  }
  const sid = req.cookies.sid;
  const session = await Session.findById(sid).populate("userId");
  if (!session.populated("userId")) {
    return res.redirect("/login");
  }
  res.render("questions");
};
