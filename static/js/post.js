const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/'

// 게시글 작성 //
async function post_article() {
    console.log("post_article 실행")
    const title = document.getElementById("title").value 
    console.log(title)
    const username = document.getElementById("username").value
    console.log(username)
    const content = document.getElementById("content").value
    console.log(content)
    const file = document.getElementById("file").value
    console.log(file)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('username', username)
    formData.append('content', content)
    formData.append('file', file[0])
    const response = await fetch(`${backend_base_url}articles/`, {
        headers: {
            
            
        },
        method: 'POST',
        body: formData
    })

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}index.html`);
    } else {
        alert(response.status);
    }}
// 인풋이미지 미리보기
const fileInput = document.getElementById("file")
const handleFiles = (e) => {
    const fileReader = new FileReader()
    const selectedFile = fileInput.files;
    fileReader.readAsDataURL(selectedFile[0])
    fileReader.onload = function(){
        document.getElementById("previewImage").src = fileReader.result
    }
}
fileInput.addEventListener("change", handleFiles)