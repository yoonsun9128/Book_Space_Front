const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
const image_url = 'http://127.0.0.1:8000'

A = window.location.search
code = A.split("=")[1]

const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']

const article_id = localStorage.getItem('article_id');
async function getArticle(){
A = window.location.search
code = A.split("=")[1]
    const detailData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/articles/${code}/`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:'GET',
    })
    return response.json();
}
detailData().then((data) => {
    detail = data
    title = detail['title']
    article_user = detail['user']
    article_user_id = detail['user_id']
    image = detail['image']
    profile_img = detail['profile_img']
    id = detail['id']
    content = detail['content']
    rating = detail['rating']
    likes = detail['likes']
    updated_at = detail['updated_at']
    comments = detail['comment_set']
    count = detail['likes_count']


    for (let i=0; i < comments.length; i++){
        let detail_comment = comments[i]['content']
        let detail_user = comments[i]['user']
        let detail_id = comments[i]['id']
        let detail_profile_img = comments[i]['profile_img']
        let detail_user_id = comments[i]['user_id']
        let temp_html = `
        <div class="ms-3">
        <div class="row row-cols-auto">
            <a class="col" class="flex-shrink-0" href="${frontend_base_url}userpage.html?id=${detail_user_id}"><img class="rounded-circle" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; object-position: top;" src="${image_url}${detail_profile_img}" alt="..." /></a>
            <div class="col"> <div> <div class="fw-bold" id="comment-user" id="comment-user">${detail_user}</div></div>
        </div>
            <div class="container text-center" style="width:100%; margin-left:70px; margin-bottom:30px;">
                <div class="row row-cols-auto">
                    <div class="col" style="width:770px; text-align:left;" id="new-comment${detail_id}">${detail_comment}</div>
                    <div class="col"><button type="button" class="btn btn-outline-dark" id="${detail_id}" onclick="putComment(this.id)" data-bs-toggle="modal" data-bs-target="#Modal1">수정</button></div>
                    <div class="col"><button type="button" onclick="delete_comment(${detail_id})"  class="btn btn-outline-dark">삭제</button></div>
                </div>
            </div>
        </div>
        <hr>
        `
        $('#detail_comment-box').append(temp_html)
    }

    if (likes.includes(userId) == true){
        color = "red"
    }
    else{
        color = "gray"
    }


    let temp1_html = `
    <div>
        <div class="articles">${content}</div>
    </div>
    `
    $('#detail_article-box').append(temp1_html)

    let temp2_html = `
    <div>
        <div class="titles"> 책 제목 : ${title}</div>
    </div>
    `
    $('#detail_title-box').append(temp2_html)

    let temp3_html = `
    <div>
        <div class="article_user">${article_user}</div>
    </div>
    `
    $('#detail_article_user-box').append(temp3_html)

    let temp4_html = `
    <div>
        <div class="updated_at">${updated_at}</div>
    </div>
    `
    $('#detail_updated_at-box').append(temp4_html)
    let temp9_html = `
    <div>
        <Button onclick = "Toggle(${id})"class = "btn123" id="${id}" style = "color : ${color}" ><i class="fa-solid fa-heart"></i>${count}</Button>
    </div>
    `
    $('#detail_likes-box').append(temp9_html)
    let temp5_html = `
        <img class="input_image" style="width: 100%; height: auto; max-width: 400px; max-height: 400px; object-fit: cover;" src="${image_url}${image}" alt="...">
    `
    $('#detail_image-box').append(temp5_html)
    let temp6_html = `
    <div>
        <div class="rating">별점 : ${rating}점</div>
    </div>
    `
    $('#detail_rating-box').append(temp6_html)

    let temp7_html = `
    <div>
        <div class="titles">${title}</div>
    </div>
    `
    $('#put_title').append(temp7_html)

    let temp8_html = `
    <div>
        <img style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; object-position: top;" src="${image_url}${profile_img}" id="${article_user_id}" onclick="userpagemove(this.id)" alt="...">
    </div>
    `
    $('#profile_img_box').append(temp8_html)
  })
}getArticle()



const articleId = localStorage.getItem('article_id')


// 댓글 작성 //
async function post_comment() {
    const content = document.getElementById("content").value
    const contentData = {
    "article": articleId,
    "content": content
    }
    const response = await fetch(`${backend_base_url}articles/${code}/`, {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("access")

        },
        method: 'POST',
        body: JSON.stringify(contentData)
    })

    response_json = await response.json()
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}detail.html?id=${code}`);
        alert("댓글 작성 완료")
    } else {
        alert("댓글 작성 실패");
    }
}


//댓글 수정
num=0
// 유저페이지 가는 기능
function userpagemove(id){
    num=id
    window.location.href=`../templates/userpage.html?id=${num}`
}

function putComment(id) {
    num=id
    const OldComment = document.getElementById(`new-comment${num}`)
    const NewComment = document.getElementById(`new_comment`).value
    NewComment.value = OldComment
}

async function putSave() {
    const OldComment = document.getElementById(`new-comment${num}`)
    const NewComment = document.getElementById(`new_comment`).value
    const response = await fetch(`http://127.0.0.1:8000/articles/${code}/${num}/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "content": NewComment
        })
    })
    comment_json = await response.json()

    if (response.status == 200) {
        alert("댓글 수정 완료")
        OldComment.innerText=NewComment
    } else {
        alert("댓글 작성자만 수정 가능합니다.")
    }
}

//댓글 삭제 //
async function delete_comment(id) {
    const response = await fetch(`${backend_base_url}articles/${code}/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE'
    })

    if (response.status == 204) {
        alert("댓글 삭제 완료")
        window.location.reload();
    } else {
        alert("댓글 작성자만 삭제 가능합니다.")
    }
}

// 게시글 삭제//
async function delete_article() {
    const response = await fetch(`${backend_base_url}articles/${code}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE'
    })

    if (response.status == 204) {
        window.location.replace(`${frontend_base_url}feed.html`);
        alert("게시글 삭제 완료")
    } else {
        alert("게시글 작성자만 삭제 가능합니다.")
    }
}


//게시글 수정


function putArticle() {
    const OldContent = document.getElementById(`detail_article-box`)
    const NewContent = document.getElementById(`put_content`).value
    const OldRating = document.getElementById(`detail_rating-box`)
    const NewRating = document.getElementById(`put_rating`).value
    const OldImage = document.getElementById(`detail_image-box`)
    const private = document.getElementById("is_private")
    const is_private = private.checked;   
    document.getElementById('result').innerText = is_private;
    const NewImage = document.getElementById(`put_InputImg`).value
    NewContent.value = OldContent
    NewRating.value = OldRating
    NewImage.value = OldImage

}

async function ArticleSave() {
    const OldContent = document.getElementById(`detail_article-box`)
    const NewContent = document.getElementById(`put_content`).value
    const OldRating = document.getElementById(`detail_rating-box`)
    const NewRating = document.querySelector("input[type='radio']:checked").value
    const OldImage = document.getElementById(`detail_image-box`)
    const private = document.getElementById("is_private")
    const is_private = private.checked;   
    document.getElementById('result').innerText = is_private;
    const NewImage = document.getElementById(`put_InputImg`).files[0]

    const formData = new FormData();
    formData.append('content', NewContent);
    formData.append('rating', NewRating);
    formData.append('image', NewImage);
    formData.append('is_private', is_private);

    const response = await fetch(`http://127.0.0.1:8000/articles/${code}/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: formData
    })
    article_json = await response.json()

    if (response.status == 200) {
        alert("게시글 수정 완료")
        window.location.replace(`${frontend_base_url}detail.html?id=${code}`);
    } else {
        alert("게시글 작성자만 수정 가능합니다.")
    }
}