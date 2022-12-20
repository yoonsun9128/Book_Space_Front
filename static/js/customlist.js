 function changeValue(){
    var A=document.getElementById("changeTest").value;

    function show_customlist(){
        $('#customlist').empty()
        $('#booklist-main').empty()
        $.ajax({
            type: 'GET',
            url:`${backend_base_url}articles/recommend/?genre_list=${A}`,
            data: {},
            success: function(response) {
                let books = response
                console.log(books)
                for (let i=0; i < books.length; i++){
                    append_temp_html(
                        books[i].id,
                        books[i].img_url,
                        books[i].book_title,
                        books[i].book_content,
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
        )
    }
    show_customlist()
}
changeValue();



var select_books = [];
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
    const response = await fetch(`${backend_base_url}users/user-choice/`, {
            method: 'POST',
            header: {
                'Content-type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify(select_books)
            
        })
        response_json = await response.json()
        if(response.status == 200){
            alert("andoianwidanwiodanwd")
        }else{
            alert("실패")
        }
    }



// console.log(genre)
// var selectBox = function(value){
//     console.log(value)
// }

