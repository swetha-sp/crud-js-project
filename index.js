let orderList = [];
orderContents = document.getElementById("orderOfDetails");

const myOrder = () => {
    const orderDetails = {
        id:`${Date.now()}`,
        fullName1: document.getElementById("fullName").value,
        number1: document.getElementById("number").value,
        address1: document.getElementById("address").value,
        pincode1: document.getElementById("pincode").value
    };

    orderContents.insertAdjacentHTML('beforeend', myOrderContent(orderDetails));

    orderList.push(orderDetails);
    saveStorage();
}

const myOrderContent = ({id,fullName1,number1,address1,pincode1}) => {
 return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
<div  class="card border-dark mb-3">
  <div class="card-header">
      <div class="d-flex justify-content-end">
      <button class="btn btn-light"  name=${id} onclick="deleteMyOrder(this)">
      <i class="fas fa-shopping-cart" name=${id} onclick="deleteMyOrder(this)"></i>
      </button>
      <button class="btn btn-light" name=${id} onclick="editMyOrder(this)">
      <i class="fas fa-pen-alt" name=${id} onclick="editMyOrder(this)"></i>
      </button>
       
        </div>
  </div>
 
  <div class="card-body">
      <h5 class="card-title">${fullName1}</h5>
      <p class="card-text">${number1}</p>
      <p class="card-text">${address1}</p>
      <p class="card-text">${pincode1}</p>
      
  </div>
  <div class="card-footer">
      <button  style="background-color: darkblue; color: white;"class="btn btn-outline-primary float-end btn-sm"  >
      VIEW ORDER
      </button>
  </div>
</div>
</div> `)
}

const saveStorage = () => {
    localStorage.setItem("Orderss",JSON.stringify({items: orderList}));
}

const retreiveStorage = ()  => {
    const  storageCop = JSON.parse(localStorage.getItem("Orderss"));
    if(storageCop){
        orderList=  storageCop["items"];
    }
    orderList.map((orderData) => {
        orderContents.insertAdjacentHTML('beforeend', myOrderContent(orderData));
    })
}

const deleteMyOrder = (e) => {
    const targetID = e.getAttribute("name");
    orderList= orderList.filter((orderData) => orderData.id!==targetID);
    saveStorage();
    window.location.reload();
}

const editMyOrder = (e) => {
    const targetID = e.getAttribute("name");

   
    e.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[3].childNodes[3].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[3].childNodes[7].setAttribute("contenteditable", "true")

    
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("onclick", "saveMyOrder(this)")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML = "SAVE CHANGES"
   
}

const saveMyOrder = (e) => {
    const targetID = e.getAttribute("name");
    const orderDetails = {
        id: e.parentNode.parentNode.parentNode.getAttribute("id"),
        fullName1: e.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML,
        number1: e.parentNode.parentNode.childNodes[3].childNodes[3].innerHTML,
        address1: e.parentNode.parentNode.childNodes[3].childNodes[5].innerHTML,
        pincode1: e.parentNode.parentNode.childNodes[3].childNodes[7].innerHTML
    };
    const refid = e.parentNode.parentNode.parentNode.getAttribute("id")
    console.log(refid)
    objIndex = orderList.findIndex((obj => obj.id == refid ));
    console.log(objIndex)
    orderList[objIndex] = orderDetails;
    
    saveStorage();
    window.location.reload();
    
}





