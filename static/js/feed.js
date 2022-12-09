const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
const image_url = 'http://127.0.0.1:8000'


const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']





// if (조건식) {
//     // statement1
//  } else if(조건식) {
//     // statement2
//  } else {
//     // statement3
//  }

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
            
            


            console.log(like.includes(userId))

            if (like.includes(userId) == true){
                color = "red"
            }
            else{
                color = "gray"
            }

            let temp_html = `
            <div class="col-md-4"> 
                <div class="card"> 
                    <div class="card-img-top image-card image-card-1"> 
                        <img src="${image_url}${image}" alt="..."> 
                    </div>
                    <div class = "btns">
                        <Button onclick = "Toggle(${id})"class = "btn" id="${id}" style = "color : ${color}" ><i class="fa-solid fa-heart"></i> ${count}</Button>
                    </div>
                    <div class="card-body"> 
                        <span class="text-uppercase fw-bold fs-6">${title}</span>
                        <p>${username}</p>
                        <p>${content}</p> 
                        <div class="mt-4 about d-flex justify-content-between align-items-center">
                        <a href="../templates/detail.html" class="text-dark">Read full story...</a>  
                        </div> 
                    </div> 
                </div>
            </div>
            `
            $('#image-box').append(temp_html)
        }
    })
}

function page2detail(id){
    localStorage.setItem('article_id', id)
    window.location.href = "../templates/detail.html"
    // window.location.href = `../templates/detail.html?article_id=${id}`
    console.log(id)
}
