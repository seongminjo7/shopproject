import { useContext } from "react"
import { CategoryContext } from "../context/CategoryContext"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function MainMenu() {

    const { categoryList } = useContext(CategoryContext)

    return (
        <Navigation>
            <ul>
                {categoryList.map((el, idx) => (
                    <li key={idx}>
                        <Link to={`/products/${el}`}>{el}</Link>
                    </li>
                ))}
            </ul>
        </Navigation>
    )
}

const Navigation = styled.nav`
    ul{
        display: flex;
        align-items: center;
        gap: 12px;
    
        li a{
            color: rgba(0,0,0,.7);
            transition: 300ms;

            &:hover{
                color: rgba(0,0,0,.1);
            }
        }
    }
`