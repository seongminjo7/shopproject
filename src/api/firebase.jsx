import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { use } from "react";
import { set } from "firebase/database";
import { v4 as uuid } from 'uuid'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const provider = new GoogleAuthProvider();
const auth = getAuth();

// 구글 자동 로그인 방지
provider.setCustomParameters({
    prompt: 'select_account'
})

// 구글 로그인

export async function googleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user)
        return user
    } catch (error) {
        console.error(error);
    }
}

// 구글 로그아웃

export async function googleLoout() {
    try {
        await signOut(auth); // 기존의 정보를 초기화 해주는 hook
    } catch (error) {
        console.error(error);
    }
}

// 새로고침해도 로그인 유지하는 코드

export function onUserState(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const updateUser = await adminUser(user)
                callback(updateUser)
            } catch (error) {
                console.error(error);
            }
        } else {
            callback(null)
        }
    })
    // onAuthStateChanged = 사용자의 인증 상태 변화를 체크()
}

async function adminUser(user) {
    try {
        const snapshot = await get(ref(database, 'admin'))

        if (snapshot.exists()) {
            const admins = snapshot.val()
            const isAdmin = admins.includes(user.email);
            return { ...user, isAdmin }
        }
        return user
    } catch (error) {
        console.error(error);
    }
}

// 상품 정보를 파이어베이스에 업로드
export async function addProduct(product, img) {
    // yarn add uuid
    // uuid 식별자를 만들어주는 라이브러리
    // 숫자와 영문으로 조합된 식별자 코드를 부여해서 고유값으로 사용하는 라이브러리
    const id = uuid()
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        img
        // 기존에 있던 정보에 id를 추가해서 업로드 시킴
    })
}

// 상품 가져오기
export async function getProduct() {
    const snapshot = await get(ref(database, 'products'))
    if (snapshot.exists()) {
        return Object.values(snapshot.val());
    } else {
        return []
    }
}

// 카테고리별 상품 가져오기

export async function getCategoryProduct(category) {
    return get(ref(database, 'products')).then(snapshot => {
        if (snapshot.exists()) {
            const allProduct = Object.values(snapshot.val());
            const fillterProduct = allProduct.filter(product => product.category === category)
            return fillterProduct
        }
    })
}