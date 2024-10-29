
let localHeroKey = 'livi-heroSrc_v2'

//上層容器
let parentBox = document.querySelector('#hero-box')

var saveHeros = function(heroSrc){
    localStorage.setItem(localHeroKey, JSON.stringify(heroSrc))
}

var getHeros = function() {
    let data = localStorage.getItem(localHeroKey)
    return JSON.parse(data)
}


var renderHeros = function(heroDict, parentBox){
    //跑迴圈限制取得英雄數量用
    const entries = Object.entries(heroDict)
    let maxLength = 100 //TODO 暫時寫死
    for(let i = 0 ; i < maxLength ; i++){
        let [heroEngName, hero] = entries[i]
        appendChild(hero, parentBox)
    }
    // console.log(heroDict['Ahri'].key)
    // parentBox.innerHtml += resChildHtml
    console.log(parentBox)
}

const itemsPerPage = 12;
let currentPage = 1;
var renderHerosByPage = function(heroDict, parentBox){
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let heros = Object.values(heroDict);
    let pageData = heros.slice(start, end);
    console.log(pageData.length)
     //reset
    parentBox.innerHTML = ''
    pageData.forEach( (hero) => {
        appendChild(hero, parentBox)
    })

    renderPageButtons();
    
    document.querySelector("#prev-btn").disabled = currentPage === 1;
    document.querySelector("#next-btn").disabled = currentPage === Math.ceil(heros.length / itemsPerPage);
    console.log('done')
}

var appendChild = function(hero, parentBox){
    // console.log(`${key} : ${val.key}`)
    //取得圖片的網址
    const tilesUrl = 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/[key]_0.jpg'
    let heroEngName = hero.id
    let heroImgUrl = tilesUrl.replace('[key]', heroEngName)
    let child = 
    `<li class="hero-card">
        <a href='#'><img src="${heroImgUrl}" class="hero-img" 
        alt="${hero.name}"></a>
        <p class="hero-name">${hero.name}</p>
    </li>`
    // parentBox.append(child)
    parentBox.insertAdjacentHTML('beforeend', child);
}


function renderPageButtons() {
    let heros = Object.values(getHeros());
    const totalPages = Math.ceil(heros.length / itemsPerPage);
    const pageButtonsContainer = document.querySelector("#page-buttons");
    pageButtonsContainer.innerHTML = ''; // 清空原有按鈕

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("btn", "btn-light", "me-1");
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            currentPage = i;
            renderHerosByPage(getHeros(), parentBox);
        });
        pageButtonsContainer.appendChild(button);
    }
}

function nextPage() {
    let heros = Object.values(getHeros());
    if (currentPage * itemsPerPage < heros.length) {
        currentPage++;
        renderHerosByPage(getHeros(), parentBox)
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderHerosByPage(getHeros(), parentBox)
    }
}


var toHeroDict = function (heroSrc){
    let heroDict = heroSrc.data
    return heroDict
}

if(localStorage.getItem(localHeroKey) == null){
    //外部取得hero資料
    fetch('https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json')
    .then((response) => {
        // console.log(response)
        return response.json()
    })
    .then((jsonRes) => {
        let heroDict = toHeroDict(jsonRes)
        saveHeros(heroDict)
        // renderHeros(heroDict, parentBox)
        renderHerosByPage(getHeros(), parentBox)
    })
}
//TODO if else 流程可優化
else{
    let heroDict = getHeros()
    // renderHeros(heroDict, parentBox)
    renderHerosByPage(getHeros(), parentBox)
}

document.querySelector('#prev-btn').addEventListener('click', prevPage)
document.querySelector('#next-btn').addEventListener('click', nextPage)




