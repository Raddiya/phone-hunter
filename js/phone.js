const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.data));
}

const searchResult = data => {
    // console.log(data);
    const displaySearch = document.getElementById('search-result');
    data.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
                <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h4>${phone.brand}</h4>
                        <h5 class="card-title">${phone.phone_name}</h5>
                        // <p class="card-text">${phone.slug}.</p>
                    </div>
                </div>
                <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary me-md-2" type="button">Detail</button> 
         </div>      
        `;
        displaySearch.appendChild(div);
    })
}
const loadPhoneDetail = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));

}
