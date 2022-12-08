//Mostrar productos en la tabla
const tBody = document.querySelector('#cartTbody');
let arrCart = JSON.parse(localStorage.getItem('carrito'));
function mostrarCarrito(){

    if(localStorage.getItem('carrito') != null && arrCart.length != 0 ){
        tBody.innerHTML = '';
        let subtotalPrice = 0;
        for (let p in arrCart) {
            //Th Product IMG
            let tableRow = document.createElement('tr');
            let cartProdImg = document.createElement('th');
            cartProdImg.innerHTML = `<img class='cart-img' src='${arrCart[p].img}'>`;
            tBody.appendChild(tableRow);
            tableRow.appendChild(cartProdImg);
            //Th Product Name
            let cartProdName = document.createElement('th');
            cartProdName.innerHTML=arrCart[p].nombre;
            tableRow.appendChild(cartProdName);
    
            //Th Product Size
            let cartProdSize = document.createElement('th');
            tableRow.appendChild(cartProdSize);
            cartProdSize.innerHTML = arrCart[p].talle;
            tableRow.appendChild(cartProdSize);
    
            //Th Product Price
            let cartProdPrice = document.createElement('th');
            tableRow.appendChild(cartProdPrice);
            cartProdPrice.innerHTML =`$ ${arrCart[p].preciou.toLocaleString('es-AR')}`;
            tableRow.appendChild(cartProdPrice);
    
            //Th Product Quantity
            let cartProdQuant = document.createElement('th');
            tableRow.appendChild(cartProdQuant);
            cartProdQuant.innerHTML =`
            <button id="less-${arrCart.indexOf(arrCart[p])}" class="btn btn-warning p-1 text-white modifyQuantButton">-1</button>
            <span class="mx-2"> ${arrCart[p].cant} </span>
            <button id="add-${arrCart.indexOf(arrCart[p])}" class="btn btn-warning p-1 text-white modifyQuantButton">+1</button>
            
            `;
            tableRow.appendChild(cartProdQuant);
    
    
            //Subtotal
            let cartProdSubTotal = document.createElement('th');
            cartProdSubTotal.innerHTML = `$ ${arrCart[p].preciot.toLocaleString('es-AR')}`;
            tableRow.appendChild(cartProdSubTotal);
    
            //Eliminar producto
            let cartDeleteProduct = document.createElement('th');
            cartDeleteProduct.innerHTML = `<button id='remove-${arrCart.indexOf(arrCart[p])}' class="btn btn-danger removeItemButton"><i class="fa-solid fa-trash"></i></button>`;
            tableRow.appendChild(cartDeleteProduct);

            //Sub total
            subtotalPrice += arrCart[p].preciot;
        }

        document.querySelector('#cartSubTotal').innerHTML = `$ ${subtotalPrice.toLocaleString('es-AR')}`;
        let iva = subtotalPrice * 0.21;
        document.querySelector('#cartTaxes').innerHTML = `$ ${iva.toLocaleString('es-AR')}`;
        let totalPrice = subtotalPrice + iva;
        document.querySelector('#cartTotal').innerHTML = `$ ${totalPrice.toLocaleString('es-AR')}`;
    
    }else{
        tBody.innerHTML = '';
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td colspan="7"> <p class="text-white text-center mt-3 bg-warning p-2 h5 rounded">🤭 ¡UPS!...No hay articulos para mostrar en el carrito</p> </td>`;
        tBody.appendChild(tableRow);
        
        document.querySelector('#cartSubTotal').innerHTML = '$0';
        document.querySelector('#cartTaxes').innerHTML = '$0';
        document.querySelector('#cartTotal').innerHTML = '$0';
    }
    
}
mostrarCarrito();

//Agregar o Quitar
function updateQuant(){
    document.querySelectorAll(".modifyQuantButton").forEach((button, index) => {
    button.onclick = (event) => {
        let btnId = button.getAttribute('id').toString();
        let btnIdSplit = btnId.split('-');
        let arrCartIndex = btnIdSplit[1];
        if(btnIdSplit[0] === 'add'){
            arrCart[arrCartIndex].cant += 1;
            arrCart[arrCartIndex].preciot = arrCart[arrCartIndex].preciou * arrCart[arrCartIndex].cant;
            localStorage.setItem('carrito',JSON.stringify(arrCart));
            
            mostrarCarrito();
            updateQuant();
        }else{
            if(arrCart[arrCartIndex].cant == '1'){

                let btnId = button.getAttribute('id').toString();
                let btnIdSplit = btnId.split('-');
                let arrCartIndex = btnIdSplit[1];
    
                arrCart.splice(arrCartIndex,1);
                localStorage.setItem('carrito',JSON.stringify(arrCart));
                mostrarCarrito();

                updateQuant();
            }else{
                arrCart[arrCartIndex].cant -= 1;
                arrCart[arrCartIndex].preciot = arrCart[arrCartIndex].preciou * arrCart[arrCartIndex].cant;
                localStorage.setItem('carrito',JSON.stringify(arrCart));
                
                mostrarCarrito();
                updateQuant();
            }
        }
    }
});
}
updateQuant();

//Eliminar producto
function deleteProd(){

    document.querySelectorAll(".removeItemButton").forEach((button, index) => {
        button.onclick = (event) => {

            Swal.fire({
                title: '¿Quitar producto del carrito?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#f0ad4e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quitar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {

                    let btnId = button.getAttribute('id').toString();
                    let btnIdSplit = btnId.split('-');
                    let arrCartIndex = btnIdSplit[1];
        
                    arrCart.splice(arrCartIndex,1);
                    localStorage.setItem('carrito',JSON.stringify(arrCart));
                    mostrarCarrito();

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto eliminado',
                    showConfirmButton: false,
                    timer: 1000
                    });
                }
              });

            deleteProd();
        }
    });
}
deleteProd();

//Finalizar compra
document.querySelector('#shopButton').addEventListener('click', ()=>{
    if(arrCart.length > 0){
        let idPurchase = Math.random().toString(36).slice(2, 12);
        Swal.fire({
            title: '¡Compra realizada con exito!',
            html: `<h3>ID:  ${idPurchase}</h3>`,
            icon: 'success',
            confirmButtonColor: '#f0ad4e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
                arrCart = [];
                localStorage.setItem('carrito',JSON.stringify(arrCart));

                setTimeout(()=>{
                    location.href = '../index.html';
                },100)
            }
          });

    }else{

    }
});