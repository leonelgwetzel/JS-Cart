// D O M   E L E M E N T S
const productListContainer = document.getElementById("productListContainer");


//O B J E T O S  Y  V A R I A B L E S   G L O B A L E S
const productos = [];
class Producto {
  constructor(nombre,descripcion,precio,genero,img,cat,talles,id){
      this.id = this.id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = parseFloat(precio);
      this.genero = genero;
      this.img = img;
      this.cat = cat;
      this.talles = talles;
  }

  asignarId(array){
      this.id = array.length;
  }

}



//I N I C I A L I Z A C I O N ,  E V E N T O S  Y  E J E C U C I O N

  //Generos: m-f-u .... Categorias: ropa-accesorios-calzado .... talles (XS/S/M/L/XL/XXL)
  newProd('p1','asd',300,'m','https://cf.shopee.ph/file/679a8045afccb1bfcd0c3571e69f2f96','ropa','S/M');
  newProd('p2','asd',3400,'f','https://cf.shopee.ph/file/679a8045afccb1bfcd0c3571e69f2f96','ropa','s/m/l/xl');
  newProd('REMERON PUPER','DJKKDKD',10000,'u','https://d3ugyf2ht6aenh.cloudfront.net/stores/415/192/products/72fe64ac-717f-43be-bc5f-bfcf205f3e301-5d0cab741515ec87ec16612132125078-480-0.jpeg','ropa','s/l/xl');
  newProd('Nike Airforce 1 Blancas','DJKKDKD',39000,'u','https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f094af40-f82f-4fb9-a246-e031bf6fc411/calzado-air-force-1-07-b19lqD.png','calzado','39/40/41/43');
  newProd('REMERON PUPER','DJKKDKD',10000,'u','https://cf.shopee.ph/file/679a8045afccb1bfcd0c3571e69f2f96','ropa','s/m/l/xl');
  newProd('RELOJ FEM TRAPPER','DJKKDKD',89999,'f','https://http2.mlstatic.com/D_NQ_NP_786349-MLA43436404006_092020-O.webp','accesorios','');

  
  
  //Inicialización de la tienda
  listarProductos(productos);


  //Filtrador por precio
  document.querySelector("#priceFilterButton").addEventListener('click', (e) =>{
    e.preventDefault();
    min = document.querySelector("#minPriceInput").value;
    max = document.querySelector("#maxPriceInput").value;
    filtrarPorPrecio(min,max);
  });

  //Filtrar por genero
  document.querySelector("#genderFilterButton").addEventListener('click', (e)=>{
    e.preventDefault();

  })







// # D E F I N I C I O N   D E  F U N C I O N E S

//Efecto navbar search box
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");
  searchIcon.addEventListener("click", () => {
      searchInput.classList.toggle("d-none");
      searchInput.classList.toggle("scale-in-center");
  });

//Color navbar after scroll
  var navbar = document.getElementById('navbar')
  window.onscroll = function() {
    if (window.pageYOffset > 0) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  }
//Cargar productos
  function newProd(n,d,p,g,img,cat,talles){
    const producto = new Producto(n,d,p,g,img,cat,talles);
    productos.push(producto);
    producto.asignarId(productos);
  }
//Funciones listar
  function listarProductos(array){
    for(let p in array){
      let productCardContainer = document.createElement('div');
        productCardContainer.classList.add('product-card-container', 'col-sm-12', 'col-md-6', 'col-lg-4');
      let productCard = document.createElement('div');
      productCard.classList.add('card', 'product-card', 'd-flex', 'flex-column', 'align-items-center');
        let productImg = document.createElement('img');
          productImg.classList.add('product-card-img');
          productImg.setAttribute('src', `${array[p].img}`);
      let productTitle = document.createElement('h6');
        productTitle.innerHTML = array[p].nombre;
        productTitle.classList.add('product-title','mt-4');
      let productHr = document.createElement('hr');
        productHr.classList.add('w-75','mx-auto','w-75');
      let productRowDivider = document.createElement('div');
        productRowDivider.classList.add('row');
      let productColDivider1 = document.createElement('div');
        productColDivider1.classList.add('col-7','d-flex','flex-row','justify-content-end','my-3');
      let productPrice = document.createElement('span');
        productPrice.classList.add('product-card-price','badge','bg-dark','py-2','px-2');
        productPrice.innerHTML = '$ '+`${array[p].precio.toLocaleString('es-AR')}`;
      let productColDivider2 = document.createElement('div');
        productColDivider2.classList.add('col-5','d-flex','align-items-center','justify-content-end');
        let productAddCartButton = document.createElement('span');
        productAddCartButton.classList.add('product-card-viewProduct');
        productAddCartButton.setAttribute('id',`${array[p].id}`);
      let productAddCartButtonIcon = document.createElement('i');
        productAddCartButtonIcon.classList.add('fa-solid','fa-eye');

      productListContainer.appendChild(productCardContainer);
      productCardContainer.appendChild(productCard);
      productCard.appendChild(productImg);
      productCard.appendChild(productTitle);
      productCard.appendChild(productHr);
      productCard.appendChild(productRowDivider);
      productRowDivider.appendChild(productColDivider1);
        productColDivider1.appendChild(productPrice);
      productRowDivider.appendChild(productColDivider2);
        productColDivider2.appendChild(productAddCartButton);
        productAddCartButton.appendChild(productAddCartButtonIcon);
    }
  }
//Funcion filtrar
  function filtrarProductos(tipo,a,b){
    document.querySelector("#productListContainer").innerHTML = '';
    if(tipo != 'inicio'){
      const productosFiltrados = [];

      if(tipo === 'precio'){

        for (let p in productos){
          let precio = productos[p].precio;
          if(precio >= a && precio <= b){
            productosFiltrados.push(productos[p]);
          }
        }
        listarProductos(productosFiltrados);
      }else{
        if(a == 'm' && b == 'f'){
          listarProductos(productos);
        }else if(a === 'm' && b == 0){
          for(let p in productos){
            if(productos[p].genero === 'm' || productos[p].genero === 'u' ){
              productosFiltrados.push(productos[p]);
            }
          }
          listarProductos(productosFiltrados);
        }else{
          for(let p in productos){
            if(productos[p].genero === 'f' || productos[p].genero === 'u' ){
              productosFiltrados.push(productos[p]);
            }
          }
          listarProductos(productosFiltrados);
        }
        
      }
    }else{
      listarProductos(productos)
    }
    

  }
  //Filtrar por precio
  function filtrarPorPrecio(min,max){

    if(min === ''){
      min = 0;
    }
    if(max === ''){
      for(let p in productos){
        if(productos[p].precio >= max){
          max = productos[p].precio
        }
      }
    }
    console.log(min,max);
    document.querySelector("#productListContainer").innerHTML = '';
    const productosFiltrados = [];
    for (let p in productos){
      let precio = productos[p].precio;
      if(precio >= min && precio <= max){
        productosFiltrados.push(productos[p]);
      }
    }
    listarProductos(productosFiltrados);
    actBtnView();
  }

  //Filtrar por genero
  document.querySelector("#genderFilterButton").addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector("#productListContainer").innerHTML = '';
    const productosFiltrados = [];

    let checkF = document.querySelector('#femaleClothes');
    let checkM = document.querySelector('#maleClothes');
    let checkU = document.querySelector('#unisexClothes');
    let checkA = document.querySelector('#accesories');
    let checkC = document.querySelector('#shoes');

    if(checkA.checked){
      for(let p in productos){
        if(!productosFiltrados.includes(productos[p])){
          if(productos[p].cat === 'accesorios'){
            productosFiltrados.push(productos[p]);
          }
        }
      }
    }

    if(checkC.checked){
      for(let p in productos){
        if(!productosFiltrados.includes(productos[p])){
          if(productos[p].cat === 'calzado'){
            productosFiltrados.push(productos[p]);
          }
        }
      }
    }
    
    if(checkF.checked){
      for(let p in productos){
        if(!productosFiltrados.includes(productos[p])){
          if(productos[p].genero === 'f'){
            productosFiltrados.push(productos[p]);
          }
        }
      }
    }
    if(checkM.checked){
      for(let p in productos){
        if(!productosFiltrados.includes(productos[p])){
          if(productos[p].genero === 'm'){
            productosFiltrados.push(productos[p]);
          }
        }
      }
    }
    if(checkU.checked){
      for(let p in productos){
        if(!productosFiltrados.includes(productos[p])){
          if(productos[p].genero === 'u'){
            productosFiltrados.push(productos[p]);
          }
        }
      }
    }

    if(checkF.checked === false && checkM.checked === false && checkU.checked === false && checkA.checked === false && checkC.checked === false){
      listarProductos(productos);
    }else{
      listarProductos(productosFiltrados);
    }
    actBtnView();
  });

  //Buscar via searchbox
  let searchI = document.querySelector('#searchInput')
  searchI.addEventListener('keydown',()=>{
    document.querySelector("#products").scrollIntoView();
    let productosFiltrados = [];
    for(let p in productos){
      let productoFiltrado = Object.entries(productos[p]);
      let nombreProductoFiltrado = productoFiltrado[1][1].toUpperCase();
      let searchToUpper = searchI.value.toUpperCase();

      if(nombreProductoFiltrado.includes(searchToUpper)){
        productosFiltrados.push(productos[p]);
      }else{
        console.log('no');
      }
    }
    document.querySelector('#productListContainer').innerHTML= '';
    listarProductos(productosFiltrados);
    actBtnView();
  });

  //Navbar buttons 
    //Nuevos
    document.querySelector('#filterByNew').addEventListener('click', ()=>{
      document.querySelector("#products").scrollIntoView();
      productosFiltrados = productos.slice(productos.length-5);

      document.querySelector('#productListContainer').innerHTML = '';
      listarProductos(productosFiltrados);
      actBtnView();
    });
    //Accesorios
    document.querySelector('#filterByAccesories').addEventListener('click', ()=>{
      document.querySelector("#products").scrollIntoView();
      productosFiltrados = [];

      for(let p in productos){
        if(productos[p].cat === 'accesorios'){
          productosFiltrados.push(productos[p]);
        }
      }

      document.querySelector('#productListContainer').innerHTML = '';
      listarProductos(productosFiltrados);
      actBtnView();

    });
    //Masculina . femenina . unisex
    let navbarGenderFilter = (g)=>{
      document.querySelector("#products").scrollIntoView();
      let productosFiltrados = [];
      for(let p in productos){
        if(productos[p].genero == g){
          productosFiltrados.push(productos[p]);
        }
      }
      return productosFiltrados;
    }
    document.querySelector("#filterByMale").addEventListener('click', ()=>{
      let productosFiltrados = navbarGenderFilter('m')
      document.querySelector('#productListContainer').innerHTML = '';
      listarProductos(productosFiltrados);
      actBtnView();
    });
    document.querySelector("#filterByFemale").addEventListener('click', ()=>{
      let productosFiltrados = navbarGenderFilter('f')
      document.querySelector('#productListContainer').innerHTML = '';
      listarProductos(productosFiltrados);
      actBtnView();
    });
    document.querySelector("#filterByUnisex").addEventListener('click', ()=>{
      let productosFiltrados = navbarGenderFilter('u')
      document.querySelector('#productListContainer').innerHTML = '';
      listarProductos(productosFiltrados);
      actBtnView();
    });
  //Volver atras pagina Productos
  document.querySelector('#backIndex').addEventListener('click', ()=>{
    location.reload();
  });
  //Mostrar producto
  function mostrarProducto(producto){
    document.querySelector('#products').classList.toggle('d-none');
    document.querySelector('#specsCards').classList.toggle('d-none');
    document.querySelector('#hero').classList.toggle('d-none');
    document.querySelector("#productPage").classList.toggle('d-none');
    document.querySelector('#ppProductTitle').innerHTML = producto.nombre;
    document.querySelector('#ppProductDescription').innerHTML = producto.descripcion;
    document.querySelector('#ppProductPrice').innerHTML = '$ '+`${producto.precio.toLocaleString('es-AR')}`;
    document.querySelector('#ppProductImg').setAttribute('src', producto.img);

    if(producto.cat !== 'accesorios'){
      let selector = document.createElement('select');
      selector.classList.add('p-2');
      selector.setAttribute('name','ppTalleSelector');
      selector.setAttribute('id','ppTalleSelector');
      document.querySelector("#ppTalles").appendChild(selector);
      let selectOption = document.createElement('option');
      selectOption.innerHTML = 'Seleccione un talle';
      selector.add(selectOption);
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

  function scrollTop(){
    document.getElementsByTagName('body')[0].style.display = "block";
    window.scrollTo(document.body.scrollHeight,0);
  }
//Actualizar botones de vista
function actBtnView(){
  document.querySelectorAll(".product-card-viewProduct").forEach((button, index) => {
    button.onclick = (event) => {
      for(let p in productos){
        if(productos[p].id ==  button.getAttribute('id')){
          mostrarProducto(productos[p]);
          sessionStorage.setItem('verProducto', JSON.stringify(productos[p]));
        }
      }
      scrollTop();
    }
  });
}
actBtnView();
