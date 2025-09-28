import { useEffect, useState } from "react";
import { getProduct } from "../api/firebase";
import ProductItem from "./ProductItem";
import styled from "styled-components";

export default function AllProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProduct()
                setProducts(products)
                // console.log(products)
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts()
    }, [])

    return (
        <Container>
            <ProductItem products={products} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
`

