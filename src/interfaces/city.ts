export interface City{
    wind: {
        speed: String
    },
    main: Main
    weather: Weather[]
}

export interface Main{
    temp: String,
    feels_like: String
}

export interface Weather {
    description: String
}