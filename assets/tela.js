import React, { useEffect } from 'react';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { StatusBar } from 'expo-status-bar';
import styled, { withTheme } from 'styled-components';
import { Audio } from 'expo-av';




const Background = styled.View`

    flex: 1;
    background-color: rgb(45, 45, 109);
    
`;


const TituloImg = styled.Image`


display: flex;
align-items: center;
justify-content: center;
text-align: center;
  width: 100%;
`;

const InputPokemon = styled.TextInput`

background-color: whitesmoke;
    border: 3px solid red;
    border-radius: 15px;
    padding: 5px 15px;
    transition-duration: 0.5s;
    outline: none;
    width: 50%
    margin-left: 90px
   
`;


const ImageOfPokemon = styled.Image`

width: 50%;
height: 25%;
margin-left: 25%;
margin-top: 25%;
background-size: contain;
margin-top: 30px

`;

const NameOfPokemon = styled.Text`

text-align: center;
color: white;
margin-top: 15px;
font-size: 25px;


`

const TypeOfPokemon = styled.Text`

text-align: center;
color: white;
font-size: 20px;
margin-top: 10px;
`
const WeightOfPokemon = styled.Text`

text-align: center;
color: white;
font-size: 20px;
margin-top: 10px;
`

const DescriptionOfPokemon = styled.Text`

color: black;
border-radius: 20px;
font-style: italic;
text-align: center;
margin-top: 20px
font-size: 22px

${({ description }) =>
description &&
`
  background-color: #dedf7f;
`}


`

export const TelaApp = () => {


 useEffect(() => {
  musica();
 }, []);

  const [imageUrl, setImageUrl] = useState(null);
  const [idPokemon, setIdPokemon] = useState('');
  const [namePokemon, setNamePokemon] = useState('')
  const [typePokemon, setTypePokemon] = useState('')
  const [weightPokemon, setWeightPokemon] = useState('')
  const [descriptionPokemon, setDescriptionPokemon] = useState('')

  const axiosPokemon = async id => {
        
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
     
      const pokemon = response.data;
      
      const imgPokemon = pokemon.sprites.other['official-artwork'].front_default;
      const namePokemon = pokemon.name
      const typePokemon = pokemon.types.map(types => types.type.name).join(', ');
      const weightPokemon = pokemon.weight.toString();
      
      const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);

      const pokemon2 = response2.data;

      const descriptionPokemon = pokemon2.flavor_text_entries[0].flavor_text

setImageUrl(imgPokemon)
setNamePokemon(namePokemon)
setTypePokemon(typePokemon)
setWeightPokemon(weightPokemon)
setDescriptionPokemon(descriptionPokemon)
setIdPokemon('')

    } catch (error) {
      console.error(error);
    }


}



return (
  <Background>



    <TituloImg 
    source={require('./img/pokemon-logo-gif.gif')}>
    </TituloImg>

    <InputPokemon
    value= {idPokemon} 
    onChangeText={event => setIdPokemon(event)}
    onSubmitEditing={() => axiosPokemon(idPokemon)}
    placeholder="enter pokémon id">
    </InputPokemon>

      {imageUrl && (
        <ImageOfPokemon
        source={{uri: imageUrl}}
        
        ></ImageOfPokemon>
      )}

    <NameOfPokemon>{namePokemon}</NameOfPokemon>
    <TypeOfPokemon>{typePokemon ? "type: " + typePokemon : null}</TypeOfPokemon>
    <WeightOfPokemon>{weightPokemon ? "weight: " + weightPokemon : null}</WeightOfPokemon>


    {descriptionPokemon && (
  <DescriptionOfPokemon description>
    {descriptionPokemon}
  </DescriptionOfPokemon>
)}

    <StatusBar style="auto" />
    </Background>
);

};


const musica = async () => {
try{
  const audio = new Audio.Sound()

  await audio.loadAsync(require('./music/PokémonWorldChampionshipFinalBattleMusic.mp3'))
  await audio.setVolumeAsync(1.0)
  await audio.playAsync()
  await audio.setIsLoopingAsync(true)

}catch(e){
console.log(e)
}

};