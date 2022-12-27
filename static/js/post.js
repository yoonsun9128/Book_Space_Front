
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
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    const star = document.querySelector("input[type='radio']:checked")
    const private = document.getElementById("is_private")
    const is_private = private.checked;   
    document.getElementById('result').innerText = is_private; 
    const image=document.getElementById("InputImg").files[0]

    if(image==undefined){
        Swal.fire({
            title: '이미지를 넣어주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                return false
            }
        })
    } 
    if(star==null){
        Swal.fire({
            title: '별점을 넣어주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                return false
            }
        })
    }
    if(content.value==""){
        Swal.fire({
            title: '내용을 적어주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
    }
    if(title.value==""){
        Swal.fire({
            title: '제목을 적어주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
    }
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('image', image);
    formData.append('rating', star.value);
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
        Swal.fire({
            title: '게시글 작성 완료!',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}feed.html`);
            }
        })
        
    } else {
        Swal.fire({
            title: '빈칸을 채워주세요!',
            text: '제목, 내용, 별점, 이미지를 모두 넣어주세요.',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                
            }
        })
    }}