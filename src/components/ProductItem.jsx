import styled from "styled-components"
import ProductDeatil from "./ProductDetail"

export default function ProductItem({ products }) {
    // console.log(products)
    return (
        <ProductList>
            {products && products.map(el => (
                <li key={el.id}>
                    <ProductDeatil product={el} />
                </li>
            ))}
        </ProductList>
    )
}

const ProductList = styled.ul`
    display: flex;
    gap: 20px 5%;
    flex-wrap: wrap;

    li{
        flex-basis: 30%;
        flex-shrink: 0; // 줄어들지 못하게 막기
    }
`