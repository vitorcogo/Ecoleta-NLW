
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => { 

        for( const state of states ){
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
     } )
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indeOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indeOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => { 
        
        for( const city of cities ){
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
     } )
}




document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


/* Itens de coleta */
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}



const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    // Adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected") // toggle: função de adicionar ou remover (remove: remover / add: adicionar)

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)


    /* Vereficar se existem itens selecionados, se sim,
    pegar os itens selecionados */

    const alreadySelected = selectedItems.findIndex( item => { // "=>" função arrow
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    } )



    // Se ja estiver selecionado, tirar da seleção

    if( alreadySelected >= 0 ){
        // Tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        } )

        selectedItems = filteredItems
    } else{
        // Se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)


    // Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems


}