import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ball from './src/Ball'
import Deck from './src/Deck'
import {Card, Button, Image} from 'react-native-elements'

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

class App extends React.Component {
  renderCard(item){
    return (
      <Card>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image source = {require('../Swipe/images/viral.jpg')}  style={{ width: 350, height: 350 }}/>
        <Text style = {{marginBottom: 10}}>
          puedo mejorar esto
        </Text>
       <Button backgroundColor = "#03A9F4" title= "ver ahora" />
      </Card>
    )   
  }
 
  renderNoMoreCards() {
    return(
      <Card>
        <Card.Title>
          todo Hecho!
        </Card.Title>
        <Text style = {{marginBottom : 10}}>
          No hay mas contenido!
        </Text>
        <Button backgroundColor = "#03A9F4" title = "Optener mas!"/>
      </Card>
    )
  }

  render() {
    return (
      <View style={styles.container}>
          <Deck data= {DATA} renderCard = {this.renderCard} renderNoMoreCards = {this.renderNoMoreCards}/>
      </View>
    );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});

export default App
