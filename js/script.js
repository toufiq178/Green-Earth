

const categoriesContainer = document.getElementById("categories-Container");
const tressContainer = document.getElementById("trees-continer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allTressBtn = document.getElementById("all-tress-btn");

let cart = [];

const showLoading = () => {

    loadingSpinner.classList.remove("hidden");
    tressContainer.innerHTML = ""
}

const hideLoading = () => {
    loadingSpinner.classList.add("hidden")
}


const loadCategories = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();

    displayCategories(data.categories);



}

const displayCategories = (categories) => {



    console.log();

    categories.forEach(cate => {

        const btn = document.createElement("button");
        btn.className = "text-left bg-transparent w-full cursor-pointer padding: 4px 8px; "
        btn.textContent = `${cate.category_name}`
        btn.onclick = () => { setActiveBtn(cate.id, btn) }
        categoriesContainer.append(btn)



    });

}


const setActiveBtn = async (categoryId, btn) => {
    showLoading()

    const allBtns = document.querySelectorAll(" #categories-Container button ,#all-tress-btn");

    allBtns.forEach(btn => {

        btn.classList.remove("active")
    });

    btn.classList.add("active")


    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();

    displayTress(data.plants);
    hideLoading()
}


allTressBtn.addEventListener("click", () => {

    showLoading()
    const allBtns = document.querySelectorAll(" #categories-Container button ,#all-tress-btn");
    allBtns.forEach(btn => {

        btn.classList.remove("active")
    });

    allTressBtn.classList.add("active")

    loadingTress()

    hideLoading()
})








const loadingTress = async () => {

    showLoading()
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    hideLoading()
    displayTress(data.plants);

}

const loadModal = async (id) => {


    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();


    displayModal(data.plants);

    // console.log(data.plants);

}


// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }


const displayTress = (plants) => {




    tressContainer.innerHTML = ""



    plants.forEach(plant => {


        const div = document.createElement("div");
        div.className = `card bg-base-100  border-b-2 shadow-sm ${plant.price > 500 ?  "border-red-500" : "border-text-color-primary"}`
        div.innerHTML = `
                        <figure>
                            <img
                                src="${plant.image}"
                                alt="${plant.name}"
                                title="${plant.name}"
                                class="h-48 w-full object-cover cursor-pointer"
                                onclick="loadModal(${plant.id})"
                            />
                        </figure>
                        <div class="card-body space-y-2">
                            <h2 class="card-title">${plant.name}</h2>
                            <p class="line-clamp-2">${plant.description}</p>
                            
                            <div class="flex justify-between items-center">
                                <div class="badge badge-outline badge-success bg-color-secondary">${plant.category}</div>
                                <h2 class="font-bold text-xl ${plant.price > 500 ?  "text-red-500" : "text-color-primary"}">$${plant.price}</h2>
                            </div>
                            
                            <div class="card-actions justify-end">
                                <button onclick = "addCart(${plant.id} ,'${plant.name}', ${plant.price})" class="btn bg-color-primary text-white w-full rounded-full ">Add to Cart</button>
                            </div>
                        </div>
        
        `

        tressContainer.append(div)
    })


}



// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }


const displayModal = (plant) => {


    const modalContainer = document.getElementById("modal-container");




    modalContainer.innerHTML = `

                <dialog id="my_modal_1" class="modal">
                    <div class="modal-box space-y-3">

                        <h1 class="text-2xl font-bold text-color-primary ">${plant.name}</h1>

                        <div class="rounded-2xl ">
                            <img class= "h-48 w-full object-cover cursor-pointer rounded-2xl" src="${plant.image}" alt="">
                        </div>
                        <p class="font-bold text-gray-700">Category : <span class="active">${plant.category}</span></p>
                        <p class="">${plant.description}</p>

                        <h1 class=" text-2xl font-bold text-color-primary ">$${plant.price}</h1>

                        <div class="modal-action">
                            <button onclick = "addCart(${plant.id} ,${plant.name} , ${plant.price})" class="btn bg-color-primary text-white  rounded-full ">Add to Cart</button>
                            <form method="dialog">
                                
                                <button class="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

    `
    document.getElementById("my_modal_1").showModal()


    console.log(plant.id);

}



function addCart(id, name, price) {

    // console.log(id, name, price);

    const exitItem = cart.find(elem => elem.id === id);

    if (exitItem) {

        exitItem.quantity += 1


    } else {

        cart.push({

            id,
            name,
            price,
            quantity: 1
        })
    }




    updateCart();
}







loadingTress()
loadCategories()

function updateCart() {

    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""


    const totalPrice = document.getElementById("totalPrice");
    const empty = document.getElementById("emptyCart");

    console.log(cart.length );
    
    if (cart.length == 0) {
        
        empty.classList.remove("hidden")
        totalPrice.textContent= `$${0}`

        
        return
    }

    empty.classList.add("hidden")


    let total = 0 

    cart.forEach(elem => {

        total += elem.price * elem.quantity
        

        const div = document.createElement("div");
        div.className = "card bg-gray-50 px-5 py-3"
        div.innerHTML = `
               
    
                    <div class=" flex justify-between items-start space-y-2">
                        <div class="space-y-1">
                            <h3 class="text-xl ">${elem.name}</h3>
                            <div >
                                <span> $${elem.price}  x  ${elem.quantity}</span>
                            </div>
                        </div>
                        <button onclick ="removeCart(${elem.id})" class="">X</button>
                    </div>
                    <h1 class="text-right text-xl">$${elem.price * elem.quantity}</h1>
                
        
        `
        cartContainer.append(div)
    });


    totalPrice.textContent = `$${total}`
}



function removeCart(id) {
    
    const filterCart = cart.filter(elem => elem.id != id);
    cart = filterCart;

    
    updateCart()
    
    console.log(cart);
}









