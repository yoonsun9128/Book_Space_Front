async function inquiryList() {
    const InquiryData = async () => {
        const response = await fetch(`${backend_base_url}users/inquiry/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    InquiryData().then((data) => {
        inquiry = data
        for (let i = 0; i < inquiry.length; i++) {
            let id = inquiry[i]['id']
            let user = inquiry[i]['user']
            let title = inquiry[i]['title']
            let content = inquiry[i]['content']
            let updated_at = inquiry[i]['updated_at']
            let temp_html = `
                    <div class="item">
                        <div class="num">${id}</div>
                        <div class="tit a" id=${id}>${title}</div>
                        <div class="writer">${user}</div>
                        <div class="date">${updated_at}</div>
                        <div class="view">111</div>
                    </div>
            `
            $('#inquiry-box').append(temp_html)

            let temp_html_detail = `
            <div class="board_detail" id=${id}>
                <div class="board_detail_tit">${title}</div>
                <div class="board_detail_content">${content}</div>
                <div class="board_detail_comment">댓글</div>
            </div>
            `
            $('#inquiry-box-detail').append(temp_html_detail)

            const inquiryTit = document.getElementsByClassName('a')[i]
            const inquiryDetail = document.getElementsByClassName('board_detail')[i]
            inquiryTit.addEventListener('click', () => {
                inquiryDetail.style.display = 'block';

            })

        }
    })
} inquiryList()


// function openInquiry(id){

// }



async function inquiryPost() {
    const messageData = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value
    }
    const response = await fetch(`${backend_base_url}users/inquiry/`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("access"),
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(messageData)
    })
    response_json = response.json();

    if (response.status == 200) {
        alert("문의 완료")
    } else {
        alert("빈칸을 채워주세요", response.status);
    }
}

