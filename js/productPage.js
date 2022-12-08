let getProducto = window.onload = () =>{
    let arr = JSON.parse(sessionStorage.getItem('verProducto'));
    return arr
}
const producto = getProducto();

  //Mostrar producto
  function mostrarProducto(producto){

    document.querySelector('#ppProductTitle').innerHTML = producto.nombre;
    document.querySelector('#ppProductDescription').innerHTML = producto.descripcion;
    document.querySelector('#ppProductPrice').innerHTML = '$ '+`${producto.precio.toLocaleString('es-AR')}`;
    document.querySelector('#ppProductImg').setAttribute('src', producto.img);

    if(producto.cat !== 'accesorios'){
      let selector = document.createElement('select');
      selector.classList.add('p-2');
      selector.setAttribute('name','ppTalleSelector');
      selector.setAttribute('id','ppTalleSelector');
      document.querySelector("#ppTalles").classList.toggle('d-none');
      document.querySelector("#ppTalles").appendChild(selector);

      let talles = producto.talles.split('/');
      for(let t in talles){
        let option = document.createElement('option');
        option.setAttribute('name',talles[t]);
        option.setAttribute('value',talles[t]);
        option.innerHTML = talles[t].toUpperCase();

        selector.add(option);
      }


    }
  }

  mostrarProducto(producto);
  document.querySelector('#backIndex').addEventListener('click', ()=>{
    localStorage.removeItem('verProducto');
    location.href = '../index.html#products';
  });

  const productosCarrito = [];

  class ProductoCarrito {
    constructor(id,nombre,cant,preciou,img,talle,preciot){
        this.id = id;
        this.nombre = nombre;
        this.cant = cant;
        this.preciou = parseFloat(preciou);
        this.preciot = parseFloat(preciou*cant);
        this.img = img;
        this.talle = talle;
    }
  
  
  }

  //Agregar al carrito
  document.querySelector('#btnAddToCart').addEventListener('click',()=>{
    let cantidad = document.querySelector('#amountSelector').value;
    let carrito = localStorage.getItem('carrito');

    //EL CARRITO ESTA VACIO
    if(carrito === null){
      //el producto es un accesorio
      if(producto.cat === 'accesorios'){
        productosCarrito.push(new ProductoCarrito(producto.id,producto.nombre,parseInt(cantidad),producto.precio,producto.img,''));
        localStorage.setItem('carrito', JSON.stringify(productosCarrito));

      }else{
        //el producto es una prenda o calzado
        let talle = document.querySelector('#ppTalleSelector').value;
        productosCarrito.push(new ProductoCarrito(producto.id,producto.nombre,parseInt(cantidad),producto.precio,producto.img,talle));
        localStorage.setItem('carrito', JSON.stringify(productosCarrito));
      }
    //EL CARRITO TIENE ALGO
    }else{
      let arrCart = JSON.parse(carrito);
      // console.log(arrCart);
      if(producto.cat != 'accesorios'){
        let talle = document.querySelector('#ppTalleSelector').value;
      }
      let productoMatch = arrCart.find((prod) => prod.id === producto.id);
      let indexMatch = arrCart.findIndex((prod) => prod.id === producto.id);

      let productMatchedQuant = arrCart.filter(item => item.id == producto.id);
      
      if(productoMatch){
        //El producto esta en el carrito
        if(producto.cat == 'accesorios'){
          arrCart[indexMatch].cant = parseInt(cantidad) + arrCart[indexMatch].cant;
          arrCart[indexMatch].preciot = arrCart[indexMatch].preciou * arrCart[indexMatch].cant;

          localStorage.setItem('carrito',JSON.stringify(arrCart));
        }else{
          let talle = document.querySelector('#ppTalleSelector').value;
          if(productMatchedQuant.length >= 1){
            const sizeIndexFiltered = productMatchedQuant.findIndex((prod) => prod.talle === talle);
            const sizeFiltered = productMatchedQuant.filter((prod) => prod.talle === talle);
            console.log(sizeFiltered)
            if(sizeIndexFiltered != -1){
              const finalProdMatch = arrCart.findIndex((prod) => prod == sizeFiltered[0]);
              console.log(finalProdMatch);
              arrCart[finalProdMatch].cant = parseInt(cantidad) + arrCart[finalProdMatch].cant;
              arrCart[finalProdMatch].preciot = arrCart[finalProdMatch].preciou * arrCart[finalProdMatch].cant
              localStorage.setItem('carrito',JSON.stringify(arrCart));
            }else{
              arrCart.push(new ProductoCarrito(producto.id,producto.nombre,parseInt(cantidad),producto.precio,producto.img,talle));
              localStorage.setItem('carrito',JSON.stringify(arrCart));

            }

          }
        }
        // localStorage.setItem('carrito',JSON.stringify(arrCart));
      }else{
        //El producto no esta en el carrito
        if(producto.cat == 'accesorios'){
          arrCart.push(new ProductoCarrito(producto.id,producto.nombre,parseInt(cantidad),producto.precio,producto.img,''));
        }else{
          talle = document.querySelector('#ppTalleSelector').value;
          arrCart.push(new ProductoCarrito(producto.id,producto.nombre,parseInt(cantidad),producto.precio,producto.img,talle));
        }
        localStorage.setItem('carrito',JSON.stringify(arrCart));
      }
    }
    
    setTimeout(()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        text: 'Usted será redirigido al carrito',
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        setTimeout(()=>{
          location.href = './carrito.html'
        },500);
      })
    },300);
  });

