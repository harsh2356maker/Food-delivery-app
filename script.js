document.addEventListener("DOMContentLoaded", function () {
    db.collection("restaurants").get().then(snapshot => {
        let list = document.getElementById("restaurant-list");
        snapshot.forEach(doc => {
            let data = doc.data();
            let div = document.createElement("div");
            div.innerHTML = `<h2>${data.name}</h2>
                <button onclick="addToCart('${data.menu[0].name}', ${data.menu[0].price})">Add to Cart</button>`;
            list.appendChild(div);
        });
    });
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function placeOrder() {
    let address = document.getElementById("address").value;
    db.collection("orders").add({
        userId: auth.currentUser.uid,
        items: cart,
        address: address,
        status: "Pending"
    }).then(() => {
        alert("Order Placed!");
        localStorage.removeItem("cart");
        window.location.href = "order.html";
    });
}
