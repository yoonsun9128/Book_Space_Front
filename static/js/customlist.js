// var selectOption = document.getElementById("changeTest");
// selectOption = selectOption.options[selectOption.selectedIndex].value;
// // var yu= $("changeTest option:selected").val();
// console.log(selectOption)
// gnere_list = $("select[name=job]").val()
// kkk = `?genre_list=${gnere_list}`
// var a = 10
// console.log(a)
// let Genre_list = []
// $("select[name=job]").change(function(){
//     genre = $(this).val()
//     Genre_list.push(genre)
//     const R = Genre_list.at(-1);
//     console.log(R)
//     kkk = `?genre_list=${R}`
//     console.log(Genre_list)
// }); 
// console.log(R)
// E = $("#changeTest option:selected").val();
// console.log(E)

// Q = $("#changeTest option:checked").text();
// console.log(Q)





// <select name="job" id = "changeTest" onChange="getselect()">
//     <option value="전체">전체</option>
//     <option value="어린이">어린이</option>
//     <option value="교육">교육</option>
//     <option value="자격증시험">자격증시험</option>
//     <option value="자기계발">자기계발</option>
//     <option value="기타">기타</option>
// </select>   

function changeValue(){
    var A=document.getElementById("changeTest").value;
    console.log(A)

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

// });



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
        if(select_books == 0){
            alert("적어도 하나의 책을 선택해주세요")
            
        }else{
            alert("메인페이지로 이동합니다")
            window.location.href="../templates/main.html"
        }
        
        
    }



// console.log(genre)
// var selectBox = function(value){
//     console.log(value)
// }

