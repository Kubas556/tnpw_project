let sections;
let background;
let logo;
let heroImageX = "0%";
window.addEventListener('load', () => {
    sections = Array.from(document.querySelectorAll("section"));
    background = document.getElementsByClassName("background_hero")[0];
    logo = document.getElementById("main_logo");

    document.querySelectorAll("#main_logo path").forEach(path =>
        path.style.animation = "logo_paths 2s ease-out 0s 1 normal forwards"
    );


    document.body.onresize = () => {
        background.style = "";
        heroImageX = getComputedStyle(background).objectPosition.split(' ')[0];
        heroImageX = heroImageX === '0%' ? heroImageX : getComputedStyle(background).objectPosition.split(')')[0] + ')';
    };

    document.querySelectorAll('div[href]').forEach(e => {
        e.addEventListener('click', () => window.location = e.getAttribute('href'));
    });
});

// ----- page scrolling -----

window.addEventListener('scroll', () => {

    if (!sections)
        return;

    let sectionsArray = [...sections];
    sectionsArray = sectionsArray.map(el => {
        return {
            element: el,
            height: el.scrollHeight,
            event: undefined
        }
    });

    sectionsArray[0].event = function (scrollHeights) {
        background.style = "";
        //background.style.objectPosition = heroImageX + ' ' + (500 * (window.scrollY / scrollHeights[1])) + 'px';
        background.style.transform = `translate3d(0, ${(500 * (window.scrollY / scrollHeights[1]))}px, 0px)`;
        //logo.style.transform = 'translateY(' + (400 * (window.scrollY / scrollHeights[1])) + 'px)';
        logo.style.transform = `matrix(1.2, 0, 0, 1.2, 0, ${(350 * (window.scrollY / scrollHeights[1]))})`;
    };

    sectionsArray[1].event = function (scrollHeights) {
        //console.log((10 * (window.scrollY / sectionsArray[1].height)));
        //sections[1].style.transform = `translate3d(0px, ${500-(500 * (window.scrollY / sectionsArray[1].height))}px, 0px)`
    }

    let scrollHeights = [];
    let currentHeight = 0;
    sectionsArray.forEach((section) => {
        scrollHeights.push(currentHeight);
        currentHeight += section.height;
    });

    sectionsArray.forEach((section, index) => {

        //if (window.scrollY >= scrollHeights[index] /*&& (index === scrollHeights.length - 1 ? true : (window.scrollY <= scrollHeights[index + 1]))*/ ) {
        if (section.event)
            section.event(scrollHeights);
        //}
    });
});

// ----- end page scrolling -----