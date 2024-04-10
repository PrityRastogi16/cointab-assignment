const getBtn = document.getElementById("get-btn");
const loadingBtn = document.getElementById("loadingg");
const container = document.getElementById("container");
// let url = "http://localhost:2002"

getBtn.addEventListener("click", async(req,res)=>{
   try{
    loadingBtn.style.display="block";
    let response = await fetch(`https://cointab-assignment-kko4.onrender.com/user/`);
    container.innerHTML=""
    // container.innerHTML='';
    const data = await response.json();
    displayUser(data);

   }
   catch (error) {
    console.error(error);
}
  finally{
    loadingBtn.style.display="none";
  }
})

function displayUser(users){
    container.innerHTML='';
    users.forEach(user =>{
        const card = document.createElement('div');
        card.classList.add('card');
   
        const title = document.createElement('h2');
        title.textContent = user.name;
        card.appendChild(title);

        const email = document.createElement('p');
        email.textContent = `Email: ${user.email}`;
        card.appendChild(email);

        const phone = document.createElement('p');
        phone.textContent = `Phone: ${user.phone}`;
        card.appendChild(phone);

        const website = document.createElement('p');
        website.textContent = `Website: ${user.website}`;
        card.appendChild(website);

        const city = document.createElement('p');
        city.textContent = `City: ${user.address.city}`;
        card.appendChild(city);

        const company = document.createElement('p');
        company.textContent = `Company: ${user.company.name}`;
        card.appendChild(company);

        const actionBtn = document.createElement('button');
        // actionBtn.classList.add("button")
       actionBtn.textContent = user.isPresent
        if(actionBtn.textContent = user.isPresent){
            actionBtn.textContent = "OPEN"
            actionBtn.classList.add("open-button")
            actionBtn.addEventListener("click",()=>{
                localStorage.setItem("userId",user.id);
                localStorage.setItem("username",user.name);
                localStorage.setItem("company", user.company.name)
                window.location.href="./post/post.html"
            })
        }else{
            actionBtn.textContent = "ADD"
            actionBtn.addEventListener("click",()=>{
                addData(user);
            })
            actionBtn.classList.add("add-button")
        }
        // actionBtn.textContent = user.isPresent ? 'Open' : 'Add';
    
        card.appendChild(actionBtn);

        container.appendChild(card);
    })
}

async function addData(user){
    try{
      let res = await fetch(`https://cointab-assignment-kko4.onrender.com/user/add`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            id: user.id, name: user.name,email: user.email,city: user.address.city,
            phone: user.phone,website: user.website,company: user.company.name,
        })
      })
      let data = await res.json();
      console.log(data);
      let updatedResponse = await fetch(`https://cointab-assignment-kko4.onrender.com/user/`);
      let updatedData = await updatedResponse.json();
      displayUser(updatedData);
    } catch (error) {
    console.log(error);
  }
}