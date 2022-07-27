
const PersonSchema = ({
    firstName: {
        type: String,
        //required: true
    },
    lastName: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        //required: true
        //change email to be username
    },
    birthday: {
        type: Date,
        //required: true
    }
})
module.exports = PersonSchema