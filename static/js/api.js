// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'
const login_email = localStorage.getItem("user");
const user_email = document.getElementById("user_email")
const logoutButton = document.querySelector(".logout")
const loginButton = document.getElementById("btn1")
const navloginButton = document.getElementById("login-button")
const feedButton = document.getElementById("feed-button")
const postButton = document.getElementById("post-button")
const recommendButton = document.getElementById("recommend-button")

const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');
const icons = document.querySelector('.navbar__icons');

const customBook = document.getElementById("recom_book")
const beforeLogin = document.querySelector(".before-login")
toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active')
  icons.classList.toggle('active')
})


window.onload = function navbar(){
    $("#div_load_image").hide();
    // 로그인 된 상태
    if(localStorage.hasOwnProperty("user") === true){
        user_email.innerText = login_email
        logoutButton.style.display = 'block';
        navloginButton.style.display = 'none';
        user_email.style.display = 'block';
        feedButton.style.display = 'block';
        postButton.style.display = 'block';
        recommendButton.style.display = 'block';



    }
    //로그아웃 된 상태
    if(localStorage.hasOwnProperty("user") === false){
        logoutButton.style.display = 'none';
        navloginButton.style.display = 'block';
        user_email.style.display = 'none';
        feedButton.style.display = 'none';
        postButton.style.display = 'none';
        recommendButton.style.display = 'none';


    }
}
navloginButton.onclick = () => {
    window.scrollTo({ top: 0, behavior:"smooth"});
}


// # userpage로 가는 함수//
function gotoUserpage(){
    var user_id = localStorage.getItem("pk")
    window.location.href = `../templates/userpage.html?id=${user_id}`
}

// # 회원가입 //
async function handleSignup(){
    const SignupData = {
        username : document.getElementById("username").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
        passwordcheck : document.getElementById("passwordcheck").value,
    }
    var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    var reg = /^(?=.*\d)(?=.*[a-z])[\da-zA-Z!@#]{8,}$/

    if(SignupData.email == ""){
        Swal.fire({
            title: '이메일을 작성해주세요!',
            text: '이메일칸이 비어있습니다.',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }

    if(!regExp.test(SignupData.email)){
        Swal.fire({
            title: '이메일칸을 확인해주세요!',
            text: '이메일 형식을 다시 확인해주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
    if ((SignupData.email).split('.')[1] != "com"){
        Swal.fire({
            title: 'com만지원합니다',
            text: '이메일 구성을 다시 확인해주세요!',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
    }

    if(SignupData.username == ""){
        Swal.fire({
            title: '유저네임을 작성해주세요!',
            text: '유저네임칸이 비어있습니다.',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
    if(SignupData.password == ""){
        Swal.fire({
            title: '비밀번호를 입력해주세요!',
            text: '비밀번호칸이 비어있습니다.',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
    if(!reg.test(SignupData.password)){
        Swal.fire({
            title: '비밀번호를 확인해주세요!',
            text: '문자,영어를 포함해서 8자리 이상 작성해주세요',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
    if(SignupData.passwordcheck == ""){
        Swal.fire({
            title: '비밀번호check를 입력해주세요!',
            text: '비밀번호check칸이 비어있습니다.',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
    if(SignupData.password !== SignupData.passwordcheck){
        Swal.fire({
            title: '비밀번호와 비밀번호check가 다릅니다!',
            text: '비밀번호를 확인해주세요',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
    $("#div_load_image").show();
    const response = await fetch(`${backend_base_url}users/signup/`, {
        headers:{
            Accept: "application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body: JSON.stringify(SignupData)
    })

    response_json = await response.json()
    if (response.status == 201) {
        $("#div_load_image").hide();
        Swal.fire({
            title: '이메일이 전송되었습니다!',
            text: '이메일을 확인해주세요',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        signup.style.display = 'none';
        login.style.display = 'flex';
    } else{
        $("#div_load_image").hide();
        Swal.fire({
            title: '인증받을 수 없는 이메일 입니다',
            text: '이메일을 확인해주세요',
            icon: 'warnings',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
    }
    if ("email" in response_json) {
        $("#div_load_image").hide();
        Swal.fire({
            title: '이메일이 중복됩니다.',
            text: '다른 유저 이메일과 동일합니다. 다시 확인해주세요.',
            icon: 'warnings',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
    if ("username" in response_json) {
        $("#div_load_image").hide();
        Swal.fire({
            title: '유저네임 중복됩니다.',
            text: '다른 유저와 유저네임이 동일합니다. 다시 확인해주세요.',
            icon: 'warnings',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){

            }
        })
        return false;
    }
}
// # 로그인 //
async function handleLogin(){
    const LoginData = {
        email : document.getElementById("email1").value,
        password : document.getElementById("password1").value
    }
    const response = await fetch(`${backend_base_url}users/api/token/`, {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify(LoginData)
    })

    response_json = await response.json()
    user = response_json.user
    if (response.status == 200) {
        Swal.fire({
            title: '로그인되었습니다!',
            text: '환영합니다',
            icon: 'success',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.href = `${frontend_base_url}main.html`
            }
        })
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(
            function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    user_login_email = jsonPayload.split(',')[5]
    user_login_email = user_login_email.substring(9)
    user_login_email = user_login_email.replace('"','')

    user_login_pk = jsonPayload.split(',')[4]
    user_login_pk = user_login_pk.substring(10)
    localStorage.setItem("payload", jsonPayload);
    localStorage.setItem("user", user_login_email)
    localStorage.setItem("pk", user_login_pk)


}
if (response_json['non_field_errors']== "이메일이 존재하지 않습니다."){
    Swal.fire({
        title: '이메일이 존재하지 않습니다.',
        text: '회원가입을 해주세요.',
        icon: 'warning',
        confirmButtonColor: '#FFCCCC',
        confirmButtonText: '확인',
    }).then(result =>{
        if(result.isConfirmed){

        }
    })
    return false;
}
if (response_json['non_field_errors']== "이메일 인증이 필요합니다."){
    Swal.fire({
        title: '이메일 인증이 필요합니다.',
        text: '이메일을 확인해주세요.',
        icon: 'warning',
        confirmButtonColor: '#FFCCCC',
        confirmButtonText: '확인',
    }).then(result =>{
        if(result.isConfirmed){

        }
    })
    return false;
}
if (response_json['non_field_errors']== "비밀번호가 틀렸습니다."){
    Swal.fire({
        title: '비밀번호가 틀렸습니다.',
        text: '비밀번호를 다시 확인해주세요.',
        icon: 'warning',
        confirmButtonColor: '#FFCCCC',
        confirmButtonText: '확인',
    }).then(result =>{
        if(result.isConfirmed){

        }
    })
    return false;
}

}

// 토큰 완료 자동 로그아웃//
async function timeOut() {
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload.exp <(Date.now()/1000)){
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("payload")
        localStorage.removeItem("user")
        localStorage.removeItem("pk")
        Swal.fire({
            title: '토큰세션이 만료되었습니다!',
            text: '다시로그인 해주세요',
            icon: 'warning',
            confirmButtonColor: '#FFCCCC',
            confirmButtonText: '확인',
        }).then(result =>{
            if(result.isConfirmed){
                window.location.href = "../templates/main.html"
            }
        })
    };
}timeOut()



//#로그아웃//
async function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    localStorage.removeItem("user")
    localStorage.removeItem("pk")

    Swal.fire({
        title: '로그아웃 되었습니다!',
        text: '또 찾아와주세요',
        icon: 'warning',
        confirmButtonColor: '#FFCCCC',
        confirmButtonText: '확인',
    }).then(result =>{
        if(result.isConfirmed){
            window.location.href = "../templates/main.html"
        }
    })
}


function parseJwt(token) {
    var base64Url = localStorage.getItem("access").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
        function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
};



