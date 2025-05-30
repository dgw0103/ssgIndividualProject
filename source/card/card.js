import * as GameFramework from "../../gameFramework/GameFramework.js";
import CardSelectionAnimation from "./cardSelectionAnimation.js";
import CardWrongAnimation from "./cardWrongAnimation.js";

export default class Card extends GameFramework.MonoBehaviour
{
    getCurrentSelectedCardIndex;
    increaseIndex;
    getCorrectCardInCurrent;
    #number;
    #index;
    #isClicked;
    cardAnimation;
    static cardSignals = new Array("Club", "Heart", "Diamond", "Spade");
    static #cardFilePath = "../resource/card/";
    static cardMaxNumber = 13;
    static #cardImageExtension = "png";



    onAdded()
    {
        this.#isClicked = false;
        this.cardAnimation = new CardSelectionAnimation(this);

        this.gameObject.image.width = 130;
        this.gameObject.image.height = 130;
        this.gameObject.image.style.position = "absolute";

        this.gameObject.image.addEventListener("mouseenter", this.#turnOnHighlight);
        this.gameObject.image.addEventListener("mouseleave", this.#turnOffHighlight);
        this.gameObject.image.addEventListener("click", () => 
        {
            if (this.#isClicked === false)
            {
                this.#isClicked = true;
                this.onClick();
            }
        });

        this.gameObject.image.style.cursor = "pointer";
    }



    #turnOnHighlight()
    {
        this.style.border = "2px solid white";
    }
    #turnOffHighlight()
    {
        this.style.border = "none";
    }
    set Number(number)
    {
        this.number = number;
    }
    static compare(a, b)
    {
        return a.number >= b.number ? 1 : -1;
    }
    get Index()
    {
        return this.#index;
    }
    set Index(index)
    {
        this.#index = index;
    }
    setSource(signalIndex, cardNumber)
    {
        this.gameObject.image.src = `${Card.#cardFilePath}${Card.cardSignals[signalIndex]}${String(cardNumber + 1).padStart(2, '0')}.${Card.#cardImageExtension}`;
    }
    onClick()
    {
        const currentSelectedCardIndex = this.getCurrentSelectedCardIndex();
        const answer = currentSelectedCardIndex === this.#index;

        if (answer === false)
        {
            this.#onGameOver();
            return;
        }

        this.increaseIndex();
        this.gameObject.addMonoBehaviour(new CardSelectionAnimation());
    }
    #onGameOver()
    {
        document.getElementById("block").style.visibility = "visible";
        document.getElementById("orderPanel").style.visibility = "hidden";
        this.getCorrectCardInCurrent().gameObject.addMonoBehaviour(new CardWrongAnimation());
    }
}