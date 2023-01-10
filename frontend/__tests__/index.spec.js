// noinspection JSCheckFunctionSignatures

import {fireEvent, render} from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
    let characterProp;

    beforeEach(() => {
        characterProp = [
            {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
                "homeworld": "https://swapi.dev/api/planets/1/",
                "films": [
                    "https://swapi.dev/api/films/1/",
                    "https://swapi.dev/api/films/2/",
                    "https://swapi.dev/api/films/3/",
                    "https://swapi.dev/api/films/6/"
                ],
                "species": [],
                "vehicles": [
                    "https://swapi.dev/api/vehicles/14/",
                    "https://swapi.dev/api/vehicles/30/"
                ],
                "starships": [
                    "https://swapi.dev/api/starships/12/",
                    "https://swapi.dev/api/starships/22/"
                ],
                "created": "2014-12-09T13:50:51.644000Z",
                "edited": "2014-12-20T21:17:56.891000Z",
                "url": "https://swapi.dev/api/people/1/"
            }
        ]
    })

    test('renders the Header component', () => {
        const { getByText } = render(<Home characterList={characterProp}/>)

        getByText('SWAPI');
    })

    test('the search bar is rendered on the page', () => {
        const { getByPlaceholderText } = render(<Home characterList={characterProp} />)

        getByPlaceholderText("Search for a Character");
    })

    test('shows the characters not found message when characterList is empty', () => {
        const { getByText } = render(<Home characterList={[]}/>)

        getByText('These are not the characters you are looking for.')
    })

    test('shows a CharacterCard component when the characterList is not empty', () => {
        const { getByText, getByAltText, getByTestId } = render(<Home characterList={characterProp}/>)

        getByText("Luke Skywalker")
        getByAltText("Luke Skywalker")
        getByText("Human")
        getByTestId('heart-luke-skywalker')
    })

    test( 'the heart gets selected class when the heart is clicked', () => {
        const { getByTestId } = render (<Home characterList={characterProp} />)

        const heart = getByTestId('heart-luke-skywalker');
        fireEvent.click(heart);

        expect(getByTestId('heart-svg-luke-skywalker')).toHaveClass('selected-heart');
    })

    test('clicking a characterCard opens a modal', () => {
        const { getByTestId } = render(<Home characterList={characterProp} />)

        const characterCard = getByTestId('characterCard');
        fireEvent.click(characterCard);

        getByTestId('characterModal-luke-skywalker')
    })

    test('sets the filter to All Characters by default', () => {
        const { getByText } = render(<Home characterList={characterProp} />)

        getByText('All Characters')
    })
})