import useCart from "../context/useCart"

export default function CartItem({ products, index }) {

    const { addItemCart, removeCart } = useCart();

    console.log(products)
    console.log(index)

    const plusItem = () => {
        addItemCart.mutate({ ...products, quantity: products.quantity + 1 })
    }

    const minusItem = () => {
        if (products.quantity < 2) {
            alert('상품 갯수는 1보다 작을 수 없습니다.');
            return
        }
        addItemCart.mutate({ ...products, quantity: products.quantity - 1 })
    }

    const itemDelete = () => {
        removeCart.mutate(products.id)
    }

    return (
        <li>
            <p>{index}</p>
            <img src={products.image} alt={products.title} />
            <p>{products.title}</p>
            <p>{products.option}</p>
            <p>{products.price}</p>
            <div>
                <p>{products.quantity}</p>
                <button type="button" onClick={plusItem}>+</button>
                <button type="button" onClick={minusItem}>-</button>
            </div>
            <button type="button" onClick={itemDelete}>삭제</button>
        </li>
    )
}