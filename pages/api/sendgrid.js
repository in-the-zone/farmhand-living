import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: ["max@farmhandliving.com", req.body.email], // Your email where you'll receive emails
      from: {
        name: 'Farmhand Living Support',
        email: "support@farmhandliving.com" // your website email address here
      },
      subject: 'New Farmhand Living Work Ticket',
      html: `
              <div> Your submission to Farmhand Living was recieved. Thank you! <div> <br>
              <div> Player Name : ${req.body.name} </div> <br>
              <div> Phone : ${req.body.phone} </div> <br>
              <div> Email : ${req.body.email} </div> <br>
              <div> Message : ${req.body.message} </div> <br>
            `,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;