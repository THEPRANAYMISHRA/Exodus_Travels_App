
    const form = document.getElementById("payment_form");
    const successMessage = document.getElementById("success_message");
    const unsuccessMessage = document.getElementById("unsuccess_message");
    const token=localStorage.getItem("token")


    form.addEventListener("submit",async(event)=>{
      event.preventDefault();
      const data=localStorage.getItem("book_this");
      try {
        const res=await fetch("http://127.0.0.1:4500/trip/booking",{
            method:"POST",
            headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
            body:data
            })

        document.querySelector(".loading-layer").style.display="block";
        setTimeout(()=>{
          document.querySelector(".loading-layer").style.display="none";
          successMessage.style.display = "block";
        },2000)
        setTimeout(()=>{
            window.location.href="index.html"
        },5000)
      } catch (error) {
        console.log(error)
        unsuccessMessage.style.display = "block";
      }
      
      form.reset();
    });


// const formEl=document.getElementById("payment_form");

// formEl.addEventListener("submit",async(e)=>{
//     e.preventDefault();
//     let ele=JSON.parse(localStorage.getItem("book_this"));
//     ele["travellers"]=TravellersEl.value;
//         try {
//             let res=await fetch("http://127.0.0.1:4500/trip/booking",{
//                             method:"POST",
//                             headers:{
//                                     "Content-Type":"application/json",
//                                     "Authorization":`Bearer ${token}`
//                                 },
//                             body:JSON.stringify(ele)
//                             })
//                         res=await res.json()
//                         alert(res.msg)
//                         window.location.href="/index.html";
//                     } catch (error) {
//                         console.log(error)
//                     }
//     console.log("hello")
// });

