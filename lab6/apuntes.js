//DOM
//Document Object Manager

document.getElementById("id");



boton.onclick = () => {
    console.log("click");
}


//span es de línea
//div es de bloque

const poner_imagen = () => {
    const span_imagen = document.getElementById("id_imagen");
    span_imagen.innerHTML = `<img alt='logo google' 
                            src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
                            >`;
};

boton.onclick = () => {
    poner_imagen();
};



