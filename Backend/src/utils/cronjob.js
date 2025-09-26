const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/connectionRequest");
const sendEmail = require("../utils/sendEmail");

cron.schedule("0 8 * * *", async () => {
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

    const listOfEmails = [
      ...new Set(pendingRequest.map((req) => req.toUserId.emailId)),
    ];
    for (const email of listOfEmails) {
      try {
        const sent = await sendEmail(
          email,
          "Pending Friend Request",
          "Login to check your pending Friend Request from yesterday"
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
