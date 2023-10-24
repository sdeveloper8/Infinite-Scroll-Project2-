const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

const count = 30;
const apiKey = "ys2IHVZoCwgYvUyrAjHVwCLVYNj2KPv-qAHOdxhcyPE";
const apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//see if all images were loaded
const imageLoaded = () => {
    imagesLoaded ++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//create setattribute function
const setAttributes = (elements, attributes)=>{
    for(const key in attributes){
        elements.setAttribute(key, attributes[key]);

    }
}


//create elements to display photos
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_decription);
        
        setAttributes(img,{
            // src: photo.urls.regular,
            // alt: photo.alt_description,
            // title: photo.alt_description,
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // load event listner

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from unsplash API
const getPhotos = async() =>{
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
    } catch (error) {
        
    }
}

//scroll
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }}
        
    );


//on load
getPhotos();