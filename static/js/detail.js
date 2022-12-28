
const image_url = 'http://127.0.0.1:8000'


const PutArticleBtn = document.getElementById("put_article") //게시글 수정
const DelArticleBtn = document.getElementById("del_article") //게시글 삭제




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

    function ButtonShow1(article_user_id){
        //로그인 유저!=게시글 작성유저
        if(userId!=article_user_id){
            PutArticleBtn.style.display = 'none';
            DelArticleBtn.style.display = 'none';
        }
    }ButtonShow1(article_user_id)
    
    for (let i=0; i < comment.length; i++){
        let detail_comment = comment[i]['content']
        let detail_user = comment[i]['user']
        let detail_id = comment[i]['id']
        let detail_profile_img = comment[i]['profile_img']
        let detail_user_id = comment[i]['user_id']


        let temp_html = `
        <div class="ms-3">
        <div class="row row-cols-auto">
            <a class="col" class="flex-shrink-0" href="${frontend_base_url}userpage.html?id=${detail_user_id}"><img class="rounded-circle" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; object-position: top;" src="${image_url}${detail_profile_img}" alt="..." /></a>
            <div class="col"> <div> <a class="fw-bold" id="comment-user" id="comment-user" href="${frontend_base_url}userpage.html?id=${detail_user_id}">${detail_user}</a></div>
            <div class="col">${updated_at}</div>
        </div>
            <div class="container text-center" style="width:93%; margin-left:70px; margin-bottom:30px;">
                <div class="row row-cols-auto">
                    <div class="col" style="min-width:770px; text-align:left; white-space:pre-line" id="new-comment${detail_id}">${detail_comment}</div>
                    <div class="col put_comment_btn"><button type="button" class="btn btn-outline-dark float-right" id="${detail_id}" onclick="putComment(this.id)" data-bs-toggle="modal" data-bs-target="#Modal1">수정</button></div>
                    <div class="col del_comment_btn"><button type="button" onclick="delete_comment_confirm(${detail_id})" class="btn btn-outline-dark float-right">삭제</button></div>
                </div>
            </div>
        </div>
        <hr>
        `
        $('#detail_comment-box').append(temp_html)

        function OpenModal2(detail_comment) {
            var comment_modal = document.getElementById("new_comment")
            console.log(detail_comment)
            comment_modal.value = detail_comment
        }OpenModal2(detail_comment)

        const PutCommentBtn = document.getElementsByClassName("put_comment_btn")[i] //댓글수정버튼
        const DelCommentBtn = document.getElementsByClassName("del_comment_btn")[i] //댓글삭제버튼

        function ButtonShow2(detail_user_id){
            //로그인 유저==댓글 작성유저
            if(userId==detail_user_id){
                PutCommentBtn.style.visibility = 'visible';
                DelCommentBtn.style.visibility = 'visible';
            }
            else{PutCommentBtn.style.visibility = 'hidden'; DelCommentBtn.style.visibility = 'hidden';}
            if(userId==article_user_id){
                DelCommentBtn.style.visibility = 'visible';
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

    function OpenModal(content) {
        var article_content = document.getElementById("put_content")
        article_content.value = content
      }OpenModal(content)
    


    let temp1_html = `
    <div>
        <div class="articles" style="white-space:pre-line">${content}</div>
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
        <div class="article_user" id="${article_user_id}" onclick="userpagemove(this.id)">${article_user}</div>
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
        Swal.fire({
            title: '댓글 작성 성공!',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}detail.html?id=${code}`);
            }
        })
    } else {
        Swal.fire({
            title: '댓글 작성 실패',
            text: '빈칸은 안됩니다!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                
            }
        })
    }
}


//댓글 수정
num=0
// 유저페이지 가는 기능
function userpagemove(id){
    num=id
    window.location.href=`${frontend_base_url}userpage.html?id=${num}`
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
        Swal.fire({
            title: '댓글 수정 성공!',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.reload()
            }
        })
        OldComment.innerText=NewComment
    } else {
        Swal.fire({
            title: '댓글 창이 비어있습니다!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                
            }
        })
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
    if (response.status == 204){
        Swal.fire({
            title: '댓글 삭제 성공!',
            icon: 'success',
        }).then(result => {
            if(result){
                window.location.reload()
            }
        })
    }
}

function delete_comment_confirm(id){
    Swal.fire({
        title: '댓글 삭제 하시겠습니까?',
        text: '삭제하시면 복구시킬 수 없습니다',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#FFCCCC',
        confirmButtonText: '확인',
        denyButtonColor : '#FFCCCC',
        denyButtonText : '취소'
    }).then(result =>{
        if(result.isConfirmed){
            delete_comment(id)
        } else if(result.isDenied){
            Swal.fire('댓글 삭제 취소!', '댓글 삭제를 취소하셨습니다.' ,'success')
            return false
        }
    })
}


function delete_article_confirm(id){
    Swal.fire({
        title: '게시글을 삭제 하시겠습니까?',
        text: '삭제하시면 복구시킬 수 없습니다',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#FFCCCC',
        confirmButtonText: '확인',
        denyButtonColor : '#FFCCCC',
        denyButtonText : '취소'
    }).then(result =>{
        if(result.isConfirmed){
            delete_article(id)
        } else if(result.isDenied){
            Swal.fire('게시글 삭제 취소!', '게시글 삭제를 취소하셨습니다.' ,'success')
            return false
        }
    })
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
        Swal.fire({
            title: '게시글 삭제 완료!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
            cancelButtonColor : '#FFCCCC',
            cancelButtonText : '취소'
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}userpage.html?id=${userId}`);
            }
        })
    } else {
        alert("게시글 작성자만 삭제 가능합니다.")
    }
}



async function ArticleSave() {
    
    const NewContent = document.getElementById(`put_content`).value
    const private = document.getElementById("is_private")
    const is_private = private.checked;
    document.getElementById('result').innerText = is_private;
    const NewImage = document.getElementById(`put_InputImg`).files[0]

    const formData = new FormData();
    formData.append('content', NewContent);
    formData.append('image', NewImage);
    formData.append('is_private', is_private);

    const response = await fetch(`${backend_base_url}articles/${code}/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: formData
    })
    article_json = await response.json()

    if (response.status == 200) {
        Swal.fire({
            title: '게시글 수정 완료!',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.replace(`${frontend_base_url}detail.html?id=${code}`);
            }
        })
        
    } else {
        alert("게시글 수정 실패")
    }
}
