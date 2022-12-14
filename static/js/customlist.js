function show_customlist(){
    $.ajax({
        type: 'GET',
        url:`${backend_base_url}articles/recommend`,
        data: {},
        success: function(response) {
            let books = response
            for (let i=0; i < books.length; i++){
                append_temp_html(
                    books[i].id,
                    books[i].img_url,
                    books[i].book_title,
                    books[i].book_content
                )
            }
            function append_temp_html(id, img_url, book_title, book_content){
                temp_html = `
                <div class="book-cell">
                    <div class="book-img">
                    <img src="${img_url}" class="book-photo">
                </div>
                <div class="book-content">
                    <div class="book-title">${book_title}</div>
                    <div class="book-sum">${book_content}</div>
                   
                </div>
                <div class="checkbox">
                    <input class="check" type="checkbox" id="${id}"  name="check" onclick=save_id(this.id)>
                </div>
                `
                $('#customlist').append(temp_html)
            }
        }
        
    }
    )}show_customlist()

let select_books = [];
function save_id(id){    
    if($(`input:checkbox[id=${id}]`).is(":checked") == true){
        select_books.push(id)
    }
    else if($(`input:checkbox[id=${id}]`).is(":checked") == false){
        for(let i=1; i< select_books.length; i++){
            if(select_books[i] == id){
                select_books.splice(i, 1);
                i--;
            }
        }
    }
}


async function send_id(){
    const response = await fetch(`${backend_base_url}articles/user/?select_books=${select_books}`, {
            method: 'GET',
            header: {
                'Content-type':'application/json'
            },
        })
        .then(res=> res.json())
        
        alert("메인페이지로 이동합니다")
        window.location.href="../templates/main.html"
    }
