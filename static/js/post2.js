// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'


const payload = localStorage.getItem('payload')

const personObj = JSON.parse(payload)
const userId = personObj['user_id']
W = window.location.href
id = (W.split("=")[1])

window.onload = async function booktitle() {
    const bookData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/articles/search/${id}/`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
            method:'GET',
        })
        return response.json();
    }

bookData().then((data) => {
    book = data
    let title = book['book_title']

    let temp_html = `
    <div>
        <div class="form-control">${title}</div>
    </div>
    `
    $('#title').append(temp_html)
})
}





// 인풋이미지 미리보기
const fileInput = document.getElementById("InputImg")
const handleFiles = (e) => {
    const fileReader = new FileReader()
    const selectedFile = fileInput.files;
    fileReader.readAsDataURL(selectedFile[0])
    fileReader.onload = function(){
        document.getElementById("previewImage").src = fileReader.result
    }
}
fileInput.addEventListener("change", handleFiles)


// post2 작성 //
async function post_book() {
    console.log("post_article 실행")
    const title = document.getElementById("title").value 
    console.log(title)
    const content = document.getElementById("content").value
    console.log(content)
    const InputImg = document.getElementById("InputImg").value
    console.log(InputImg)
    const rating = document.getElementById("rating").value
    console.log(rating)
    
    const image=document.getElementById("InputImg").files[0]
    console.log(image)
    const formData = new FormData();
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('image', image);
    
    console.log("87", formData)
    const response = await fetch(`http://127.0.0.1:8000/articles/search/${id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: formData
    })
    response_json = response.json();

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}feed.html`);
    } else {
        alert(response.status);
    }}