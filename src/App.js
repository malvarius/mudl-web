import React from 'react';
import './App.css';
import Ebutton from './Components/Ebutton/Ebutton';
import API from './APIRequests/API'

class APP extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      emotion:'primary_emotion',
      emotions: [],
      primary_emotion:null,
      secondary_emotion:null
    }
  }

  componentDidMount(){
    API.getMoods()
    .then((data) => {
      console.log(data.data)
      this.setState({emotions:data.data})
    })
  }
  resetClick(){
    API.getMoods()
    .then((data) => {
      console.log(data.data)
      this.setState({emotions:data.data, emotion:'primary_emotion'})
    })
  }
  
  handleClick(e,item){
    // console.log('Clicked')
    if(item.primary_emotion && item.secondary_emotion){
      API.getMoods(item.primary_emotion,item.secondary_emotion)
      .then((data) => {
        console.log(data.data)
        this.setState({emotions:data.data, 
          emotion:'tertiary_emotion'})
      })
    }else{
      API.getMoods(item.primary_emotion)
      .then((data) => {
        console.log(data.data)
        this.setState({
          emotions:data.data,
          emotion:'secondary_emotion'})
      })
    }
  }

  render() {
    if(this.state.primary_emotion) {
      this.setState({emotion:'secondary_emotion'})
    }
    return (
      <div className="App">
      <h1>Mudl</h1>
        {
          this.state.emotions.map((item) =>{
            return (<Ebutton onClick={(e) => {this.handleClick(e,item)}} key={item[this.state.emotion]} name={item[this.state.emotion]}></Ebutton>)
          })
        }
        <Ebutton key = {'reset'} name = {'Go to main screen'} onClick={()=>{this.resetClick()}}></Ebutton>
      </div>
    );
  }


}
export default APP;
