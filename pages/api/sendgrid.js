import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: ["mitch@inthezone.dev", 'support@farmhandliving.com', 'max@farmhandliving.com'], // Your email where you'll receive emails
      from: "mitch@inthezone.dev", // your website email address here
      subject: 'New Farmhand Living Submission',
      html: `
              <div> affiliate : ${req.body.affiliate} </div>
              <div> address : ${req.body.address} </div>
              <div> issue : ${req.body.issue} </div>
              <div> player name : ${req.body.name} </div>
              <div> phone : ${req.body.phone} </div>
              <div> email : ${req.body.email} </div>
              <div> message : ${req.body.message} </div>
            `,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;