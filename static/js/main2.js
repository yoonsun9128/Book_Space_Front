function book_list(){
    $.ajax({
        type: 'GET',
        url:`${backend_base_url}articles/`,
        data: {},
        success: function(response) {
            let books = response
            for (let i=0; i < books.length; i++){
                append_temp_html(
                    books[i].book_title,
                    books[i].img_url,
                )
            }
            function append_temp_html(img_url, book_title){
                temp_html = `
                <div class="col">
                    <div class='book'>
                        <img src=${img_url} />
                    </div>   
                    <div class="book-see">${book_title}</div>
                </div>
  
              `
                $('#book_list').append(temp_html)

  
  
            }
          }
        }
    )} book_list()