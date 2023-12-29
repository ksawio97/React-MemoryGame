const cards = [
    'kotlin.svg',
    'puppeteer.svg',
    'python.svg'
];

export const getCardImages = () => cards.map((card) => '/cards/'+card);