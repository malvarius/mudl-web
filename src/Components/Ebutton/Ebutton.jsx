import React from 'react';
import './Ebutton.css'


class Ebutton extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            display: true,
            word:null,
            definition:null
        }
    }
    componentDidMount(){
        this.setState({
            word:this.props.name,
            definition:this.props.def
        })
    }
    updateDisplay(){
        if(this.state.display){
            this.setState({
                display: false
            })
        }else{
            this.setState({
                display: true
            })
        }
    }
    render(){
        let text = this.state.word;
        if(this.state.display){
        }else{
            text =this.state.definition
        }
        return(
           <div>
            <button className = 'emotion' onDoubleClick = {()=>{this.updateDisplay()}} onClick = {this.props.onClick} >{text}</button>
           </div> 
        )
    }
}

export default Ebutton;