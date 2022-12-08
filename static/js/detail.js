const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5501/templates/'
const image_url = 'http://127.0.0.1:8000'



const article_id = localStorage.getItem('article_id');
window.onload = async function getArticle(){
    const detailData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/`,{
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
    image = detail['image']
    console.log(image)
    content = detail['content']
    created_at = detail['created_at']
    comment = detail['comment_set']
    comment_user = detail['comment_set']
    comment_id = detail['comment_set']
    console.log(comment_id)


    for (let i=0; i < comment.length; i++){
        let detail_comment = comment[i]['content']
        let detail_user = comment_user[i]['user']
        let detail_id = comment_id[i]['id']
        let temp_html = `
        <div class="ms-3">
        <div class="row row-cols-auto">
            <div class="col" class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
            <div class="col"> <div class="fw-bold" id="comment-user">${detail_user}</div></div>
        </div>
            <div class="container text-center" style="width:100%; margin-left:70px; margin-bottom:30px;">
                <div class="row row-cols-auto">
                    <div class="col" style="width:700px; text-align:left;" id="new-comment${detail_id}">${detail_comment}</div>
                    <div class="col"><button type="button" class="btn btn-outline-dark" id="${detail_id}" onclick="putComment(this.id)" data-bs-toggle="modal" data-bs-target="#Modal1">수정</button></div>
                    <div class="col"><button type="button" class="btn btn-outline-dark">삭제</button></div>
                </div>
            </div>
        </div>
        <hr>
        `
        $('#detail_comment-box').append(temp_html)
    }

    let temp1_html = `
    <div>
        <div class="articles">${content}</div>
    </div>
    `
    $('#detail_article-box').append(temp1_html)

    let temp2_html = `
    <div>
        <div class="titles">${title}</div>
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
        <div class="created_at">${created_at}</div>
    </div>
    `
    $('#detail_created_at-box').append(temp4_html)
    let temp5_html = `
                            <div class="card bg-light">
    <div style="display: flex; justify-content: center;">
        <img class="imput_image" src="${image_url}${image}" alt="...">
    </div>
    `
    $('#detail_image-box').append(temp5_html)
  })
}



const articleId = localStorage.getItem('article_id')


// 댓글 작성 //
async function post_comment() {
    console.log("post_comment 실행")
    const content = document.getElementById("content").value
    console.log(content)
    const contentData = {
    "article": articleId,
    "content": content
    }    
    const response = await fetch(`${backend_base_url}articles/${articleId}/`, {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("access")
            
        },
        method: 'POST',
        body: JSON.stringify(contentData)
    })

    response_json = await response.json()
    console.log(response_json,"!!!!!!!!", response_json.body)
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}detail.html`);
    } else {
        alert(response);
    }
}


//댓글 수정
num=0

function putComment(id) {
    console.log(id)
    num=id
    const NewComment = document.getElementById(`new_comment`)
    NewComment.value = null
    console.log(NewComment)
    
}

async function putSave() {
    console.log(num)
    const OldComment = document.getElementById(`new-comment${num}`)
    const NewComment = document.getElementById(`new_comment`).value
    console.log(OldComment)
    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/${num}/`, {
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
        console.log(comment_json['message'])
    }
}