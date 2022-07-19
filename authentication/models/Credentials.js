
const CredentialsSchema = ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = CredentialsSchema