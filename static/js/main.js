const openButton = document.querySelector('.open');
const container = document.querySelector('.container');
const container1 = document.querySelector('.container1');
const page2Signup = document.querySelector('.page2Signup');
const modal = document.querySelector('.modal');
const contents = document.querySelector('.contents');
const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const modalContainer = document.getElementById('modal-container');
const page2login = document.querySelector('.page2login');


const closeButton = document.querySelectorAll('.close')
for(i=0; i< closeButton.length; i++){
	closeButton[i].addEventListener('click', () => {
    close();
  });
}

// openButton.addEventListener('click', () => {
//   container.style.display = 'flex';
//   login.style.display = 'flex';
//   signup.style.display = 'none';
// });

openButton.addEventListener('click', () => {
  modalContainer.classList.add('container-open');
  login.style.display = 'flex';
  signup.style.display = 'none';
});


page2Signup.addEventListener('click', () => {
  login.style.display = 'none';
  signup.style.display = 'flex';
});
page2login.addEventListener('click', () => {
  login.style.display = 'flex';
  signup.style.display = 'none';
});
container.addEventListener('click', () => {
  close();
});

contents.addEventListener('click', (e) => {
  e.stopPropagation();
});

// function close() {
//   document.getElementById('asdf').reset();
//   container.style.display = 'none';
// }

function close() {
  document.getElementById('asdf').reset();
  modalContainer.classList.remove('container-open');
}


function total_booklist(){
  $.ajax({
      type: 'GET',
      url:`${backend_base_url}articles/`,
      data: {},
      success: function(response) {
          let books = response
          for (let i=0; i < books.length; i++){
              append_temp_html(
                  books[i].img_url,
                  books[i].book_link,
                  i
              )
          }
          function append_temp_html(img_url, book_link, i){
              temp_html = `
                    <img src="${img_url}" onclick="location.href='${book_link}'">

            `
          if ( i % 3 == 0){
            $('#card').append(temp_html)
          } 
          else if(i % 3 == 1){
            $('#card-left').append(temp_html)
          }
          else if(i % 3 == 2){
            $('#card2').append(temp_html)
          }
          }
        }
      }
  )} total_booklist()


function user_booklist(){
  var user_key = localStorage.getItem("pk")
  $.ajax({
      type: 'GET',
      url:`${backend_base_url}articles/user/?user_key=${user_key}`,
      data: {},
      success: function(response) {
          let books = response
          for (let i=0; i <6; i++){
              append_temp_html(
                  books[i].img_url,
                  books[i].book_link,
              )
          }

          function append_temp_html(img_url, book_link){
              temp_html =`
              <img class="list_detail" src = "${img_url}" onclick = "window.location.href = '${book_link}'"></img>
              `
              $('#user_book').append(temp_html)
          }
        }
      }
  )} user_booklist()


function popular_feed(){

  $.ajax({
    type: 'GET',
    url: `${backend_base_url}articles/popular-feed/`,
    data: {},
    success: function(response) {
      let ppfeed = response
      for (let i=0; i < 3; i++){
        append_temp_html(
          i,
          ppfeed[i].username,
          ppfeed[i].title,
          ppfeed[i].likes_count,
          
        )
      }
      function append_temp_html(i, username, title, likes_count){
        temp_html = `
          <div class="user-popular-feeds">
            <div class="num">${i+1}</div>
            <div class="nickname">${username}</div>
            <div class="title">${title}</div>
            <div class="like">${likes_count}</div>
          </div>
        `
        $('#popular-feed-list').append(temp_html)
      }
    }
  })
}popular_feed()

function numberous_book(){
  $.ajax({
    type: 'GET',
    url: `${backend_base_url}users/most-numberous/`,
    data: {},
    success: function(response){
      let numberbook = response
      for (let i=0; i < 3; i++){
        append_temp_html(
          i,
          numberbook[i].username,
          numberbook[i].article_count,
        )
      }
      function append_temp_html(i, username, article_count){
        temp_html = `
        <div class="user-stats-number">
          <div class="num">${i+1}</div>
          <div class="nickname">${username}</div>
          <div class="num-book">${article_count}</div>
        </div>
        `
        $('#numberous-book').append(temp_html)
      }
    }
  })
}numberous_book()

function many_book(){
  $.ajax({
    type: 'GET',
    url: `${backend_base_url}articles/many-book/`,
    data: {},
    success: function(response){
      let manybook = response
      for (let i=0; i < 3; i++){
        append_temp_html(
          i,
          manybook[i].book_title,
          manybook[i].article_count,
        )
      }
      function append_temp_html(i, book_title, article_count){
        temp_html = `
        <div class="user-stats-number">
          <div class="num">${i+1}</div>
          <div class="nickname">${book_title}</div>
          <div class="num-book">${article_count}</div>
        </div>
        `
        $('#many-book').append(temp_html)
      }
    }
  })
}many_book()