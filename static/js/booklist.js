
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
                    result_books[i].id
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
    if (s_data.trim().length !==0 ) {
        searchParams.set("search_content", s_data)
        console.log(searchParams)
        $('#book_all_list').empty()
    } else if (s_data.trim().length == 0){
        console.log("FD")
        temp_html2 = `
        <button onclick="writeArticle()" class="custom-btn btn-8" ><span>새 글 쓰기</span></button>
        `
        $('#new-button').append(temp_html2)
        $('#pagination-demo').empty()
        return pagination_book_list()
        
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
        for (let i = 0; i < books.length; i++) {
            let book_name = books[i].book_title
            let book_img = books[i].img_url
            let book_id = books[i].id

            let temp_html = `
                <div class="col">
                    <div class='book'>
                        <img src="${book_img}" id="${book_id}" onclick="writeFeed(this.id)">
                    </div>
                    <div class="book-see">${book_name}</div>
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
            search_book_list.style.display = 'flex';
        return book_list(s_data)
    }
}

function writeArticle(){
    window.location.href = "../templates/post.html"
}

function writeFeed(id){
    window.location.href = `http://127.0.0.1:5500/templates/post2.html?id=${id}`
}



