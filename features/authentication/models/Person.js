const PersonSchema = {
  firstName: {
    type: String,
    //required: true
  },
  lastName: {
    type: String,
    //required: true
  },

  birthday: {
    type: Date,
    //required: true
  },
  email: {
    type: String,
    //     //required: true
    //     //change email to be username
  },
  phone: {
    type: String,
  },
};
module.exports = PersonSchema;
