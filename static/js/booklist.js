
total_book_list = document.querySelector('.total')
search_book_list = document.querySelector('.hidden')
searchButton = document.querySelector('.search-box')



function pagination_book_list(){
    pages = window.location.href
    page = pages.split("=")[1]
    $.ajax({
        type: 'GET',
        url:`${backend_base_url}articles/pagination/?page=${page}`,
        data: {},
        success: function(response) {
            let total_books = response
            let result_books = total_books.results

            for (let i=0; i < result_books.length; i++){
                append_temp_html(
                    result_books[i].book_title,
                    result_books[i].img_url,
                    result_books[i].id,
                    result_books[i].book_content
                )
            }
            function append_temp_html(book_title, img_url, id){
                temp_html = `
                <div class="col">
                    <div class='book'>
                        <img src=${img_url} id="${id}" onclick="writeFeed(this.id)"/>
                    </div>   
                    <div class="book-see">${book_title}</div>
                </div>
              `
                $('#book_list').append(temp_html)
            }

            
          }
        }
    )

} pagination_book_list()


// 검색기능
function book_list(s_data) {
    const searchParams = new URLSearchParams
    cnt = 0
    // 책검색 조금이라도 입력했을때
    if (s_data.trim().length !==0 ) {
        searchParams.set("search_content", s_data)  
        $('#book_all_list').empty()
        $('#pagination-demo').empty()
        cnt = cnt + 1
        temp_html2 = `
        <div class="booklist_txt" style="margin-top: 100px;">
        원하시는 책이 없으신가요?? 그렇다면 버튼을 클릭하여 새로운책을 널리 알려주세요
        </div>

        <button onclick="writeArticle()" class="custom-btn btn-8" style = "margin-bottom:40px"><span>새 글 쓰기</span></button>
        `
        if (cnt >= 1){
            $('#new-button').empty(temp_html2)

        }
        $('#new-button').append(temp_html2)
        // 아예아무것도 검색안했을 때
    } else if (s_data.trim().length == 0){
        cnt = cnt + 1
        temp_html2 = `

        <div class="booklist_txt" style="margin-top: 100px;">
        검색결과가 존재하지 않습니다. 철자가 맞거나 입력이 완료되었는지 확인해주세요
        <br>
        새로운정보는 빠른시일내에 업데이트하겠습니다.  
        </div>
        `
        console.log(cnt)
        if (cnt >= 1){
            $('#new-button').empty(temp_html2)

        }
        $('#new-button').append(temp_html2)
        $('#pagination-demo').empty()
        return pagination_book_list()
        
    } else {

    }
    const BooksData = async () => {
        const response = await fetch(`${backend_base_url}articles/search/?${searchParams.toString()}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    BooksData().then((data) => {
        books = data
        console.log(books)
        for (let i = 0; i < books.length; i++) {
            let book_name = books[i].book_title
            let book_img = books[i].img_url
            let book_id = books[i].id
            let book_content = books[i].book_content

            let temp_html = `
                    <div class="wrapper">
                        <div>
                            <div class='book'>
                                <img src="${book_img}" id="${book_id}" onclick="writeFeed(this.id)">
                            </div>  
                        </div>
                            <div style = "overflow:hidden; word-wrap:break-word; margin-top: 35px; ">
                            <h3 style = "text-align-last:left">${book_name}</h3>
                            <br>
                            <p style = "font-size: 20px; text-align-last:left;">${book_content}</p>
                        </div>
                    </div>
                `
                
            $('#book_all_list').append(temp_html)
        }

    })
}

async function enter(e) {
    if (e.keyCode == 13) {
        let s_data = document.getElementById("box").value;
            total_book_list.style.display = 'none';
            search_book_list.style.display ='flex';
        return book_list(s_data)
    }
}

function writeArticle(){
    window.location.href = "../templates/post.html"
}

function writeFeed(id){
    window.location.href = `http://127.0.0.1:5500/templates/post2.html?id=${id}`
}



