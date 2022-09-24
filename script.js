let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("gallery");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); 
}

let addToCartButtons = document.getElementsByClassName('btn')
let cartContainer = document.getElementsByTagName('tbody')[0]
let quantityFields = document.getElementsByClassName('num')
let delete_buttons = document.getElementsByClassName('remove_btn')


for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', addToCart)
}

let total_price =0;
function addToCart(event){
    console.log('Hello');    
    let itemContainer = document.createElement('tr');
    let btn = event.target
    let box = btn.closest('.box');
    let itemPrice = box.querySelector('.price').innerText;
    let itemImage = box.querySelector('.meal-photo').src;
    let itemName = box.querySelector('h3').innerText;

    itemContainer.innerHTML = `<td class="order_img"><img class="img-circle img_t" src=${itemImage}  alt=""></td>
    <td class="table_d ">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="table_d  item-price"><h3>${itemPrice}</h3></td>
    <td class="table_d"><input type = 'number' class = 'num ' value = '1'></td>
    <td class="table_d  total-price"><h3>${itemPrice}</h3></td>
    <td>  <button class="remove_btn">Remove</button></td>
`
    cartContainer.append(itemContainer)

    total_price += itemPrice;
    console.log(total_price);
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
    }
    grandTotal()
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)
    }
}
function totalCost(event){
    let quantity = event.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]
    price_field_content = price_field.innerText.replace('₹', '')
    total_field.children[0].innerText = '₹' +  quantity.value * price_field_content
    grandTotal()
    if(isNaN(quantity.value)|| quantity.value <= 0){
        quantity.value = 1
    }
}

function grandTotal(){
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for(let i = 0; i < all_total_fields.length; i++){
        all_prices = Number(all_total_fields[i].innerText.replace('₹', ''))
        total+=all_prices
    }
    grand_total.children[0].innerText = "₹"+total
    grand_total.children[0].style.fontWeight = 'bold'
    console.log(total)
}

function removeItem(event){
    console.log("dlt clicked");
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    grandTotal()
}






