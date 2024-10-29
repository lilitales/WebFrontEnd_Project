


//外部取得hero資料
fetch('https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json')
    .then((response) => {
        // console.log(response)
        return response.json()
    })
    .then((jsonRes) => {
        renderHeros(jsonRes, parentBox)
    })

//取得圖片的網址
let tilesUrl = 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/[key]_0.jpg'
//上層容器
let parentBox = document.querySelector('#hero-box')

var renderHeros = function(heroSrc, parentBox){
    let heroDict = heroSrc.data
    //跑迴圈限制取得英雄數量用
    const entries = Object.entries(heroDict)
    let maxLength = 100 //TODO 暫時寫死
    for(let i = 0 ; i < maxLength ; i++){
        let [heroEngName, hero] = entries[i]
        // console.log(`${key} : ${val.key}`)
        heroImgUrl = tilesUrl.replace('[key]', heroEngName)
        let child = 
        `<li class="hero-card">
            <a href='#'><img src="${heroImgUrl}" class="hero-img" 
            alt="${hero.name}"></a>
            <p class="hero-name">${hero.name}</p>
        </li>`
        // parentBox.append(child)
        parentBox.insertAdjacentHTML('beforeend', child);
       
    }
    // console.log(heroDict['Ahri'].key)
    // parentBox.innerHtml += resChildHtml
    console.log(parentBox)
}


