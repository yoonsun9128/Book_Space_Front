const image_url = 'http://127.0.0.1:8000'
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

const login_email = localStorage.getItem("user");
const user_email = document.getElementById("user_email")
const logoutButton = document.querySelector(".logout")
const loginButton = document.getElementById("btn1")
const navloginButton = document.getElementById("login-button")
const feedButton = document.getElementById("feed-button")
const postButton = document.getElementById("post-button")
const recommendButton = document.getElementById("recommend-button")

const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

window.onpageshow = function init(){
    user_email.innerText = login_email
    document.getElementById("best").value = "시간순"
    navloginButton.style.display = 'none';
    user_email.style.display = 'block';
}

function Best(){
    var A = document.getElementById("best").value;

async function FeedList(){
    $('#image-box').empty()
    const FeedData = async ()=> {
        const response = await fetch(`${backend_base_url}articles/list/?rank=${A}`,{
            method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    FeedData().then((data) => {
        feed = data
        for (let i = 0; i < feed.length; i++){
            let username = feed[i]['username']
            let title = feed[i]['title']
            let content = feed[i]['content']
            let image = feed[i]['image']
            let id = feed[i]['id']
            let like = feed[i]['likes']
            let count = feed[i]['likes_count']
            let profile_img = feed[i]['profile_img']
            let write_user_id = feed[i]['user_id']
            let count_comment = feed[i]['comment_set'].length
            let rating = feed[i]['rating']
            if (like.includes(userId) == true){
                color = "red"
            }
            else{
                color = "gray"
            }
            let temp_html = `
            <div id = "my_table" class="col-md-4">
                <div class="card">
                    <div class = "text">
                    <a href="${frontend_base_url}userpage.html?id=${write_user_id}"><img src="${image_url}${profile_img}" alt="..."></a><span style = "margin-left : 10px;" class="text-uppercase fw-bold fs-6">${username}</span>
                    </div>
                    <div class="card-img-top image-card image-card-1">
                        <img src="${image_url}${image}" onclick="window.location.href='${frontend_base_url}detail.html?id=${id}'" alt="...">
                    </div>
                    <div class = "btns" id = "like-button">
                        <Button onclick = "Toggle(${id})" class = "btn" id="${id}" style = "color : ${color}; float:left;" ><div class="fa-solid fa-heart" style = "margin-right:10px"></div>${count}</Button>
                        <div class = "star" style = "float:right; color : #ffD400;" id = "star${i}"></div>
                        <div id = "GUGU${i}" style = "display:none">${rating}</div>
                    </div>
                    <div class="card-body">
                        <span class="text-uppercase fw-bold fs-6">${title}</span>
                        <p>${content}</p>
                        <p>댓글 ${count_comment}개</p>
                        <div class="mt-4 about d-flex justify-content-between align-items-center">
                        <a href="${frontend_base_url}detail.html?id=${id}" class="text-dark">더보기...</a>
                        </div>
                    </div>
                </div>
            </div>
            `
            $('#image-box').append(temp_html)
            var x = document.getElementById("GUGU" + i).textContent;
            if(x == 0.5){
                document.getElementById("star" + i).innerHTML = `<i class="fa-solid fa-star-half"></i>`
            }else if(x == 1.0){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i>`
            }else if(x == 1.5){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i><i class="fa-solid fa-star-half"></i>`
            }else if(x == 2.0){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i>`
            }else if(x == 2.5){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-solid fa-star-half"></i>`
            }else if(x == 3.0){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"><i class="fa-sharp fa-solid fa-star">`
            }else if(x == 3.5){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"><i class="fa-sharp fa-solid fa-star"><i class="fa-solid fa-star-half"></i>`
            }else if(x == 4.0){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i>`
            }else if(x == 4.5){
                document.getElementById("star" + i).innerHTML = `<i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-solid fa-star-half"></i>`
            }else{
                document.getElementById("star" + i).innerHTML =`<i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i>`
            }
        }
    })
}FeedList()
}
Best();
async function Toggle(k) {
    const btnvar1 = document.getElementById(k);
    if (btnvar1.style.color == 'red'){
      btnvar1.style.color = "grey"
      btnvar1.textContent = Number(btnvar1.textContent) -1
      btnvar1.innerHTML = `<div class="fa-solid fa-heart" style = "margin-right:10px"></div>${btnvar1.textContent}`;
    }
    else {
      btnvar1.style.color = "red"
      btnvar1.textContent = Number(btnvar1.textContent) +1
      btnvar1.innerHTML = `<div class="fa-solid fa-heart" style = "margin-right:10px"></div>${btnvar1.textContent}`;

    }
const response = await fetch(`${backend_base_url}articles/like/${k}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("access")
      },
    })
  }


async function timeOut() {
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload.exp <(Date.now()/1000)){
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("payload")
        localStorage.removeItem("user")
        localStorage.removeItem("pk")
        Swal.fire({
            title: '토큰세션이 만료되었습니다!',
            text: '다시로그인 해주세요',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.href = "../templates/main.html"
            }
        })
    };
}timeOut()


function gotoUserpage(){
    var user_id = localStorage.getItem("pk")
    window.location.href = `../templates/userpage.html?id=${user_id}`
}



//#로그아웃//
async function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    localStorage.removeItem("user")
    localStorage.removeItem("pk")

    Swal.fire({
        title: '로그아웃 되었습니다!',
        text: '또 찾아와주세요',
        icon: 'warning',
        confirmButtonColor: '#FFCCCC',
        confirmButtonText: '확인',
    }).then(result =>{
        if(result.isConfirmed){
            window.location.href = "../templates/main.html"
        }
    })
}


function parseJwt(token) {
    var base64Url = localStorage.getItem("access").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
        function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
};



