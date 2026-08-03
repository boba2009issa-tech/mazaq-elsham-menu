// ======================
// Categories Page
// ======================

const categories = document.querySelectorAll(".category");

if (categories.length > 0) {
    categories.forEach((category) => {
        category.addEventListener("click", (e) => {
            e.preventDefault();

            const id = category.dataset.id;

            window.location.href = `meals.html?id=${id}`;
        });
    });
}

// ======================
// Meals Page
// ======================

const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");

async function showMenu() {
    try {
        const response = await fetch("./menu.json");
        const menu = await response.json();

        const category = menu.categories.find(
            (cat) => cat.id === categoryId
        );

        if (!category) {
            console.log("Category Not Found");
            return;
        }

        const container = document.getElementById("meals-container");
        const title = document.getElementById("name");

        if (!container || !title) return;

        // اسم القسم
        title.textContent = category.name;

        // تفريغ المحتوى القديم
        container.innerHTML = "";

        // عرض الأصناف
        category.items.forEach((meal) => {

    let prices = "";

    if (meal.sizes) {
        prices = `
            <span>صغير ${meal.sizes.small ?? "-"} جنيه</span>
            <span>وسط ${meal.sizes.medium ?? "-"} جنيه</span>
            <span>كبير ${meal.sizes.large ?? "-"} جنيه</span>
        `;
    } else {
        prices = `
            <span class="mx-auto">
                ${meal.price} جنيه
            </span>
        `;
    }

    container.innerHTML += `
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">

            <img
                src="${meal.image}"
                alt="${meal.name}"
                loading="lazy"
                class="w-full h-56 object-cover"
            >

            <div class="p-4">

                <h3 class="text-xl font-bold text-center mb-4">
                    ${meal.name}
                </h3>

                <div class="flex justify-between text-red-600 font-bold">
                    ${prices}
                </div>

            </div>

        </div>
    `;
});

    } catch (error) {
        console.error(error);
    }
}

if (categoryId) {
    showMenu();
}