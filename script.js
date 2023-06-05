const productList = document.getElementById('product_list');
const linkCoffee = document.getElementById('coffee-link');
const linkSusu = document.getElementById('susu-link');
const linkSnack = document.getElementById('snack-link');
const linkBeranda = document.getElementById('beranda-link');

function getDataProduct() {
    return new Promise((resolve, reject) => {
        fetch('product.json')
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    reject('Data gagal di muat... :(');
                }
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

linkCoffee.addEventListener('click', event => clickHendler(event));
linkSusu.addEventListener('click', event => clickHendler(event));
linkSnack.addEventListener('click', event => clickHendler(event));
linkBeranda.addEventListener('click', event => clickHendler(event));
beliBtn.addEventListener('click', event => btnBeli(event));

(function () {
    clickHendler(null);
})();

function clickHendler(event) {
    getDataProduct()
        .then(data => {
            listProduct(data);
        })
        .then(data => {
            if (event.target.id === 'coffee-link') {
                filterProduct('coffee');
            } else if (event.target.id === 'susu-link') {
                filterProduct('susu');
            } else if (event.target.id === 'snack-link') {
                filterProduct('snack');
            } else if (event.target.id === 'keranjang-link') {
                addToCart(data);
            }

            function filterProduct(value) {
                const card = data[value].map(item => {
                    return `<div class="col-md-auto mb-4">
                                <div class="card" style="width: 18rem">
                                    <img
                                        height="200px"
                                        style="object-fit: cover;"
                                        src="${item.img}"
                                        class="card-img-top"
                                    />
                                    <div class="card-body">
                                        <h5 class="card-title">${item.nama}</h5>
                                        <p class="card-text">
                                            ${item.desc}
                                        </p>
                                        <div class="d-flex justify-content-between align-content-center align-item-center text-center">
                                            <span>
                                                <b>Rp.${item.harga}</b>
                                            </span>
                                            <a  id='${item.id}' href="#" class="beliBtn btn btn-primary">
                                                Beli
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                });
                productList.innerHTML = card.join('');
            }
        })
        .catch(error => console.log(error));
}

function listProduct(data) {
    const card = Object.keys(data).map(key => {
        return data[key].map(item => {
            return `<div class="col-md-auto mb-4">
                                <div class="card" style="width: 18rem">
                                    <img
                                        height="200px"
                                        style="object-fit: cover;"
                                        src="${item.img}"
                                        class="card-img-top"
                                    />
                                    <div class="card-body">
                                        <h5 class="card-title">${item.nama}</h5>
                                        <p class="card-text">
                                            ${item.desc}
                                        </p>
                                        <div class="d-flex justify-content-between align-content-center align-item-center text-center">
                                            <span>
                                                <b>Rp.${item.harga}</b>
                                            </span>
                                            <a  id='${item.id}' href="#" class="beliBtn btn btn-primary">
                                                Beli
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        });
    });
    productList.innerHTML = card.join('');
}
