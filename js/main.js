const linqId = localStorage.getItem('linq');

function checkforid() {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    //check for the id

    let linQid = localStorage.getItem('linq');
    if (linQid == null) {
        for (let i = 0; i < characters.length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
            localStorage.setItem('linq', result)
        }

    } else {
        //create lingid
        console.log('LinqId: ' + linQid)
    }

    //check the page url

    let headLinks = window.location.href
    let validatelink = headLinks.split('?');
    let theParam = validatelink[1];

    //init to send to server

    async function sendLink() {
        let url = `https://corsproxy.io/?https://linq.pxxl.space/redirect.php?link=${theParam}`;
        try {
            let request = await fetch(url);
            if (request.status == 200) {
                let response = await request.text();
                if (response !== 'null') {
                    window.location.href = response;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    sendLink()
}

async function count() {
    let url = 'https://corsproxy.io/?https://linq.pxxl.space';

    try {
        let res = await fetch(url);
        let req = await res.text()
        document.getElementById('thecount').innerHTML = req;
    } catch (error) {
        console.log(error);
    }
}

count()

async function fetchSaveLink() {
    let url =  `https://corsproxy.io/?https://linq.pxxl.space/save.php?linq=${linqId}`;
    try {
        let req = await fetch(url);
        if(req.status === 200) {
            let res = await req.text();
            document.getElementById('thesavelink').innerHTML = res;
        }
    } catch (error) {
        console.log(error)
    }
}

fetchSaveLink()
function showside() {
    let saveLink = document.getElementById('saveid');
    if (saveLink.style.display === "none") {
        saveLink.style.display = "block"
    } else {
        saveLink.style.display = "none"
    }
}


function linqBuild() {
    let linkName = document.getElementById("Name").value;
    let defaultLink = document.getElementById('defaultURL').value

    //validate the form

    let err = document.getElementById('error');


    try {
        if (linkName == '' && defaultLink == '') { throw 'an error has occur, try checking the input' }
        if( linkName == '') {throw 'link name cannot be blank'}
        let pattern = /\s/;
        if(defaultLink == 'https://') {throw 'provide a link'}
        if (linkName.match(pattern)) { throw "don't include space in the new link" }
        //init the function that send's the data to the endpoint
        document.getElementById('turn').style.display = 'block'
        function sendDataToBe() {
            async function sendRes() {
                let url = `https://corsproxy.io/?https://linq.pxxl.space/process.php?sessionid=${linqId}&default=${defaultLink}&linkName=${linkName}`;
                let option = {
                    method: 'GET'
                }
                try {
                    let res = await fetch(url, option)
                    if (res.status == 200) {
                        let req = await res.text()
                        let build = JSON.parse(req)
                        err.innerHTML = build.link
                        err.classList.add('done')
                        document.getElementById('turn').style.display = 'none'
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            sendRes()
        }

        sendDataToBe()
    } catch (error) {
        err.innerHTML = error
        console.log(error)
    }
}

function copy() {
    let word = document.getElementById('error').innerHTML;
    console.log(word)
    navigator.clipboard.writeText(word);
    console.log('text has been writing')
    document.getElementById('clip').innerHTML = 'copied ';
}

async function updates() {
    let url = 'https://corsproxy.io/?https://linq.pxxl.space/update.php';

    try {
        let res = await fetch(url);
        let req = await res.text()
        document.getElementById('theupdate').innerHTML = req;
    } catch (error) {
        console.log(error)
    }
}

updates()
