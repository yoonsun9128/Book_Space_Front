
const image_url = 'http://127.0.0.1:8000'


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

var stars = document.querySelector("input[type='radio']:checked")

function teststar(){
    var i;
    for (i = 0; i <stars.length; i++){
        stats[i].innerHTML = i;
    }
}

// 게시글 작성 //
async function post_article() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const star = document.querySelector("input[type='radio']:checked").value
    const private = document.getElementById("is_private")
    const is_private = private.checked;   
    document.getElementById('result').innerText = is_private; 
    const image=document.getElementById("InputImg").files[0]
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('rating', star);
    formData.append('is_private', is_private)
    const response = await fetch(`${backend_base_url}articles/search/`, {
        headers: {

            'Authorization': "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: formData
    })
    response_json = response.json();

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}feed.html`);
    } else {
        alert("빈칸을 채워주세요", response.status);
    }}