export async function uploadImg(file) {
    try {
        const formData = new FormData();
        // FormData() = http 요청을 하게 되면 파일을 담기 위한 전용 객체

        formData.append('file', file);
        // 실제 파일의 데이터
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
        // 클라우디나리 자체에서 필요한 이미지 설정

        const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
            method: 'POST',
            body: formData
            // fetch로 클라우디나리 업로드의 엔트 포인트에 post 타입으로 요청
        })

        const data = await res.json();
        console.log(data)
        return data.url;

    } catch (error) {
        console.error(error)
    }
}