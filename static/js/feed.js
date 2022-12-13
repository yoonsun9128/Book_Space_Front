const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
const image_url = 'http://127.0.0.1:8000'

const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

window.onload = async function FeedList(){
    const FeedData = async ()=> {
        const response = await fetch(`${backend_base_url}articles/list`,{
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
            console.log(profile_img)
            
            


            console.log(like.includes(userId))

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
                        <img src="${image_url}${profile_img}" alt="..."><span style = "margin-left : 10px;" class="text-uppercase fw-bold fs-6">${username}</span>
                    </div>
                    <div class="card-img-top image-card image-card-1"> 
                        <img src="${image_url}${image}" alt="..."> 
                    </div>
                    <div class = "btns">
                        <Button onclick = "Toggle(${id})"class = "btn" id="${id}" style = "color : ${color}" ><i class="fa-solid fa-heart"></i> ${count}</Button>
                    </div>
                    <div class="card-body">
                        <span class="text-uppercase fw-bold fs-6">${title}</span>
                        <p>${content}</p> 
                        <div class="mt-4 about d-flex justify-content-between align-items-center">
                        <a href="${frontend_base_url}detail.html?id=${id}" class="text-dark">Read full story...</a>
                        </div>
                    </div>
                </div>
            </div>
            `
            $('#image-box').append(temp_html)
        }
    })
}

// function page2detail(id){
//     localStorage.setItem('article_id', id)
//     window.location.href = "../templates/detail.html"
//     // window.location.href = `../templates/detail.html?article_id=${id}`
//     console.log(id)
// }
