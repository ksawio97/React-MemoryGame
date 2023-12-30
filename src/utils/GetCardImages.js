const cards = [
    'kotlin.svg',
    'puppeteer.svg',
    'python.svg',
    'csharp.svg',
    'android.svg',
    'wordpress.svg'
];

export const getCardImages = () => cards.map((card) => '/cards/'+card);