import { useParams } from "react-router-dom";
import CategoryProduct from "../components/CategoryProduct";
import { useEffect, useState } from "react";
import { getCategoryProduct } from "../api/firebase";
// import {category} from 

export default function CategoryPage() {
    const { category } = useParams()

    const [product, setProduct] = useState([])
    useEffect(() => {
        getCategoryProduct(category).then(item => {
            setProduct(item)
        })
            .catch(error => {
                console.error(error)
            })
    }, [category])

    return (
        <>
            <h2>{category} 페이지 입니다.</h2>
            <CategoryProduct category={category} product={product} />
        </>
    )
}