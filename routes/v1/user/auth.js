// routes/auth.js
const express = require("express");
const passport = require("passport");
const Session = require("../../../models/Session");
const { REACT_APP_FRONTEND_URL, SECRET_KEY } = require("../../../config");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { google } = require('googleapis');
const calendar = google.calendar('v3');

// Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${REACT_APP_FRONTEND_URL}/login`,
  }),
  function (req, res) {
    res.redirect(`${REACT_APP_FRONTEND_URL}`);
  }
);

router.get('/calendar/events', (req, res) => {
  if (!req.isAuthenticated()) {
      return res.redirect('/auth/google');
  }

  const oauth2Client = new google.auth.OAuth2();
  console.log("req.user.accessToken",req.user.accessToken)
  oauth2Client.setCredentials({
      access_token: req.user.accessToken
  });

  calendar.events.list({
      calendarId: 'primary',
      auth: oauth2Client,
  }, (err, result) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(result.data.items);
  });
});

router.get("/status", (req, res) => {
  const signedCookie = req.cookies['connect.sid'];
  // console.log("req.cookies",req.cookies['connect.sid']);
  console.log('signed Session ID:', signedCookie);
  const unsignedCookie = cookieParser.signedCookie(signedCookie, SECRET_KEY);

// Output the unsigned cookie (session ID)
console.log('Unsigned Session ID:', unsignedCookie);
if (signedCookie && unsignedCookie && req.isAuthenticated()) {
  return res.status(200).json({ success: true, data: req.user, cookies: signedCookie });
} else {
  // If the session or cookie has expired, destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ success: false, message: 'Failed to logout' });
    }
    
    // Clear the cookie to log the user out
    res.clearCookie('connect.sid');
    return res.status(200).json({ success: false, data: null, message: 'Session expired' });
  });
}
});


// Logout
router.get("/logout", async (req, res, next) => {
  try {
    // Get the current session ID
    const sessionId = req.sessionID;

    // Delete the session from the MongoDB collection using the sessionId field
    await Session.findOneAndDelete({ sessionId });

    // Destroy the session in the session store
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      // Clear the cookie
      res.clearCookie("connect.sid", { path: "/" });

      // Send a response back to the client
      res.status(200).json({ success: true, message: "Logout successful" });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
