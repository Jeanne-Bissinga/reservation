//convertir la date d'aujourd'hui à une date de type input

//variable contenant la date du jour
//.toISOString() pour le permettre de rentrer dans l'input
const today = new Date().toISOString().split("T")[0];

//On donne la valeur à l'input
start_date.value = today;

//pour qu'on ne puisse pas choisir une date antérieur à la date du jour
start_date.min = today;



//Calcul de la date du lendemain
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
// On converti au format input
let tomorrowFormat = tomorrow.toISOString().split("T")[0];

//on donne la valeur à l'input
end_date.value = tomorrowFormat;
//pour qu'on ne puisse pas choisir une date antérieur à la date du lendemain
end_date.min = tomorrowFormat;



// Maitenant on fait de tel sorte qu'à chaque changement de l'input start_date, end_date aussi se change automatiquement pour se mettre à la date du lendemain de l'input start_date
start_date.addEventListener("change", (e) => {
    let day = new Date(e.target.value);

    if(end_date.value < start_date.value){
        //pour faire un une date + 1 (date suivante)
        day.setDate(day.getDate() + 1);
        //on oubli pas de le mettre au bon format (format input)
        end_date.value = day.toISOString().split("T")[0];;

    }
});


// il faut que quand on manipule l'input end_date on ne puisse pas revenir plus loin que la date choichi précédemment dans l'input start_date
end_date.addEventListener("change", (e) => {
    let day = new Date(e.target.value);
    if(end_date.value < start_date.value){
        //on determine la date du jour précédent
        day.setDate(day.getDate() - 1);
        //on met au bon format et on determine la date max 
        start_date.value= day.toISOString().split("T")[0];
        
    }
});


//calcul du prix de la reservation

const bookingCalc = () => {
    //on va calculer le nombre de jour
    //diffTime donne les seconde de différence entre les deux inputs
    let diffTime = Math.abs( new Date(end_date.value) - new Date(start_date.value));
    //diffDays le nombre de jour de différence
    let diffDays = Math.ceil(diffTime/(1000 *60 *60 *24));

    total.textContent= diffDays * nightPrice.textContent; 
};

//On joue la foncton à chaque fois que les inputs sont bougés
start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);

bookingCalc ();