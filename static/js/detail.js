
const image_url = 'http://127.0.0.1:8000'


const PutArticleBtn = document.getElementById("put_article") //게시글 수정
const DelArticleBtn = document.getElementById("del_article_btn") //게시글 삭제




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
    title = detail['title'] //게시글 이름
    article_user = detail['user'] //게시글 작성자 username
    article_user_id = detail['user_id'] //게시글 작성자 id
    image = detail['image'] //게시글 이미지
    profile_img = detail['profile_img'] //게시글 작성자 프로필 이미지
    id = detail['id'] //게시글 id
    content = detail['content'] //게시글 내용
    rating = detail['rating'] //게시글 별점
    likes = detail['likes'] //게시글 좋아요
    updated_at = detail['updated_at'] //게시글 수정날짜
    comment = detail['comment_set'] //게시글 댓글
    count = detail['likes_count'] //게시글 좋아요 수
    comment_user = detail['comment_set'] // 댓글 작성자 username
    comment_id = detail['comment_set'] //댓글 id
    comment_profile_img = detail['comment_set'] //댓글 작성자 프로필 이미지
    comment_user_id = detail['comment_set'] //댓글 작성자 id

    window.onload = function ButtonShow1(article_user_id){
        //로그인 유저!=게시글 작성유서
        if(userId!=article_user_id){
            PutArticleBtn.style.display = 'none';
            DelArticleBtn.style.display = 'none';
        }
    }
    for (let i=0; i < comment.length; i++){
        let detail_comment = comment[i]['content']
        let detail_user = comment_user[i]['user']
        let detail_id = comment_id[i]['id']
        let detail_profile_img = comment_profile_img[i]['profile_img']
        let detail_user_id = comment_user_id[i]['user_id']


        let temp_html = `
        <div class="ms-3">
        <div class="row row-cols-auto">
            <a class="col" class="flex-shrink-0" href="${frontend_base_url}userpage.html?id=${detail_user_id}"><img class="rounded-circle" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; object-position: top;" src="${image_url}${detail_profile_img}" alt="..." /></a>
            <div class="col"> <div> <div class="fw-bold" id="comment-user" id="comment-user">${detail_user}</div></div>
        </div>
            <div class="container text-center" style="width:100%; margin-left:70px; margin-bottom:30px;">
                <div class="row row-cols-auto">
                    <div class="col" style="width:770px; text-align:left;" id="new-comment${detail_id}">${detail_comment}</div>
                    <div class="col put_comment_btn"><button type="button" class="btn btn-outline-dark" id="${detail_id}" onclick="putComment(this.id)" data-bs-toggle="modal" data-bs-target="#Modal1">수정</button></div>
                    <div class="col del_comment_btn"><button type="button" onclick="delete_comment(${detail_id})" class="btn btn-outline-dark">삭제</button></div>
                </div>
            </div>
        </div>
        <hr>
        `
        $('#detail_comment-box').append(temp_html)

        const PutCommentBtn = document.getElementsByClassName("put_comment_btn")[i] //댓글수정버튼
        const DelCommentBtn = document.getElementsByClassName("del_comment_btn")[i] //댓글삭제버튼

        function ButtonShow2(detail_user_id){
            //로그인 유저!=게시글 작성유저
            if(userId==detail_user_id){
                PutCommentBtn.style.display = 'flex';
                DelCommentBtn.style.display = 'flex';
            }
            else{PutCommentBtn.style.display = 'none'; DelCommentBtn.style.display = 'none';}
            if(userId==article_user_id){
                PutCommentBtn.style.display = 'flex';
                DelCommentBtn.style.display = 'flex';
            }
        }
        ButtonShow2(detail_user_id)
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