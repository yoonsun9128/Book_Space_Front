const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
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
    console.log(i)
    }
}

// 게시글 작성 //
async function post_article() {
    console.log("post_article 실행")
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const star = document.querySelector("input[type='radio']:checked").value
    console.log(star)
    const image=document.getElementById("InputImg").files[0]
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('rating', star);
    console.log("87", formData)
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
        alert(response.status);
    }}