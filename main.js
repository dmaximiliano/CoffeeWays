/*-----------   Capturamos elementos del DOM   -----------*/

const slides = document.querySelectorAll('.slide');
const sliderNav = document.querySelectorAll('.sliders-nav li');


/*-----------   Definicion de variables   -----------*/

//trigger para automatizar el slider
const auto = true;
//intervalo de tiempo para la transición en ms
const intervalTime = 4500;
//var para inicializar el intervalo.
let slideInterval;

/* -----------  Funciones  -----------*/

/* Slide Siguiente
 Primero averiguamos la posicion del Slide y navegador activo;
 Luego removemos la clase active de ambos y buscamos sus elementos hermanos siguientes;
 Aplicamos la clase active a dichos elementos; 
 en caso de no haber un elemento hermano siguiente;
 aplicamos la clase activa al primer elemento del slide y del nav
*/ 

const nextSlide = () => {
    const activeSlide = document.querySelector ('.active-slide'); //tomamos la posicion del slide activo
    const activeNav = document.querySelector ('.active-nav'); //tomamos la posicion del nav activo

    activeNav.classList.remove('active-nav');  //eliminamos las clases .active
    activeSlide.classList.remove('active-slide');

    if (activeNav.nextElementSibling && activeSlide.nextElementSibling){  //controlamos si hay elementos hermanos
        activeNav.nextElementSibling.classList.add('active-nav');    //agregamos la clase .active
        activeSlide.nextElementSibling.classList.add('active-slide');
    } else {   //si no hay elementos hermanos                         
        sliderNav[0].classList.add('active-nav'); //colocamos la clase .active al primer elemento
        slides[0].classList.add('active-slide');
    }
}

/*
Slide Automatico
*/
const autoSlide = () => {
    if(auto){
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
}

/*
    Transformamos sliderNav (Object) a un Array para poder utilizar el metodo findInex,
    Capturamos el index del elemento al cual se le esta haciendo click,
    Utilizamos el index para encontrar el slide y nav al cual se quiere llegar,
    Eliminamos la clase .active de los elementos activos,
    Agregamos la clase .active a los elementos de destino del evento,
*/
const sliderNavigation = (e) =>{
        const activeSlide = document.querySelector ('.active-slide'); 
        const activeNav = document.querySelector ('.active-nav');
        const navArray = Array.from(sliderNav);
        const navIndex = navArray.findIndex(click => click === e.target);
        const targetSlide = slides[navIndex];
        const targetNav = sliderNav [navIndex];

        activeNav.classList.remove('active-nav');
        targetNav.classList.add('active-nav');
        activeSlide.classList.remove('active-slide');
        targetSlide.classList.add('active-slide');
}

/*-----------   EVENTOS   -----------*/

// Cuando hago click en un navegador ir a ese Slide 
sliderNav.forEach(item =>{
    item.addEventListener('click', e =>{
        
        sliderNavigation(e);
        autoSlide();
       
    })
}) 

//Bucle automatico
autoSlide();
