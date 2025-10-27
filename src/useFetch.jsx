import { useEffect,useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const modifiedData = data.map(prod => (
                {...prod, imageUrl : `pet-store-frontend-9hw89a57k-abhisheks-projects-74383ef5.vercel.app${prod.imageUrl}`}
            ))
            setData(modifiedData);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false)
        })
    },[url])

    return {data, loading, error}  
}

export default useFetch;