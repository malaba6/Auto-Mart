let home = () => window.open('index.html', '_self');

let viewAll = () => window.open('view_all_vehicles.html', '_self');

let yourAds = () => window.open('your_ads.html', '_self');

let postSaleAd = () => window.open('post_sale_ad.html', '_self');

let updated = () => {
    let price = document.getElementById("update-price").value;
    if (!price) {
        alert("You must provide the price to proceed");
        return;
    }
    alert("Sale Ad successfully Updated");
    window.open('your_ads.html', '_self');
}

let login = () => window.open('login.html', '_self');

let signup = () => window.open('signup.html', '_self');

let loginValidation = () => {
    let form = document.formLogin;
    if (form.email.value == "admin@automart.com") {
        if (form.password.value == "admin") {
            return true;
        } else {
            alert("Password incorrect for admin")
            return false;
        }
    } else {
        open('index.html', '_self');
        return false;
    }
}

let removeAd = () => alert("Add successfully removed");

let flag = () => {
    let reasonVal = document.getElementById('reason').value;
    let descriptionVal = document.getElementById('description').value;

    if (!reasonVal || !descriptionVal) {
        alert("You must provide reason and description");
        return;
    }
    alert("Car successfully flaged");
    open('view_specific_car.html', '_self');
}

let bid = () => {
    let bid = document.getElementById("bid").value;
    if (!bid) {
        alert("You must provide your proposed price");
        return;
    }
    alert("Bid successfully placed");
    open('view_specific_car.html', '_self');
}

let advertise = () => {
    let model = document.getElementById('model').value;
    let manufac = document.getElementById('manufac').value;
    let price = document.getElementById('carPrice').value;

    if (!model || !manufac || !price) {
        alert("Model, Manufacturer or price can't be empty");
        return;
    }
    alert("Sale advertisement successfuly posted");
    open('your_ads.html', '_self');
}

let viewVehicle = () => open('view_specific_car.html', '_self');

let fraud = () => open('flag_fraudulent_ad.html', '_self');

let order = () => open('make_purchase_order.html', '_self');

let updateAd = () => open('update_sale_ad.html', '_self');

let dropdown = () => {
    let items = document.getElementById('vehicle-menu');
    items.style.visibility = 'visible';
    items.style.opacity = '1';
    items.style.display = 'block';
}
let losesFocus = () => {
    let items = document.getElementById('vehicle-menu');
    items.style.visibility = 'invisible';
    items.style.opacity = 0;
    items.style.display = 'none';
}