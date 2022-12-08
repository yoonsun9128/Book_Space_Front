const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
const image_url = 'http://127.0.0.1:8000'

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

            let temp_html = `
            <div class="col-md-4"> 
                <div class="card"> 
                    <div class="card-img-top image-card image-card-1"> 
                        <img src="${image_url}${image}" alt="..."> 
                    </div>
                    <div class = "btns">
                        <Button onclick = "Toggle(${id})"class = "btn" id="${id}" ><i class="fa-solid fa-heart"></i></Button>
                    </div>
                    <div class="card-body"> 
                        <span class="text-uppercase text-danger fw-bold fs-6">${title}</span>
                        <h6 class="card-title text-dark mt-2">${username}</h6> 
                        <p class="card-text">${content}</p> 
                        <a href="#" class="text-dark">Read full story...</a> 
                        <div class="mt-4 about d-flex justify-content-between align-items-center"> 
                        </div> 
                    </div> 
                </div>
            </div>
            `
            $('#image-box').append(temp_html)
        }
    })
}

$('.like').click(function(){
    var pk = $(this).attr('name') // 클릭한 요소의 attribute 중 name의 값을 가져온다.
    $.ajax({
        url: "{% url 'pledge:pledge_like' pledge.pk %}", // 통신할 url을 지정한다.
        data: {'csrfmiddlewaretoken': '{{ csrf_token }}'}, // 서버로 데이터를 전송할 때 이 옵션을 사용한다.
        dataType: "json", // 서버측에서 전송한 데이터를 어떤 형식의 데이터로서 해석할 것인가를 지정한다. 없으면 알아서 판단한다.
  
        success: function(response){
          // 요청이 성공했을 경우 좋아요/싫어요 개수 레이블 업데이트
          $('#like_count'+ pk).html("count : "+ response.like_count);
          $('#dislike_count'+ pk).html("count : "+ response.dislike_count);
        },
        error:function(error){
          // 요청이 실패했을 경우
          alert(error)
        }
    });
  })


