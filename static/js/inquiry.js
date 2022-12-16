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
            console.log(inquiry)
            let temp_html = `

                    <div class="item">
                        <div class="num">${id}</div>
                        <div class="tit"><a href="#"></a>${title}</div>
                        <div class="writer">${user}</div>
                        <div class="date">${updated_at}</div>
                        <div class="view">111</div>
                    </div>
            `
            $('#inquiry-box').append(temp_html)
        }
    })
} inquiryList()

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

    } else {
        alert("빈칸을 채워주세요", response.status);
    }
}
