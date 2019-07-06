export type TopStories = {
    id: string;
    title: string;
    url: string;
    newUrl: string;
    score: number;
    by: any;
    time: string;
    timeIso: string;
    descendants: number;
}


export type Query = {
    topStories: TopStories[];
}

// export class Place {
//     constructor(
//          public id: string,
//          public title: string,
//          public description: string,
//          public imageUrl: string,
//          public price: number,
//          public availableFrom: Date,
//          public availableTo: Date,
//          public userId: string
//         ){}
// }