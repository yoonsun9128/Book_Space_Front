
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5501/templates/'
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
        user_article = data.article_set
        for (let i = 0; i<user_article.length; i++){
            let id = user_article[i]['id']
            let img = user_article[i]['image']
            console.log(id)
            console.log(img)

            let temp_html = `
            <div class="col-md-3">
                <img src="${image_url}${img}" class="rounded" id="${id}" onclick="pageDatail(this.id)">
            </div> `
            $('#article_list').append(temp_html)

        }
        let name = data['username']
        let user_image = data['profile_img']
        let name_html = `
        <h3 class="title">${name}</h3>
        `
        $('#user_name').append(name_html)
        let img_html = `
        <img src="${image_url}${user_image}" alt="Circle Image" class="img-raised rounded-circle img-fluid">
        `
        $('#user_img').append(img_html)
    })
}

function pageDatail(id){
    console.log(id)
    localStorage.setItem('article_id', id)
    window.location.href = "../templates/detail.html"
}