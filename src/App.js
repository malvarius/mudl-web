import React from 'react';
import './App.css';
import Ebutton from './Components/Ebutton/Ebutton';
import API from './APIRequests/API';
import MantraPage from './Components/MantraPage/MantraPage'

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
// on mount gets initial moods
  componentDidMount(){
    API.getMoods()
    .then((data) => {
      // console.log(data.data)
      this.setState({emotions:data.data})
    })
  }
  // gets new mantra on on click event
  newMantra(id){
    API.getMantra(id)
      .then((data) => {
        let json =data.data
        this.setState({mantra: {
          id: json.id,
          mantra: json.mantra,
          advice: json.advice.replace(/''/g, "'"),
          def: json.tertiary_emotion_def || json.secondary_emotion_def,
          primary_emotion: json.primary_emotion,
          secondary_emotion: json.secondary_emotion,
          tertiary_emotion: json.tertiary_emotion,

        }})
          this.setState({emotion:'mantra_page'})
      })
  }
  resetClick(){
    API.getMoods()
    .then((data) => {
      this.setState({emotions:data.data, emotion:'primary_emotion'})
    })
  }
  // click handler which will either get the next emotion or generate the mantra page and update state accordingly
  handleClick(e,item){
    if(item.tertiary_emotion){
      this.newMantra(item.id)
    }else if(item.secondary_emotion){
      API.getMoods(item.primary_emotion,item.secondary_emotion)
      .then((data) => {
        this.setState({emotions:data.data, 
          emotion:'tertiary_emotion'})
      })
    }else{
      API.getMoods(item.primary_emotion)
      .then((data) => {
        this.setState({
          emotions:data.data,
          emotion:'secondary_emotion'})
      })
    }
  }

  render() {
    // conditional render to show mantra vs button, narrowed button down to variable state called emotion as compared to app version
    if(this.state.emotion==='mantra_page'){
      // console.log(this.state.mantra)
      // info is placeholder for this.state.mantra for ease of use
      let info = this.state.mantra
      return(
        <div>
        <Ebutton key = {'reset'} name = {'Go to main screen'} onClick={()=>{this.resetClick()}}></Ebutton>
        <Ebutton name = {'New Mantra'} onClick = {(e) => {this.newMantra(this.state.mantra.id)}}></Ebutton>
        <MantraPage emotion = {info.tertiary_emotion} advice = {info.advice} mantra = {info.mantra}></MantraPage>
        </div>
      )
    }else{
      return (
      <div className="App">
      <h1>Mudl</h1>
        {
          this.state.emotions.map((item) =>{
            return (<Ebutton onClick={(e) => {this.handleClick(e,item)}} def={item.tertiary_emotion_def||item.secondary_emotion_def} key={item[this.state.emotion]} name={item[this.state.emotion]}></Ebutton>)
          })
        }
        <Ebutton key = {'reset'} name = {'Go to main screen'} onClick={()=>{this.resetClick()}}></Ebutton>
      </div>
    );
      }
  }


}
export default APP;
