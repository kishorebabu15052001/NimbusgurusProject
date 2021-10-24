const pool=require("../../dbconnection/database");
module.exports={
    create: (data, callBack) => {
        pool.query(
          `insert into registration(firstName, lastName,email, mobileno, password,confirm, state, country) 
                    values(?,?,?,?,?,?,?,?)`,
          [
            data.first_name,
            data.last_name,
            data.email,
            data.mobileno,
            data.password,
            data.confirm,
            data.state,
            data.country
          ],
          (error, results, fields) => {
            

            
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        
        );
    }

};