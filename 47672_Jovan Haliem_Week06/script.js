function initialize(){
    let products = localStorage.getItem("products")
    let discountFlag = false;
    if(products === null){
        fetchData()
        products = localStorage.getItem("products")
    }
    products = JSON.parse(products)

    let displayProducts = products
    let textSearch = document.getElementById('txtSearch')

    textSearch.addEventListener('keyup',function(){
        let searchWord = this.value.toLowerCase()
        displayProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchWord)
            )
            renderAllProduct(displayProducts, discountFlag)
    })

    let cboDiscount = document.getElementById('cboDiscount')
    cboDiscount.addEventListener('change',function(){
        if(this.checked){
            discountFlag = true
        }else{
            discountFlag = false
        }
        renderAllProduct(displayProducts, discountFlag)
    })
    renderAllProduct(products)
}
function fetchData(){
    let req = new XMLHttpRequest()

    req.onreadystatechange = function(){
        if(req.readyState != 4 || req.status != 200)
            return;
        let data = JSON.parse(req.responseText)
        //menyimpan data dengan access key 'products' di localStorage
        localStorage.setItem("products",req.responseText)
    }
    req.onerror = function(){
        alert(req.responseText)
    }
    req.open('GET','productdata.json', true)
    req.send()
}
function renderAllProduct(products,discountFlag){
    products = JSON.parse(JSON.stringify(products))
    if(discountFlag)
        products.map(product=> {
            product.price *= 0.75
            return product
        })
    document.getElementById('card-container').innerHTML = ''
    products.forEach(product => renderProduct(product))
}
function renderProduct(product){
    const cardContainer = document.getElementById('card-container')
    let card = document.createElement('div')
    const cardClass = document.createAttribute('class')
    cardClass.value = 'card'
    card.setAttributeNode(cardClass)

    let img = document.createElement('img')
    img.src = '/images/'+product.image

    card.appendChild(img)

    let container = document.createElement('div')
    const containerClass = document.createAttribute('class')
    containerClass.value = 'container'
    container.setAttributeNode(containerClass)

    let itemName = document.createElement('h4')
    itemName.appendChild(document.createTextNode(product.name))
    container.appendChild(itemName)

    let itemPrice = document.createElement('p')
    itemPrice.appendChild(document.createTextNode(product.price))

    let itemSeller = document.createElement('p')
    let seller = product.seller.name+"("+product.seller.location+")"
    itemSeller.appendChild(document.createTextNode(seller))

    container.appendChild(itemSeller)

    card.appendChild(container)

    cardContainer.appendChild(card)
}