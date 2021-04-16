import "regenerator-runtime/runtime";

const handleSubmit = async (event) => {
    event.preventDefault();
    let test = require('valid-url');
    let url = document.getElementById('name').value;
    
    if (test.isUri(url)) {
        post("http://localhost:8081/apiurl", { userUrl: url }).then((data) => {
            return Client.viewData(data)
        })

    } else {
        alert('please enter a valid URL and try again');
    }

}


const post = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        
    }


}

export { handleSubmit };