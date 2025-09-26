const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/connectionRequest");
const nodemailer = require("nodemailer");

cron.schedule("0 8 * * *", () => {
  try {
    const yesterday = subDays(new Date(), -1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequest = ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "21.574hadifa@gmail.com",
        pass: process.env.AUTH_PASS,
      },
    });

    const listOfEmails = [
      ...new Set(pendingRequest.map((req) => req.toUserId.emailId)),
    ];
    for (const email of listOfEmails) {
      try {
        let mailDetails = {
          from: "21.574hadifa@gmail.com",
          to: email,
          subject: "New Friend Requests",
          text: "Hey.There are friend request pending do check it out",
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("Error Occurs");
          } else {
            console.log("Email sent successfully");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
