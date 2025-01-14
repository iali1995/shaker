import React, { useState } from 'react';
import styled from 'styled-components';

import MultiSearch from './MultiSearch';
import ConditionalBannerH4 from './ConditionalBannerH4';

// Styling
const BarStyle = styled.div`
  background: inherit;
  color: ghostwhite;
  display: flex;
  flex-flow: column;
  padding: 20%;
  width: 490px;
  button, input{
    background: rgb(35, 35, 35);
    color: ghostwhite;
    font-size: 14px;
    width: fit-content;
    padding: 0.25rem 0.75rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    box-shadow: -1px -1px 2px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
    :active{
      box-shadow: -1px -1px 1px rgba(100,100,100, 1), 1px 1px 1px rgba(0,0,0, 1);
      background: rgb(25, 25, 25);
    }
    :hover{
      box-shadow: -2px -2px 6px rgba(100,100,100, 1), 3px 3px 4px rgba(0,0,0, 1);
    }
  };
  h3{
    color: cornflowerblue
  };
`;

// the bar component will have a text form where users enter ingredients, and a button to add them to that user's bar
// when a user enters ingredient and clicks 'add' button, ingredient will be added to user's bar in database
const Bar = () => {
  const [ ingredient, setIngredient ] = useState('');
  const [ ingredientsList, setIngredientsList ] = useState([]);


  const handleChange = (e) => {
    const { value } = e.target;
    setIngredient(value);
  };


  const handleClick = async () => {
    setIngredientsList((prevList) => {
      return [ ...prevList, ingredient ];
    });
    await setIngredient('');
  };

  // Press enter key as an alternative to clicking the button
  const handleKeyDown = (e) => {
    const { key } = e;
    key === 'Enter' && handleClick();
  };

  // IngredientsMapComponent filters out any item that is an empty string as a result
  // of the user clicking button with nothing inside the input field. When this occurs
  // the empty string is never rendered to the page, but it is still added to the
  // ingredientsList, and must be removed in order to correctly pass items to api call.
  // The function then creates a list entry for the newly added ingredient.
  const IngredientsMapComponent = () => {
    const compileListEntries = ingredientsList.filter(ingredient => {
      return ingredient.length !== 0;
    })
      .map((ingredient, i) => {
        return (
          <li
            key={i}
            name={ingredient}
          >
            {ingredient}
          </li>
        );
      });
    return compileListEntries;
  };


  return (
    <BarStyle>
      <div>
        <input
          type='text'
          name='ingredient'
          value={ingredient}
          placeholder='Enter ingredients...'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        >
        </input>
        <button onClick={handleClick}>
          Add to Bar
        </button>
        <br />
        <br />
        <br />
        <div>
          <ConditionalBannerH4
            banner='My Bar:'
            item={ingredientsList}/>
          <ul>
            <IngredientsMapComponent />
          </ul>
        </div>
        <br />
        <br />
        <ConditionalBannerH4
          banner='Press the SIP button to see what you can make!'
          item={ingredientsList}
        />
        <div>
          <MultiSearch ingredientsList={ingredientsList}/>
        </div>
      </div>
    </BarStyle>
  );
};


export default Bar;
