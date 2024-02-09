const getColor = document.querySelector("input[type='color']").value
const submitBtn = document.getElementById("submit-btn")
const schemeValue = document.getElementById("scheme-select").value
const colorDiv = document.querySelectorAll('.color')

document.addEventListener("submit", (e) => {
    e.preventDefault();
    const getColor = document.querySelector("input[type='color']").value
    const schemeValue = document.getElementById("scheme-select").value
    const colorValue = getColor.slice(1);
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${schemeValue}`)
    .then(res => res.json())
    .then(data => {
        const colors = data.colors;    
        colors.forEach((color, index) => {
            colorDiv[index].style.backgroundColor = color.hex.value
            colorDiv[index].dataset.color = color.hex.value
            colorDiv[index].innerHTML = `
                <div class="inner-display" data-color=${color.hex.value}>
                    ${color.hex.value}
                </div> `
        })
    })
    .catch(error => {
        console.error('Error fetching color scheme:', error);
    })
})

document.addEventListener("click", (e)=>{
      if (e.target.dataset.color) {
        const colorValue = e.target.dataset.color
        const textarea = document.createElement('textarea')
        textarea.value = colorValue
        
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        notification(colorValue)
    }
})


function notification(value){
    document.getElementById('copy-alert').innerText = `${value} copied to clipboard`
}

function clearColors(){
    for(let i=0; i<colorDiv.length; i++){
        colorDiv[i].style.removeProperty('background-color')
        colorDiv[i].innerHTML = ''
    }
     document.getElementById('copy-alert').innerText = ""
}

document.getElementById('clear-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    clearColors()
})

