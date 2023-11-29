// Explore Button

let exploreBtn = document.querySelector('.title .btn'),

HadithSection = document.querySelector('.hadith');

exploreBtn.addEventListener('click',()=>{

    HadithSection.scrollIntoView(

        {
            behavior : "smooth"
        }
    )
})

let fixedNav = document.querySelector('.header'),

    scrollBtn = document.querySelector('.scrollBtn');

window.addEventListener("scroll",()=>{

    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');

    window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active') ;
    
 })
scrollBtn.addEventListener('click', ()=>{

    window.screenTop({
        top : 0,
        behavior : "smooth"
    })
})
 // hadith Changer 

 let hadithContainer = document.querySelector('.hadithContainer'),

 next = document.querySelector('.buttons .next'),

 prev = document.querySelector('.buttons .prev'),

 number = document.querySelector('.buttons .number');

 let hadithIndex = 0;

 HadithChanger();

 function HadithChanger(){

    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json")

    .then(response => response.json())
    
    .then(data => {
        
       let Hadiths = data.hadiths;

       changehadith();

       next.addEventListener('click',()=> {

        hadithIndex == 7562 ? hadithIndex = 0 : hadithIndex++;

        changehadith()

       })

       prev.addEventListener('click',()=> {

        hadithIndex == 0 ? hadithIndex = 7562 : hadithIndex--;

        changehadith()

       })

       function changehadith()
       {
        hadithContainer.innerText = Hadiths[hadithIndex].text;

        number.innerText= `7563 - ${hadithIndex + 1}`
       }
    })
 }


 // Link Section

 let sections = document.querySelector("section"),

    links = document.querySelectorAll('.header ul li');

links.forEach(link => {

    link.addEventListener('click', ()=> {

        document.querySelector('.header ul li.active').classList.remove('active');

        link.classList.add('active');

        let target = link.dataset.filter;

        sections.forEach(section =>{

        if(section.classList.contains(target))

        {
            section.scrollIntoView({

                 behavior : "smooth"

            }
               
            )
        }
       })
    })
})



// Quran Api

let SurhasContainer = document.querySelector('.surhasContainer')

getSurah()

function getSurah() {

    //fetch Surahs meta Data [Name Of Surha]

    fetch("http://api.alquran.cloud/v1/meta")

    .then(response => response.json())

    .then(data=>{

        let surhas = data.data.surahs.references;
        
        let numberOfSurahs = 114;

        SurhasContainer.innerHTML ="";

        for (let i = 0; i < numberOfSurahs; i++) {
            
            SurhasContainer.innerHTML +=
             `
            <div class="surah">

                <p>${surhas[i].name}</p>

                <p>${surhas[i].englishName}</p>

            </div>
             `
            
        }

        let SurahaTitles = document.querySelectorAll('.surah');
        
        let popup = document.querySelector('.surah-pop');

        AyatContainer = document.querySelector('.ayat');

        SurahaTitles.forEach((title,index) =>{

            title.addEventListener('click',()=>{

                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)

                .then(response  => response.json())

                .then(data=>{
                    
                    AyatContainer.innerHTML = "";

                    let Ayat = data.data.ayahs;

                    Ayat.forEach(aya=>{

                        popup.classList.add('active');

                        AyatContainer.innerHTML += `
                        
                        <p>(${aya.numberInSurah}) - ${aya.text}</p>
                        
                        ` 
                    })
                })
            })
        })
        let closePopUp = document.querySelector('.close-pop');

        closePopUp.addEventListener('click',()=>{

            popup.classList.remove('active');

        })
    })
}


// pray Api

let cards = document.querySelector('.cards');

getPrayTime();

function getPrayTime(){

    fetch('http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')

    .then(response => response.json())

    .then(data=>{

        let times = data.data.timings;

        cards.innerHTML = "";

        for (let time in times ){

            cards.innerHTML += `
            
            <div class="card">
                 <div class="circle">
                     <svg>
                            <Circle cx="100" cy="100" r="100"></Circle>
                     </svg>
                     <div class="prevtime">${times[time]}</div>
                </div>
            <p>${time}</p>
            </div>

            `
        }
    })
}



// active sidebar  

let bars = document.querySelector('.bars'),

    sideBar = document.querySelector('.header ul');

bars.addEventListener('click',()=>{

    sideBar.classList.toggle("active")
})    
