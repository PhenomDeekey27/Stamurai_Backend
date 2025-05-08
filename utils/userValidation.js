export const userDataValidation = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
     
  
      if (typeof name !== "string") return reject("name is not a text");
      if (typeof email !== "string") return reject("email is not a text");
    
      if (typeof password !== "string") return reject("password is not a text");
  
      if (name.length < 3 || name.length > 50)
        return reject("Username length should be 3-50");
  
    
      resolve();
    });
  };
  
