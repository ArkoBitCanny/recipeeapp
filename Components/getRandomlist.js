
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLists } from "../redux/Slice/listingSlice";

export const getRandomLists = async () => {
    const dispatch=useDispatch();
    let arr = [];
    const res = await Promise.all([
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    ])
    const data = res.map((response) => response.data);
    data.forEach((ele) => arr.push(ele.meals[0]));
    console.log(arr);
    dispatch(addLists(arr));
}