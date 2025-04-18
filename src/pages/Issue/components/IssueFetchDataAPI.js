import axios from "axios";
import {useAuth} from "../../../components/Api/Auth/AuthProvider";

const IssueFetchDataAPI = () => {
    const {accessToken} = useAuth();

    const fetchData = async () => {
        try {
            return await axios.get(process.env.REACT_APP_API_URL_ISSUE, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }, withCredentials: true
            })
        } catch (err) {
            console.error("데이터 불러오기 실패:", err);
        }
    }
    return {fetchData}
}
export default IssueFetchDataAPI;