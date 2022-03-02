const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const errorShow = document.getElementById('error-text')
    errorShow.textContent = ''

    const displaySearch = document.getElementById('search-result');
    displaySearch.textContent = '';

    phoneDetail = document.getElementById('more-details').textContent = ''

    if (searchText == '') {
        errorShow.innerText = "Please full the input box!!";
    }
    else {
        // Clear data
        searchField.value = '';
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => searchResult(data.data));
    }
}

const searchResult = data => {
    const displaySearch = document.getElementById('search-result');
    displaySearch.textContent = '';
    if (data.length === 0) {
        document.getElementById('error-text').innerText = "no data found!!";
    } else {
        data.slice(0, 20).forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="col">
                    <div class="card bg-success p-2 text-white bg-opacity-50">
                        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                        <div class="card-body text-center">
                        <h4>${phone.brand}</h4>
                            <h5 class="card-title text-center">
                            ${phone.phone_name}</h5>
                         </div>
                        <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary  mx-auto w-25" type="button">Detail</button>
                    </div>
                    
             </div>      
            `;
            displaySearch.appendChild(div);
        })
    }


}
const loadPhoneDetail = phoneId => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById("more-details").innerHTML = "";
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));

}
const displayPhoneDetail = phone => {

    const phoneDetail = document.getElementById('more-details');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
   
        <h5 class="card-title">${phone.name}</h5>
        <h4>  Release date:</h4>
        <p class="card-text">${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <h4>  Others:</h4>
            <div class="ms-3 mb-3">
                <p class="mb-0 card-text">  ${phone.others?.GPS ? phone.others.GPS : "no data found"} </p>      
                <p class="mb-0 card-text">  ${phone.others?.USB ? phone.others.USB : "no data found"}</p>
                <p class="mb-0 card-text">  ${phone.others?.Bluetooth ? phone.others.Bluetooth : "no data found"} </p>
                <p class="mb-0 card-text">  ${phone.others?.WLAN ? phone.others.WLAN : "no data found"}</p>
            </div>
        
        <h4> Sensor info:</h4>
        <p class="card-text">${phone.mainFeatures.sensors}</p>
    </div>
    `;
    phoneDetail.appendChild(div);
}
