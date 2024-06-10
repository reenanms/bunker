import axios from 'axios';

const authService = {
    async authenticate(data) {
        console.log("process.env:", process.env)
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const endpoint = `${apiUrl}/auth`
        return axios.post(endpoint, data);
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