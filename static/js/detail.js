const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5501/templates/'


const article_id = localStorage.getItem('article_id');
console.log(article_id)
window.onload = async function getArticle(){
    const detailData = async () => {
    console.log(article_id)
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
    content = detail['content']
    created_at = detail['created_at']
    comment = detail['comment_set']
    comment_user = detail['comment_set']
    console.log(detail)
    console.log(title)
    console.log(article_user)
    console.log(content)
    console.log(created_at)
    console.log(comment)
    console.log(comment_user)

    for (let i=0; i < comment.length; i++){
        let detail_comment = comment[i]['content']
        let detail_user = comment_user[i]['user']
        console.log(detail_comment)
        console.log(detail_user)
        let temp_html = `
        <div class="ms-3">
        <div class="row row-cols-auto">
            <div class="col" class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
            <div class="col" class="fw-bold">${detail_user}</div></div>
        </div>
            <div class="container text-center" style="width:100%; margin-left:70px; margin-bottom:30px;">
                <div class="row row-cols-auto">
                    <div class="col" style="width:1000px; text-align:left;">${detail_comment}</div>
                    <div class="col"><button type="button" class="btn btn-outline-dark">수정</button></div>
                    <div class="col"><button type="button" id="delete" onclick="delete_comment()" class="btn btn-outline-dark">삭제</button></div>
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
  })
}

//article_id 
const articleId = localStorage.getItem('article_id')
console.log(articleId)


// 댓글 작성 //
async function post_comment() {
    console.log("post_comment 실행")
    const content = document.getElementById("content").value
    console.log(content)
    
    const contentData = {
    "article": articleId,
    "content":  content
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
    }}