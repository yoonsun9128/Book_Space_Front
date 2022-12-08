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
              )
          }
          function append_temp_html(img_url, book_link){
              temp_html = `
                    <img src="${img_url}" onclick="location.href='${book_link}'">

            `
              $('#card').append(temp_html)
              $('#card-left').append(temp_html)
              $('#card2').append(temp_html)


          }
        }
      }
  )} total_booklist()


function user_booklist(){
  $.ajax({
      type: 'GET',
      url:`${backend_base_url}articles/user/`,
      data: {},
      success: function(response) {
          let books = response
          for (let i=0; i < books.length; i++){
              append_temp_html(
                  books[i].img_url,
                  books[i].book_link,
              )
          }
          function append_temp_html(img_url, book_link){
              temp_html = `
                    <img src="${img_url}" onclick="location.href='${book_link}'">

            `
              $('#card').append(temp_html)
              $('#card-left').append(temp_html)
              $('#card2').append(temp_html)


          }
        }
      }
  )} user_booklist()
