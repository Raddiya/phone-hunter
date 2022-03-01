const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Clear data
    searchField.value = '';

    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.data));
}

const searchResult = data => {
    // console.log(data);
    const displaySearch = document.getElementById('search-result');
    displaySearch.textContent = '';
    // if () {

    // }
    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
                <div class="card bg-success p-2 text-white bg-opacity-75">
                    <img src="${phone.image}" class="card-img-top img-fluid " alt="...">
                    <div class="card-body back">
                    <h4>${phone.brand}</h4>
                        <h5 class="card-title">${phone.phone_name}</h5>
                     </div>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary text-center me-md-2 w-25" type="button">Detail</button>
                </div>
                
         </div>      
        `;
        displaySearch.appendChild(div);
    })
}
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));

}
const displayPhoneDetail = phone => {
    // console.log(phone);
    const phoneDetail = document.getElementById('more-details');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
   
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">Release date:${phone.releaseDate ? phone.releaseDate : ''}</p>
        <p class="card-text">Others:${phone.others.GPS} ${phone.others.USB}</p>
        <p class="card-text">Mainfeatures:${phone.mainFeatures.sensors}</p>
    </div>
    `;
    phoneDetail.appendChild(div);
}
