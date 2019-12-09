import React from 'react';
import './Ebutton.css'


class Ebutton extends React.Component {

    // constructor(props){
    //     super(props)

    // }
    render(){
        return(
           <div>
            <button className = 'emotion' onClick = {this.props.onClick} >{this.props.name}</button>
           </div> 
        )
    }
}

export default Ebutton;