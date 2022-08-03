
const CredentialsSchema = ({
    username: { //change to email!!!
        type: String,
        required: true
        //email instead 
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = CredentialsSchema