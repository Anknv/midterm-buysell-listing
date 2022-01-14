const getUserFromSession = (session) => {
  if(session["user_id"]) {
    return {
      user_id : session["user_id"],
      user_email : session["user_email"],
      user_name : session["user_name"]
   }
  }
};
exports.getUserFromSession = getUserFromSession;
