export default function createCards(img, title) {
    // the card container div
    let card = document.createElement('div')
    card.classList.add('card')

    // The card image element and its attributes
    let cardImg = document.createElement('img')
    cardImg.classList.add('card-img-top')
    cardImg.setAttribute('src', img)

    // The card-block div
    let cardBlock = document.createElement('div')
    cardBlock.classList.add('card-block')

    // The card button
    let cardBtn = document.createElement('a')
    cardBtn.classList.add('btn', 'btn-primary', 'btn-block')
    cardBtn.innerHTML = `${title}`

    // Create DOM for card-block
    cardBlock.appendChild(cardBtn)

    // create DOM for cards
    card.appendChild(cardImg)
    card.appendChild(cardBlock)
    return card
}

