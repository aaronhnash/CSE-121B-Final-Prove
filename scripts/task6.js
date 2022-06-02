var comicData = {};
var maxIssue = 0;

function display(comic){
    // Contrary to W05, there is not a list of data--a map is not needed.
    // What data do I need? Image source, image title, date of posting?
    // comic.day, comic.month, comic.year, comic.title, comic.img
    let month = "";
    switch (comic.month*1){
        case 1:
            month = "January";
            break;
        
        case 2:
            month = "February";
            break;

        case 3:
            month = "March";
            break;
        
        case 4:
            month = "April";
            break;  

        case 5:
            month = "May";
            break;
        
        case 6:
            month = "June";
            break;
        
        case 7:
            month = "July";
            break;
        
        case 8:
            month = "August";
            break;

        case 9:
            month = "September";
            break;
        
        case 10:
            month = "October";
            break;  

        case 11:
            month = "November";
            break;
        
        case 12:
            month = "December";
            break;
    }
    // ID's: comic-img, comic-title, comic-date (single string, format before passing), comic-number
    document.querySelector("#comic-img").setAttribute("src", comic.img);
    document.querySelector("#comic-title").textContent = comic.title;
    document.querySelector("#comic-date").textContent = (comic.day)+" "+month+" "+(comic.year);
    document.querySelector("#comic-number").textContent = comic.num;
}


// Async function call to get comic data from the xkcd api
var getComic = async (comic) =>{
    // check if 'comic' was passed in here, AKA is it undefined?
    let call;
    if (comic !== undefined){
        // If var comic is defined, then we want something specific.
        call = await fetch("https://xkcd.vercel.app/?comic="+comic);
        comicData = await call.json()
        //maxIssue = comicData.num;
    }
    else {
        // If it isn't defined, then just return the default (most recent) comic
        call = await fetch("https://xkcd.vercel.app/?comic=latest");
        comicData = await call.json()
    }
    
    // Process output data
    display(comicData);
}

function getRandomComic(){
    // Information for random number generation found here: https://www.w3schools.com/JS/js_random.asp
    // Returns a random integer between 1 & maxIssue
    let num = Math.floor(Math.random() * maxIssue + 1);
    //Math.floor(Math.random() * (max - min + 1) + min);
    getComic(num);
}

function goToComic(){
    let num = document.querySelector("#go-to").value;
    if (num > maxIssue){num = maxIssue}
    if (num < 1){num = 1}
    getComic(num);
}


getComic(); // default call returns most recent comic
//maxIssue = document.querySelector("#comic-number").textContent;
// For some reason, the code snippet above isn't working... it only returns a "". I've tried setting the number of comic issues
// on line 75 as well, but whenever I try to reference it, it always keeps the initial value of 0. I'll just hard code it for now.
maxIssue = 2627;

// Add listener button to get a random comic. 
//getRandomComic();

document.querySelector("#random").addEventListener("click",getRandomComic);

// Add listener to "go" button
document.querySelector("#go").addEventListener("click",goToComic);