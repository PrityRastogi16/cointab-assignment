let userId = localStorage.getItem("userId");
let username = localStorage.getItem("username");
let company = localStorage.getItem("company");
const loadingBtn = document.getElementById("loadingg");

let userName = document.getElementById("username");
userName.innerText=username
let CompanyName = document.getElementById("company-name");
CompanyName.innerText=company

let container = document.getElementById("container");

async function fetchData(){
    try {
        loadingBtn.style.display="block";
        let response = await fetch(`http://localhost:2002/post?userId=${userId}`)
        let data = await response.json();
        let posts = data.response;
        container.innerHTML = "";
        let bulkBtn = document.createElement("button")
        bulkBtn.setAttribute("id","bulk-add")
        bulkBtn.innerText="Bulk Add"
        bulkBtn.addEventListener("click",async()=>{
            await addInBulk(posts)
            fetchData();
        })

        let downloadBtn = document.createElement("button")
        downloadBtn.setAttribute("id","excel")
        downloadBtn.innerText="Download in excel"
        
        downloadBtn.addEventListener("click",async ()=>{
            try {
                const response = await fetch(`http://localhost:2002/post/download-excel/${userId}`);
                const blobData = await response.blob();
                const blobURL = window.URL.createObjectURL(blobData);
                const link = document.createElement('a');
                link.href = blobURL;
                link.setAttribute('download', `post_${userId}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }catch(err){
                console.error('Error:', err);
              }
        })
        if(data.hasPosts == false){
        container.append(bulkBtn)
        }
        else{
        container.append(downloadBtn)
        }
        posts.forEach(item =>{
            let cards = createCard(item)
            container.append(cards)
        })

    } catch (error) {
        console.log(error);
    }
    finally{
        loadingBtn.style.display="none";
      }
}
fetchData();
function createCard(item){
    let card = document.createElement("div")
    card.className="card"

    let title = document.createElement("h3")
    title.innerText=`Title: ${item.title}`

    let body = document.createElement("p")
    body.innerText=`Content: ${item.body}`

    card.append(title,body)
    return card;
}

async function addInBulk(posts){
    try {
        let res = await fetch(`http://localhost:2002/post`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(posts)
        })
        let data = await res.json();
        console.log(data);

    } catch (error) {
        console.log(error)
    }
}