import countryData from 'country-codes-list'

export interface CountryType{
    code: string,
    value: string
}

export const allCountry = countryData.customArray({code: '{countryCode}', value: '{countryNameEn}'}) as CountryType[]