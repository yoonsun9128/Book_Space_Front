
const image_url = 'http://127.0.0.1:8000'


// 로그인 안하면 접근 금지
var token = localStorage.getItem("access");
    if (!token) {
        Swal.fire({
            title: '로그인 해주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace (`${frontend_base_url}main.html`)
            }
        })

    }

const editButton = document.getElementById("user_info")

const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

function getUserpage(){
URL = window.location.search
id = URL.split("=")[1]
    const detailData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/users/${id}/`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:'GET',
    })
    return response.json();
    }
    detailData().then((data) =>{
        total = data
        user_article = data.article_set
        for (let i = 0; i<user_article.length; i++){
            let article_id = user_article[i]['id']
            let img = user_article[i]['image']

            let temp_html = `
            <div class="col-md-3">
                <img src="${image_url}${img}" class="rounded" id="${article_id}" onclick="pageDatail(this.id)">
            </div> `
            $('#article_list').append(temp_html)

        }
        let name = data['username']
        let user_image = data['profile_img']
        let info_user_id = data['id']


        let name_html = `
        <h3 class="title">${name}</h3>
        `
        $('#user_name').append(name_html)
        let img_html = `

        <img src="${image_url}${user_image}" alt="Circle Image" class="img-raised rounded-circle img-fluid" id="${info_user_id}">
        `
        $('#user_img').append(img_html)
        let info_html = `
        <i type="button" onclick="ImageChange(this.id)" class="put_profile_img" id="${info_user_id}" data-bs-toggle="modal" data-bs-target="#UserImage" style="cursor:pointer;">이미지 변경 // </i>
        <i type="button" onclick="infoChange(this.id)" class="edit_user" id="${info_user_id}" data-bs-toggle="modal" data-bs-target="#UserModal" style="cursor:pointer;">UserName/PW변경</i>
        <i type="button" onclick="infoDelete(this.id)" class="delete_user" id="${info_user_id}" data-bs-toggle="modal" data-bs-target="#DeleteModal" style="cursor:pointer;">// 탈퇴하기</i>
        `
        $('#user_info').append(info_html)

        if (userId != info_user_id){
            editButton.style.display = 'none';

        }
    })
}getUserpage()

function likesArticle(){
URL = window.location.search
id = URL.split("=")[1]
    $('#likeArticle_list').empty()
    const detailData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/users/${id}/likes/`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:'GET',
    })
    return response.json();
    }
    detailData().then((data) =>{
        total = data
        for (let i = 0; i<total.length; i++){
            let article_id = total[i]['id']
            let img = total[i]['image']

            let temp_html = `
            <div class="col-md-3">
                <img src="${image_url}${img}" class="rounded" id="${article_id}" onclick="pageDatail(this.id)">
            </div> `
            $('#likeArticle_list').append(temp_html)

        }
    })
}

num = 0
function pageDatail(id){
    num=id
    window.location.href = `../templates/detail.html?id=${num}`
}
function ImageChange(id){
    num= id

}
function infoChange(id){
    num= id
}

function infoDelete(id){
    num= id
}

async function imageSave(){
    const newImage = document.getElementById(`info_image`).files[0]
    const formData = new FormData();
    formData.append('profile_img', newImage);
    const response = await fetch(`http://127.0.0.1:8000/users/${num}/image`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: formData
    })
    response_json = response.json();
    if (response.status == 200) {
        Swal.fire({
            title: '프로필이미지 수정 완료!',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}userpage.html?id=${id}`)
            }
        })

    }else {
        Swal.fire({
            title: '프로필이미지 수정 실패',
            text:'이미지를 넣어주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}userpage.html?id=${id}`)
            }
        })
    }
}

async function editSave() {
    const userInfoData = {
        username : document.getElementById(`info_name`).value,
        password : document.getElementById(`info_password`).value,
        passwordcheck : document.getElementById(`info_password2`).value
    }

    if (userInfoData.password !== userInfoData.passwordcheck){
        Swal.fire({
            title: '비밀번호와 비밀번호check가 다릅니다!',
            text: '비밀번호를 확인해주세요',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    };
    const response = await fetch(`http://127.0.0.1:8000/users/${num}/`, {
        headers: {
            'Content-type':'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify(userInfoData)
    })
    response_json = await response.json();
    if (response.status == 200) {
        Swal.fire({
            title: '프로필 정보 수정완료',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}userpage.html?id=${id}`)
            }
        })

    }
    if (response.status != 200) {
        Swal.fire({
            title: '빈칸입니다.',
            text: '유저네임 또는 비밀번호를 변경해주세요.',
            icon: 'warnings',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }

}

async function userDelete() {
    const response = await fetch(`http://127.0.0.1:8000/users/${num}/`, {
        headers: {
            'Content-type':'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'Delete',
    })
    if (response.status == 202) {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("payload")
        localStorage.removeItem("user")
        localStorage.removeItem("pk")
        Swal.fire({
            title: '회원탈퇴 완료..',
            text: '그동안 이용해주셔서 감사합니다.',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}main.html`);
            }
        })
    } else {
        Swal.fire({
            title: '회원탈퇴 실패',
            text:'해당 유저가 아닙니다.',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }return false;
        })
    }
}
