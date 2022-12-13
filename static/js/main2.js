const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
const image_url = 'http://127.0.0.1:8000'


function book_list(s_data) {
    const searchParams = new URLSearchParams
    if (s_data.trim().length !==0 ) {
        console.log(s_data)
        searchParams.set("search_content", s_data)
        $('#book_all_list').empty()
    };
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
book_list("")

async function enter(e) {
    if (e.keyCode == 13) {
        let s_data = document.getElementById("box").value;
        return book_list(s_data)
    }
}

function writeArticle(){
    window.location.href = "../templates/post.html"
}

function writeFeed(id){
    window.location.href = `http://127.0.0.1:5500/templates/post2.html?id=${id}`
}
