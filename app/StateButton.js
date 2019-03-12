/**
 *  Created by hellc on 2019/2/22
 *  StateButton
 */
import React, {Component,PureComponent} from 'react';
import {
    View,
    Image,
    TouchableHighlight
} from 'react-native';

const ButtonState = {
    Select : 1,
    Normal : 2,
    Disable : 3,
}

class StateButton extends Component{
    props:{
        disableIcon:Object;
        normalIcon:Object;
        selectIcon ?:Object;
        onPress:Function;
        style:Object;
        currentState:number;
        touchStyle:Object;
    }
    // static defaultProps = {
    // }
    constructor(props){
        super(props);

        this.state = {
            currentState : this.props.currentState,
        }

    }

    componentWillReceiveProps(nextProps){
        // console.log('状态按钮componentWillReceiveProps==>: '+nextProps.currentState+'以前状态==>: '+this.state.currentState);
        if (nextProps.currentState && nextProps.currentState !== this.state.currentState){
            // console.log('开始渲染状态按钮');
            this.setState({
                currentState : nextProps.currentState
            })
        }

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState.currentState !== this.state.currentState){
    //         return true;
    //     }else {
    //         return false;
    //     }
    // }

    render(){
        console.log('渲染状态按钮==>:' + this.state.currentState);
        switch (this.state.currentState){
            case ButtonState.Normal :
                return(
                    <TouchableHighlight
                        style={this.props.touchStyle}
                        onPress={()=>{
                            if(this.props.onPress){
                                this.props.onPress();
                            }
                        }}
                        underlayColor='rgba(255,255,255,0)'
                        onShowUnderlay={()=> {
                            this.setState({
                                currentState :  ButtonState.Normal_Highlight
                            });
                        }}
                        onHideUnderlay={()=>{
                            this.setState({
                                currentState : ButtonState.Normal
                            });
                        }}
                    >
                        <Image
                            source={this.props.normalIcon}
                            style={this.props.style}
                        />
                    </TouchableHighlight>
                );
                break;
            case ButtonState.Disable :
                return  <Image
                    source={this.props.disableIcon}
                    style={this.props.style}
                />
                break;
            case ButtonState.Select:
            return(
                <TouchableHighlight
                    style={this.props.touchStyle}
                    onPress={()=>{
                        if(this.props.onPress){
                            this.props.onPress();
                        }
                    }}
                    underlayColor='rgba(255,255,255,0)'
                    onShowUnderlay={()=> {
                        this.setState({
                            currentState :  ButtonState.Select
                        });
                    }}
                    onHideUnderlay={()=>{
                        this.setState({
                            currentState : ButtonState.Select
                        });
                    }}
                >
                    <Image
                        source={this.props.selectIcon}
                        style={this.props.style}
                    />
                </TouchableHighlight>
            );
                break;

            default:
            return(
                <TouchableHighlight
                    style={this.props.touchStyle}
                    onPress={()=>{
                        if(this.props.onPress){
                            this.props.onPress();
                        }
                    }}
                    underlayColor='rgba(255,255,255,0)'
                    onShowUnderlay={()=> {
                        this.setState({
                            currentState :  ButtonState.Normal_Highlight
                        });
                    }}
                    onHideUnderlay={()=>{
                        this.setState({
                            currentState : ButtonState.Normal
                        });
                    }}
                >
                    <Image
                        source={this.props.normalIcon}
                        style={this.props.style}
                    />
                </TouchableHighlight>
            );
                break;
        }


    }
}

export default StateButton;