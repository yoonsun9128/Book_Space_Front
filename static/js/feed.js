const image_url = 'http://127.0.0.1:8000'

const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

function init(){
    document.getElementById("best").value = "시간순"
}init()

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
        console.log(feed)
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
                        <Button onclick = "Toggle(${id})" class = "btn" id="${id}" style = "color : ${color};" ><div class="fa-solid fa-heart" style = "margin-right:10px"></div>${count}</Button>
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



