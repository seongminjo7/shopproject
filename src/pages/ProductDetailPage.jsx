import { useState } from "react";
import { useLocation } from "react-router-dom"
import styled from "styled-components";
import useCart from "../context/useCart";

export default function ProductDetailPage() {

    const { addItemCart } = useCart()

    const state = useLocation().state; // useLocation = 여러가지 정보를 가져올 때 / Params = 한가지나 단순한 id값 같은 것만 받아올 때
    // console.log(state)

    const { id, image, title, price, option, category, colors, description } = state

    const setOpt = option.split(',').map(opt => opt.trim())
    const [selected, setSelected] = useState(setOpt && setOpt[0]);
    const [success, setSuccess] = useState(); // 장바구니 아이템 전송 여부

    const selectOpt = (e) => {
        setSelected(e.target.value)
        console.log(selected)
    }

    const addCart = () => {
        const product = { id, image, title, price, option: selected, quantity: 1 }
        addItemCart.mutate(product, {
            onSuccess: () => {
                setSuccess('장바구니에 상품이 추가되었습니다.')
            }
        })
    }

    return (
        <Container>
            <div className="detailInner">
                <div className="detailImg">
                    <img src={image} alt={title} />
                </div>{/* detailImg */}
                <div className="detailText">
                    <h3>{title}</h3>
                    <p className="price">가격 <span>{price}원</span></p>
                    <p className="description">{description}</p>

                    <div className="detailOpt">
                        {/* 리액트에서는 lable에 for 대신 htmlFor로 변경하여 사용 ( for문은 반복문으로 인식 ) */}
                        <label className="lableText" htmlFor="optSelect">옵션</label>
                        <select id="optSelect" onChange={selectOpt} value={selected}>
                            {setOpt && setOpt.map((opt, idx) => (
                                <option key={idx} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>{/* detailOpt */}
                    <div className="detailBtns">
                        <button className="cartBtn" onClick={addCart}>장바구니 담기</button>
                        <button className="buyBtn">구매하기</button>
                    </div>{/* detailBtns */}
                </div>{/* detailText */}

            </div>{/* detailInner */}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0;

    .detailInner{
        display: flex;
        gap: 40px;
        width: 100%;

        .detailImg{
            min-width: 400px;
            max-width: 600px;

            img{
                width: 100%;
                display: block;
            }
        }

        .detailText{
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;

            h3{
                font-size: 24px;
                width: 100%;
                font-weight: normal;
                border-bottom: solid 1px rgba(0,0,0,.1);
                padding-bottom: 20px;
            }

            .price{
                display: flex;
                align-items: center;
                gap: 30px;
            }
        }

        .detailBtns{
            display: flex;
            flex-direction: column;
            gap: 24px;
            align-items: flex-start;

            button{
                padding: 12px 0;
                width: 100%;
                border: solid 1px rgba(0,0,0,.1);
                border-radius: 10px;

                &.cartBtn{
                    background: lightsalmon;
                }

                &.buyBtn{
                    background: lightpink;
                }
            }
        }
    }
`