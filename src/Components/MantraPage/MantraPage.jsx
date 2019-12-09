import React from 'react';
import './MantraPage.css'

class MantraPage extends React.Component {

    // constructor(props){
    //     super(props)
    // }



    render(){
        return(
            <div className='container'>
            <h1>Mudl</h1>
            <p>{'Are you feeling: ' + this.props.emotion +'?'}</p>
            <p>{'Mantra: '+ this.props.mantra}</p>
            <p>{'Advice: '+ this.props.advice}</p>  
            </div>
        )

    }
}

export default MantraPage;