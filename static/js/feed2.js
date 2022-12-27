const image_url = 'http://127.0.0.1:8000'

const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

function choiceBook(){
    URL = window.location.search
    choice_id = URL.split("=")[1]
        const choiceFeed = async ()=> {
        const response = await fetch(`${backend_base_url}articles/list/${choice_id}`,{
            method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })

        return response.json();
        }
        choiceFeed().then((data) => {
            feeds = data
            if(feeds == ""){
                Swal.fire({
                    title: '책에 대한 게시물이 없습니다.',
                    text: '메인 페이지로 돌아가겠습니다!',
                    icon: 'warning',
                    confirmButtonColor: '#FFCCCC',
                    confirmButtonText: '확인',
                }).then(result =>{
                    if(result.isConfirmed){
                        window.location.href = "../templates/main.html"
                    }
                })
                return false;
            }
            let title = feeds[0]['title']
            let temp_html = `
            <p class="a"><mark class="mint">"${title}"</mark>
            <span class="b" >에 대한 게시글</span>
            </p>
             `
            $('#search_title').append(temp_html)

            for (let i = 0; i<feeds.length; i++){
                let username = feeds[i]['username']
                let title = feeds[i]['title']
                let content = feeds[i]['content']
                let image = feeds[i]['image']
                let id = feeds[i]['id']
                let like = feeds[i]['likes']
                let count = feeds[i]['likes_count']
                let profile_img = feeds[i]['profile_img']
                let write_user_id = feeds[i]['user_id']

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
                        <div class="card-img-top image-card image-card-1" onclick="window.location.href='${frontend_base_url}detail.html?id=${id}'">
                            <img src="${image_url}${image}" alt="...">
                        </div>
                        <div class = "btns">
                            <Button onclick = "Toggle(${id})"class = "btn" id="${id}" style = "color : ${color}" ><div class="fa-solid fa-heart" style = "margin-right:10px"></div>${count}</Button>
                        </div>
                        <div class="card-body">
                            <span class="text-uppercase fw-bold fs-6">${title}</span>
                            <p>${content}</p>
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
    }choiceBook();


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