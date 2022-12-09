
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
    console.log(user_id)
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
        console.log(data['username'])
        user_article = data.article_set
        console.log(user_article)
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
    })
}

function pageDatail(id){
    console.log(id)
    localStorage.setItem('article_id', id)
    window.location.href = "../templates/detail.html"
}