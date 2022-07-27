
const CredentialsSchema = ({
    username: {
        type: String,
        required: true
        //email insted 
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = CredentialsSchema