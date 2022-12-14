
const image_url = 'http://127.0.0.1:8000'

// 로그인 안하면 접근 금지
var token = localStorage.getItem("access");
    if (!token) {
        alert("로그인을 해주세요!")
        window.location.replace (`${frontend_base_url}main.html`)
    }


const user = localStorage.getItem("payload").split(',')[4];
const user_id = user[10];

async function getUserpage(){
    const detailData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/users/${user_id}/`,{
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
        let info = data['id']
        let name_html = `
        <h3 class="title">${name}</h3>
        `
        $('#user_name').append(name_html)
        let img_html = `
        <img src="${image_url}${user_image}" alt="Circle Image" class="img-raised rounded-circle img-fluid" onclick="ImageChange(this.id)" id="${info}" data-bs-toggle="modal" data-bs-target="#UserImage">
        `
        $('#user_img').append(img_html)
        let info_html = `
        <i type="button" onclick="infoChange(this.id)" id="${info}" data-bs-toggle="modal" data-bs-target="#UserModal" >수정하기</i>
        `
        $('#user_info').append(info_html)
    })
}getUserpage()

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
        window.location.replace(`${frontend_base_url}userpage.html`);
    } else {
        alert(response.status);
    }
}

async function editSave() {
    const userInfoData = {
        username : document.getElementById(`info_name`).value,
        password : document.getElementById(`info_password`).value,
        passwordcheck : document.getElementById(`info_password2`).value
    }
    if (userInfoData.username ==""){
        alert("Username 입력해주세요")
        return false
    };
    if ((userInfoData.password).length <4){
        alert("비밀번호는 4자리 이상으로 입력해주세요")
        return false
    };
    if (userInfoData.password !== userInfoData.passwordcheck){
        alert("비밀번호가 일치하지 않습니다!")
        return false
    };
    if (userInfoData.password == ""){
        alert("비밀번호를 입력해주세요.")
        return false
    };
    const response = await fetch(`http://127.0.0.1:8000/users/${num}/`, {
        headers: {
            'Content-type':'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify(userInfoData)
    })
    response_json = response.json();
    if (response.status == 200) {
        alert("수정완료")
        window.location.replace(`${frontend_base_url}userpage.html`);
    } else {
        alert(response.status);
    }

}