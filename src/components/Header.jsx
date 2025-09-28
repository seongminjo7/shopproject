import { Link } from "react-router-dom";
import styled from "styled-components";
import MainMenu from "./MainMenu";
import { useEffect, useState } from "react";
import { googleLogin, googleLoout, onUserState } from "../api/firebase";
import UserData from "./UserData";

export default function Header() {

    const [user, setUser] = useState();

    const login = () => {
        googleLogin().then(setUser)
    }

    const logout = () => {
        googleLoout().then(setUser)
    }

    useEffect(() => {
        onUserState((user) => {
            setUser(user)
        })
    }, [])

    return (
        <HeaderContainer>
            <h1>
                <Link to='/'>SHOOOOOOP</Link>
            </h1>
            <MainMenu />
            <div className="userInfoWrap">
                <Link to='/cart'>장바구니</Link>
                {user && user.isAdmin &&
                    <Link to='/products/upload'>업로드</Link>
                }
                {user ? (
                    <>
                        <UserData user={user} />
                        <button className="logoutBtn" onClick={logout}>logout</button>
                    </>
                ) : (
                    <button className="loginBtn" onClick={login}>login</button>
                )}
            </div>
        </HeaderContainer>
    )
}


const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 24px 12px;
    box-sizing: border-box;
    gap: 24px;
    border-bottom: solid 1px rgba(0,0,0,.2);

    h1 a{
        font-size: 36px;
        color: lightseagreen;
    }

    .userInfoWrap{
        display: flex;
        margin-left: auto;
        align-items: center;
        gap: 12px;

        button{
            padding: 6px 12px;
            border-radius: 6px;
            border: solid 1px rgba(0,0,0,.1);
            
            &.loginBtn{
                background: lightblue;
            }

            &.logout{
                background: lightpink;
            }
        }
    }
`