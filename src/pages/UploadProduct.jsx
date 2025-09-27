import { useContext, useRef, useState } from "react"
import styled from "styled-components";
import { CategoryContext } from "../context/CategoryContext";
import { addProduct } from "../api/firebase";
import { uploadImg } from "../api/imgUpload";
import { validate } from "uuid";

export default function UploadProduct() {

    const { categoryList } = useContext(CategoryContext);

    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const fileRef = useRef()

    const colors = [
        '#f6d365', '#000000', '#a1c4fd', '#dddddd', '#4facfe',
        '#30cfd0', '#764ba2', '#c471f5', '#3cba92', '#ffb199'
    ]

    const [product, setProduct] = useState({
        title: '',
        price: '',
        option: '',
        category: '',
        description: '',
        colors: []

    })
    // 상품에 들어갈 정보들을 하나의 객체로 관리하고 빈 문자열로 초기화

    console.log(product)

    const productInfoChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files && files[0]) {
            setFile(files[0]);
            return
        }
        setProduct(prev => ({ ...prev, [name]: value }));
    }

    const colorPicker = (color) => {
        setProduct(prev => ({
            ...prev, colors: prev.colors.includes(color) ? prev.colors : [...prev.colors, color]
        }))
    }

    const removeColor = (colorRemove) => {
        setProduct(prev => ({ ...prev, colors: prev.colors.filter(color => color !== colorRemove) }))
    }

    const validate = () => {
        if (!file) return "이미지 파일을 선택해주세요";
        if (!product.title.trim()) return "상품명을 입력해주세요";
        if (!product.price.toString().trim()) return "가격을 입력해주세요";
        if (Number.isNaN(Number(product.price)) || Number(product.price) <= 0) return "가격은 1원 이상의 숫자를 입력해주세요";
        if (!product.category) return "카테고리를 선택해주세요";
        return null
    }


    const uploadSubmit = async (e) => {
        e.preventDefault();

        // 메시지 처리
        const msg = validate();
        if (msg) {
            setError(msg)
            setSuccess(null)
            return
        }

        setIsLoading(true)

        try {
            const url = await uploadImg(file)
            console.log(url)
            await addProduct(product, url)
            setSuccess('업로드가 정상적으로 완료 되었습니다.')
            setTimeout(() => {
                setSuccess(null)
            }, 3000)
            setFile(null)
            setProduct({
                title: '',
                price: '',
                option: '',
                category: '',
                description: '',
                colors: []
            })
            if (fileRef.current) {
                fileRef.current.value = '';
            }
        } catch (error) {
            console.error(error)
            setError(error?.message || '업로드가 실패했습니다.')
        } finally { // 모든게 다 되었을 때
            setIsLoading(false)
        }
    }

    const isSubmitDisabled =
        isLoading ||
        !file ||
        !product.title.trim() ||
        !product.category ||
        !product.price.toString().trim() ||
        Number.isNaN(Number(product.price))

    return (
        <Container>
            <div className="imgLoadWrap">
                {file && (
                    <img src={URL.createObjectURL(file)} />
                    // createObjectURL = url 주소를 string 형태로 변환
                )}
            </div>
            <FormWrapper onSubmit={uploadSubmit}>

                {/* 이미지 */}
                <input type="file" name="file" accept="image/*" onChange={productInfoChange} ref={fileRef} />

                {/* 상품 제목 */}
                <input type="text" name="title" placeholder="상품명을 입력해주세요." value={product.title} onChange={productInfoChange} />

                {/* 상품 가격 */}
                <input type="text" name="price" placeholder="상품 가격을 입력해주세요." value={product.price} onChange={productInfoChange} />

                {/* 카테고리 */}
                {/* <select name="category" value={product.category} onChange={productInfoChange}>
                    <option value="">분류 선택</option>
                    <option value="top">상의</option>
                </select> */}

                <select name="category" value={product.category} onChange={productInfoChange}>
                    <option value="">분류 선택</option>
                    {categoryList.map((el, idx) => ( // map은 둥근괄호 사용
                        <option key={idx} value={el}>{el}</option>
                    ))}
                </select>

                {/* 옵션 */}
                <input type="text" name="option" placeholder="상품 옵션을 ,로 구분해서 입력해주세요." value={product.option} onChange={productInfoChange} />

                {/* color 옵션 */}
                <div className="colorList">
                    {colors.map((color, idx) => (
                        <div
                            className="colorItem"
                            key={idx}
                            style={{ backgroundColor: color }}
                            onClick={() => colorPicker(color)} // 함수 호출 방식 수정
                        />
                    ))}
                </div>

                <div className="colorSelectList">
                    {product.colors.map((color, idx) => (
                        <div key={idx} style={{ backgroundColor: color }}>
                            {color}
                            <button onClick={() => removeColor(color)}>X</button>
                        </div>
                    ))}
                </div>

                <input type="text" name="description" placeholder="상품 설명을 입력하세요." value={product.description} onChange={productInfoChange} />

                <button disabled={isSubmitDisabled}>
                    {isLoading ? '업로드 중' : '제품 등록하기'}
                </button>

                {/*
                    버튼의 submit 이벤트는 form의 내용을 업로드 하는 이벤트이며,
                    onsubmit은 실제 폼요소의 데이터를 넘기는 영역에서 정해줘야 한다.
                */}

                {success && (
                    <p>{success}</p>
                )}
                {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                )}
            </FormWrapper>
        </Container >
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 30px 0;
    margin: 0 auto;
    display: flex;
    gap: 40px;
`

const FormWrapper = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    input{
        width: 100%;
        height: 40px;
        border-radius: 6px;
        border-color: rgba(0,0,0,.3);
        padding: 6px 12px;
    }

    .colorList{
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        margin-bottom: 10px;

        .colorItem{
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }

    .colorSelectList{
        display: flex;
        gap: 4px;
        flex-wrap: wrap;

        div{
            width: 100px;
            height: 30px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;

            button{
                color: #fff;
            }
        }
    }
`