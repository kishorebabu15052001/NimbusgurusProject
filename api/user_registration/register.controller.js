const {
    create
  } = require("./register.service");


module.exports={
    createUser: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        });
    },
    login: (req, res) => {
      

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sampleproject36@gmail.com',
              pass: process.env.epass
        }
      });

        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {

          console.log(body.email);
          if (err) {
            console.log(err);
          }
          console.log(results);
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            var mailOptions = {
              from: 'sampleproject36@gmail.com',
              to: body.email,
            subject: 'Sending Email using nodemailer',
            text: 'HELLO '+body.email+' LOGGED IN SUCCESSFULLY!'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

            results.password = undefined;
            const jsontoken = sign({ result: results },process.env.JWT, {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "logged in successfully!!!!",
              token: jsontoken
            });
          } else {
            return res.json({
              success: 0,
              data: "Invalid email id  or password"
            });
          }
        });
      },

      profile: (req, res) => {
      

          const params = req.params;
          getUserByUserEmail(params.email, (err, results) => {
  
            console.log(params.email);
            if (err) {
              console.log(err);
            }
            console.log(results);
            if (!results) {
              return res.json({
                success: 0,
                data: "Invalid email id  or password"
              });
            }
            
              results.password = undefined;
              const jsontoken = sign({ result: results },process.env.JWT, {
                expiresIn: "4h"
              });
              return res.json({
                success: 1,
                message: "Your profile is displayed successfully!!!!!",
                token: jsontoken
              });
            
          });
        }
}