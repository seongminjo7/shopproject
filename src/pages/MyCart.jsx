import styled from "styled-components";
import useCart from "../context/useCart"
import CartItem from "../components/CartItem";

export default function MyCart() {

    const { cartInfo: { data: products } } = useCart()

    const isItem = products && products.length > 0;

    console.log(products)

    return (
        <Container>
            <h2>장바구니 리스트</h2>
            {!isItem && <p>장바구니에 상품이 없습니다.</p>}

            {isItem && (
                <ul className="cartList">
                    {products && products.map((el, idx) => (
                        <CartItem key={el.id} products={el} index={idx + 1} />
                    ))}
                </ul>
            )}
        </Container>
    )
}

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 30px 0;
`