import axios from 'axios';
const apiUrl = "https://localhost:5102";

const authService = {
    async authenticate(data) {
        const endpoint = `${apiUrl}/api/get-login-verify?email=${data.userName}&password=${data.password}`
        return axios.get(endpoint);
    },

    setLoggedUser(data) {
        let parsedData = JSON.stringify(data)
        localStorage.setItem("user", parsedData)
    },
    
    getLoggedUser() {
        let data = localStorage.getItem("user");
        if (!data) return null;
        try {
            let parsedData = JSON.parse(data)
            return parsedData
        } catch (error) {
            console.log(error)
            return null
        }
    },

    cleanLoggedUser() {
        localStorage.clear();
    }
}

export default authService;