// Fonction exec

Moon();

setInterval(Moon, 300000)



function Moon(){

    const timeAndDate = new Date('April 1 2023 12:00:00');
    //const timeAndDate = new Date();
    const moonIllumination = SunCalc.getMoonIllumination(/*Date*/ timeAndDate);
    const moon = document.querySelector('#moon');
    let moonFraction;
    let coubure
    let angle;
    let shadow;

    angle = moonIllumination.angle;


  

    console.log(moonIllumination);

    if(moonIllumination.phase <= 0.50){
        

        if(moonIllumination.fraction < 0.50){

            moonFraction = -50 + (moonIllumination.fraction * -100);
            coubure = -moonIllumination.fraction* 3 * 100;

            

    
    
        console.log('1');

        }

        if(moonIllumination.fraction > 0.50){

            moonFraction = (moonIllumination.fraction * 100) - 100 ;
            coubure = -moonIllumination.fraction/3 * 100;
        console.log(moonFraction);

        console.log('2');

        document.querySelector('#moon').style.background='white';
        shadow = "black";

        }

        //moonFraction = (-moonIllumination.fraction * 100)*3;
        //coubure = ((-moonIllumination.fraction *100) * 100)/50




        
        //

        console.log(moonFraction);
        console.log(coubure);




    }


    if(moonIllumination.phase > 0.50){
        moonFraction = moonIllumination.fraction * 100 + 100  ;
        coubure =  -100

        if(moonIllumination.fraction < 0.55){

            
            moonFraction = (moonIllumination.fraction * 100 + 100);
            coubure =  -100 + moonIllumination.phase
    
            console.log(moonFraction);
        
            console.log('4');
    
            }

        

        console.log('3');
    }


    r = 50 // rayon du cercle
    phi = luminosite * Math.PI // angle de la phase éclairée en radians

    // coordonnées du centre du cercle
    x = 50 // position horizontale du centre
    y = 50 // position verticale du centre

    // coordonnées des points de la phase éclairée
    xe = x + r * Math.cos(phi - Math.PI/2)
    ye = y + r * Math.sin(phi - Math.PI/2)

    // coordonnées des points de la phase non éclairée
    xn = x + r * Math.cos(phi + Math.PI/2)
    yn = y + r * Math.sin(phi + Math.PI/2)



    moon.style.boxShadow = `inset ${moonFraction}px ${angle}px 0px ${coubure}px ${shadow} `;
    moon.style.transform = `translate(20vw, 0px )`;

}




















// Ce gestionnaire ne sera exécuté qu'une fois
// lorsque le curseur se déplace sur la liste
//moon.addEventListener("mouseenter", function( event ) {
    
    //event.target.style.backgroundColor = "red";

//});