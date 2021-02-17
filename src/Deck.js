import React, { Component } from 'react'
import {View, Animated, PanResponder, SafeAreaView, ScrollView, Dimensions} from 'react-native'


const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250


class Deck extends Component {
    static defaultProps = {
      onSwipeRight: () => {},
      onSwipeLeft: () => {}
    }

    constructor(props) {
        super(props);
        const position = new Animated.ValueXY()

        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
    
          onPanResponderGrant: (evt, gestureState) => {
          },
          onPanResponderMove: (evt, gestureState) => {
            position.setValue({x: gestureState.dx, y:gestureState.dy})
          },
          onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
          onPanResponderRelease: (evt, gestureState) => {
            if(gestureState.dx > SWIPE_THRESHOLD) {
              this.forceSwipeRight('right')
            } else if (gestureState.dx < -SWIPE_THRESHOLD) {
              this.forceSwipeRight('left')
                console.log('swipe left')
            } else {
              this.resetPosition()
            }
          },
          onPanResponderTerminate: (evt, gestureState) => {
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {

            return true;
          }

          
        });

        this.state = {position, index : 0}
      }
      forceSwipeRight(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
         Animated.timing(this.state.position, {
          toValue: {x:x * 1.5, y: 0},
          duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction))
      }

      onSwipeComplete(direction) {
        const {onSwipeLeft, onSwipeRight, data} = this.props
        const item = data[this.state.index]
        
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
        this.state.position.setValue ({x: 0, y: 0})
        this.setState({index: this.state.index + 1})
      }

      resetPosition(){
        Animated.spring(this.state.position,{
          toValue: {x: 0, y: 0}
        }).start();
      }

      getCardStyle(){
        const {position} = this.state
        const rotate = position.x.interpolate({
            inputRange :[-SCREEN_WIDTH * 1.5, 0,  SCREEN_WIDTH * 1.5],
            outputRange: [ '-120deg', '0deg', '120deg']
        })
            return {...this.state.position.getLayout(),
            transform: [{rotate}]
          }
      }

    renderCards(){
        if(this.state.index >= this.props.data.length){
          return this.props.renderNoMoreCards()
        }

        return this.props.data.map((item, i) => {
          if (i < this.state.index){
            return null
          }
            if (i === this.state.index) {
                return(
                    <Animated.View key = {item.id} style = {this.getCardStyle()} {...this._panResponder.panHandlers}>
                        {
                            this.props.renderCard(item)                            
                        }
                    </Animated.View>
                )
            }
            return (
            <View style = {{position: 'absolute'}}>
              {this.props.renderCard(item)}
            </View>
            )    
        }).reverse()
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        {this.renderCards()}                
                    </View>   
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default Deck