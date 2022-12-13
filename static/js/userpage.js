
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
const image_url = 'http://127.0.0.1:8000'

// 로그인 안하면 접근 금지
var token = localStorage.getItem("access");
    if (!token) {
        alert("로그인을 해주세요!")
        window.location.replace (`${frontend_base_url}main.html`)
    }


const user = localStorage.getItem("payload").split(',')[4];
const user_id = user[10];

window.onload = async function getUserpage(){
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
        console.log(total)
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
        console.log(info)
        let name_html = `
        <h3 class="title">${name}</h3>
        `
        $('#user_name').append(name_html)
        let img_html = `
        <img src="${image_url}${user_image}" alt="Circle Image" class="img-raised rounded-circle img-fluid">
        `
        $('#user_img').append(img_html)
        let info_html = `
        <i type="button" onclick="infoChange(this.id)" id="${info}" data-bs-toggle="modal" data-bs-target="#UserModal" >수정하기</i>
        `
        $('#user_info').append(info_html)
    })
}

function pageDatail(id){
    console.log(id)
    localStorage.setItem('article_id', id)
    window.location.href = "../templates/detail.html"
}

num = 0
function infoChange(id){
    console.log(id)
    num= id
}

async function editSave() {
    console.log(num)
    const newName = document.getElementById(`info_name`).value
    const newPassword = document.getElementById(`info_password`).value
    const newPassword2 = document.getElementById(`info_password2`).value
    const newImage = document.getElementById(`info_image`).files[0]
    console.log(newName)
    console.log(newPassword)
    console.log(newPassword2)
    console.log(newImage)
    const formData = new FormData();
    formData.append('username', newName);
    formData.append('password', newPassword);
    formData.append('passwordcheck', newPassword2);
    formData.append('profile_img', newImage);
    console.log("87", formData)
    const response = await fetch(`http://127.0.0.1:8000/users/${num}/`, {
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