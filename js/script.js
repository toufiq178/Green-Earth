




const loadCategories = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();

    displayCategories(data.categories);

}

const displayCategories = (categories) => {

    const categoriesContainer = document.getElementById("categories-Container");

    console.log();

    categories.forEach(cate => {

        const btn = document.createElement("button");
        btn.className = "text-left bg-transparent w-full"
        btn.textContent = `${cate.category_name}`
        categoriesContainer.append(btn)
    });

}


const loadingTress = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();

    displayTress(data.plants);

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

    console.log(plants);

    const tressContainer = document.getElementById("trees-continer");
    tressContainer.innerHTML = ""


    plants.forEach(plant => {

        const div = document.createElement("div");
        div.className = "card bg-base-100  shadow-sm"
        div.innerHTML = `
                        <figure>
                            <img
                                src="${plant.image}"
                                alt="${plant.name}"
                                title="${plant.name}"
                                class="h-48 w-full object-cover cursor-pointer"
                                
                            />
                        </figure>
                        <div class="card-body space-y-2">
                            <h2 class="card-title">${plant.name}</h2>
                            <p class="line-clamp-2">${plant.description}</p>
                            
                            <div class="flex justify-between items-center">
                                <div class="badge badge-outline badge-success bg-color-secondary">${plant.category}</div>
                                <h2 class="font-bold text-xl text-color-primary">$${plant.price}</h2>
                            </div>
                            
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary w-full rounded-full">Buy Now</button>
                            </div>
                        </div>
        
        `

        tressContainer.append(div)
    })

}



loadingTress()

loadCategories()