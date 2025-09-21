import { useParams } from "react-router-dom";

export default function CategoryPage() {
    const { catrgory } = useParams()
    console.log(catrgory)

    return (
        <>
            <h2>{catrgory} 페이지 입니다.</h2>
        </>
    )
}