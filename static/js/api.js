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

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active')
  icons.classList.toggle('active')
})

window.onload = function navbar(){
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

// function isAuthenticated() {
//     const token = localStorage.getItem('access');
//     const refreshToken = localStorage.getItem('refresh');
//     try {
//       decode(token);
//       const { exp } = decode(refreshToken);
//       if (Date.now() >= exp * 1000) {
//         logout()
//         return false;
//       }
//     } catch (err) {
//       return false;
//     }
//     return true;
//   }


// # userpage로 가는 함수//
const a = localStorage.getItem("payload").split(',')[4];
const user_id = a[10];
function gotoUserpage(){
    window.location.href = `../templates/userpage.html?id=${user_id}`
}


// # 회원가입 //
async function handleSignup(){
    const SignupData = {
        username : document.getElementById("username").value,
        email : document.getElementById("email").value,
        password1 : document.getElementById("password").value,
        password2 : document.getElementById("passwordcheck").value,
    }
    if(SignupData.email == ""){
        alert("이메일을 입력해주세요")
        return false;
    }
    if(SignupData.username == ""){
        alert("닉네임을 입력해주세요")
        return false;
    }
    if(SignupData.password1 == ""){
        alert("비밀번호를 입력해주세요")
        return false;
    }else if(SignupData.password1.length < 8){
        alert("비밀번호를 8자 이상, 문자,숫자를 포함해주세요")
    }
    if(SignupData.password2 == ""){
        alert("비밀번호 확인을 입력해주세요")
        return false;
    }
    if(SignupData.password1 !== SignupData.password2){
        alert("비밀번호가 다릅니다. 확인해주세요")
        return false;
    }

    const response = await fetch(`${backend_base_url}users/dj-rest-auth/registration/`, {
        headers:{
            Accept: "application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body: JSON.stringify(SignupData)
    })

    response_json = await response.json()
    if (response.status == 201) {
        alert("이메일이 전송되었습니다. 확인해주세요.")
        signup.style.display = 'none';
        login.style.display = 'flex';

    }else{
        alert("다시한번 확인해주세요")
    }

}
// # 로그인 //
async function handleLogin(){
    const LoginData = {
        email : document.getElementById("email1").value,
        password : document.getElementById("password1").value
    }
    const response = await fetch(`${backend_base_url}users/dj-rest-auth/login/`, {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify(LoginData)
    })

    response_json = await response.json()
    user = response_json.user
    if (response.status == 200) {
        alert("로그인 되었습니다.")
        localStorage.setItem("access", response_json.access_token);
        localStorage.setItem("refresh", response_json.refresh_token);

        const base64Url = response_json.access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(
            function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    localStorage.setItem("payload", jsonPayload);
    localStorage.setItem("user", response_json.user.email)
    localStorage.setItem("pk", response_json.user.pk)

    window.onload()

} else {
    alert("잘못된 로그인입니다.", response.status)
}

}

// 토큰 완료 자동 로그아웃//
window.onload = () =>{
    const payload = JSON.parse(localStorage.getItem("payload"));
    console.log(payload.exp)
    console.log(Date.now()/1000)
    if (payload.exp <(Date.now()/1000)){
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("payload")
        localStorage.removeItem("user")
        alert("사용시간이 완료되 로그아웃 되었습니다.")
        window.location.href = "../templates/main.html"
    };
};



//#로그아웃//
async function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    localStorage.removeItem("user")

    alert("로그아웃 되었습니다.")

    window.location.href = "../templates/main.html"
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


