import { setAllBooks } from '../redux/bookSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllBooks = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.book);
    useEffect(()=>{
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/book/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllBooks(res.data.books));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks();
    },[])
}

export default useGetAllBooks