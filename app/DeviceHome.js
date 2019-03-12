import React, { Component } from "react";
import { Dimensions, DeviceEventEmitter, Image, StatusBar, StyleSheet, Text, View, Animated, NativeModules, TouchableHighlight, AsyncStorage } from "react-native";
import ViewPagerBuilder from "./ViewPagerBuilder";
import {TABS_RES} from "./resource/CCTResources";
import {TABS_RGB_RES} from "./resource/RGBResources";
import StateButton from "./StateButton";
let deviceWidth;
const RGBBlubState = {
    WHITE : 'white',
    COLOR : 'color',
    FLOW : 'flow',
}

let that;
export default class DeviceHome extends Component {
    constructor(props) {
        super(props);

        that = this;
        deviceWidth = Dimensions.get('window').width; 
        this._initPagerDataSource();

        this.state = ({
            selectedIndex: 2,
            currentBlubState: RGBBlubState.WHITE,
            pageDataSource: this.pageDataSource,
        });
    }

    _initPagerDataSource = () => {
        this.pageDataSource =
            [
                [
                    {
                        "tag": "SWITCH",
                        "text": "On/Off",
                        "action": this._onSwitchClick,
                        "style":{},
                        "icon":TABS_RES.SWITCH
                    },
                    {
                        "tag": "white",
                        "text": "White",
                        "action": this._onWhiteClick,
                        "style": {
                            marginLeft: 62,
                            marginRight: 62
                        },
                        "icon":TABS_RGB_RES.WHITE
                    },
                    {
                        "tag": "color",
                        "text": "Color",
                        "action": this._onColorClick,
                        "style":{},
                        "icon":TABS_RGB_RES.COLOR
                    },   
                ],
                [
                    {
                        "tag": "flow",
                        "text": "FLow",
                        "action": this._onFlowClick,
                        "style":{},
                        "icon":TABS_RGB_RES.FLOW
                    },
                    {
                        "tag": "COLOR_PICKER",
                        "text": "select  color",
                        "action": this._onSelectColorClick,
                        "style": {
                            marginLeft: 62,
                            marginRight: 62,
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        "icon":TABS_RGB_RES.COLOR_PICKER
                    },
                    {
                        "tag": "SCHDEULE",
                        "text": "Schedule",
                        "action": this._onScheduleClick,
                        "style": {},
                        "icon":TABS_RES.SCHDEULE
                    }
                ],
                [
                    {
                        "tag": "TIMER",
                        "text": "Timer",
                        "action": this._onTimerClick,
                        "style":{},
                        "icon":TABS_RES.TIMER
                    },
                    {
                        "tag": "AWAY",
                        "text": "Away",
                        "action": this._onAwayClick,
                        "style": {
                            marginLeft: 62,
                            marginRight: 62
                        },
                        "icon":TABS_RES.AWAY
                    },
                    {
                        "tag": "FAVORITES",
                        "text": "Favorites",
                        "action": this._onFavoritesClick,
                        "style": {},
                        "icon":TABS_RES.FAVORITES
                    }
                ]
            ]
    }

    _querySelectIndex = (tabTag) => {
        let pageCount = this.pageDataSource.length;
        let btCount;
        for(var i = 0; i < pageCount; i ++) {
            btCount =  this.pageDataSource[i].length;
            for(var j = 0; j < btCount; j ++) {
                if(tabTag === this.pageDataSource[i][j].tag) {
                    return i;
                }
                console.log('tag = '+this.pageDataSource[i][j].tag);
            }
        }
    }

    _onWhiteClick = () => {
       console.log('_onWhiteClick');
       this.setState({currentBlubState: RGBBlubState.WHITE});
    }

    _onColorClick = () => {
        console.log('_onColorClick');
        this.setState({currentBlubState: RGBBlubState.COLOR});
    }

    _onFlowClick = () => {
        console.log('_onFlowClick');
        this.setState({currentBlubState: RGBBlubState.FLOW});
    }

    _onSelectColorClick = () => {
        console.log('_onSelectColorClick'); 
    }

    _onSwitchClick = () => {
        console.log('_onSwitchClick');
    }


    _onScheduleClick = () => {
        console.log('_onScheduleClick');
    }

    _onTimerClick = () => {
        console.log('_onTimerClick');
    }

    _onAwayClick = () => {
        console.log('_onAwayClick');
    }

    _onFavoritesClick = () => {
        console.log('_onFavoritesClick');
    }



    render() {
        return (<View style={{ flex: 1, backgroundColor: '#FF0000'}}>
           {this.getBackGroundView()}
            {/* 底部Tab关卡 */}
            <View style={{marginTop: 500}}>
                <ViewPagerBuilder
                    dataSource={this.state.pageDataSource}
                    itemWidth={deviceWidth}
                    itemHeight={136}
                    renderTab={(item) => this._renderTabPage(item)}
                    selectedIndex={this.state.selectedIndex}
                    itemChange={(index)=> {
                        this._itemChange(index);
                    }}  />
                </View>
        </View>);
    }

    getBackGroundView() {
       switch(this.state.currentBlubState) {
           case RGBBlubState.COLOR:
                    return   //背景
                <Text>Color mode</Text>;
           case RGBBlubState.FLOW:
            return   //背景
                <Text>Flow mode</Text>;

           default:
           return   //背景
            <Text>Flow mode</Text>;
           }
    }

    _itemChange = (index) => {
        this.state.selectedIndex = index;
        console.log('_itemChange this.state.selectedIndex = '+this.state.selectedIndex);
        //this.setState({selectedIndex: index});
    }


    /**
     * item{tag,text}
     */
    _renderTabPage = (item) => {
        // // console.info(JSON.stringify(item));
        let itemViewS = [];
        let size = item.length;
        console.log('currentBlubState = '+this.state.currentBlubState);
        for (let i = 0; i < size; i++) {
            // console.log('item[i].tag = '+item[i].tag);
            //console.log('isSelect = '+((this.state.currentBlubState === item[i].tag)? 1 : 2));
            let state;
            if(item[i].tag === 'SWITCH') {
                state = this.state.deviceSwitch ? 1 : 2;
                console.log('item[i].tag SWITCH state = '+state);
            }
            else {
                state = (this.state.currentBlubState === item[i].tag)? 1 : 2;
            }
            itemViewS.push(
                <View key={"item_" + i} style={item[i].style}>
                    <StateButton
                        disableIcon={item[i].icon[1]}
                        selectIcon={item[i].icon[0]}
                        normalIcon={item[i].icon[1]}
                        style={styles.tabItemImageStyle}
                        onPress={item[i].action}
                        currentState={state} />
                    <Text
                        style={[styles.tabItemTextStyle, {
                            opacity: this.state.deviceConnect ? 1 : 0.5,
                        }]}>{item[i].text}</Text>
                </View>
            );
        }
        return <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: "center" }}>{itemViewS}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    viewpager: {
        flex: 1,
    },
    tabStyle: {
        alignItems: 'center',
    },
    tabItemImageStyle: {
        width: 48,
        height: 48,
    },
    tabItemTextStyle: {
        flex:1,
        textAlign:"center",
        fontSize: 12,
        color: 'white',
        marginTop: 8,
    },
    radiusBtnStyle: {
        justifyContent:'center',
        alignItems: 'center',
        width: 180,
        height: 46,
        borderColor: '#FFFFFF',
        borderRadius: 35,
        borderWidth: 1.5,
      }
});