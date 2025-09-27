import styled from "styled-components";
import ProductItem from "./ProductItem";

export default function CategoryProduct({ category, product }) {
    return (
        <Container>
            <h2>{category}상품 페이지 입니다.</h2>
            <ProductItem products={product} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30x 0;
`