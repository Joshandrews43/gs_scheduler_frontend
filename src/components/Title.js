import React, {Component} from 'react' ;
import styled from "styled-components" ;

const TitleStyle = styled.div`
    text-align: center ;
    font-family: optima ;
    color: #003660 ;
    text-shadow: 0 0 5px #f4e242, 0 0 10px #f4e242,
             0 0 20px #f4e242, 0 0 30px #f4e242,
             0 0 40px #f4e242;
    margin-bottom: 50px;
` ;
class Title extends Component{
    render(){
        return(
            <TitleStyle>
                <h1>GS Scheduler</h1>
            </TitleStyle>
        ) 
    }
}

export default Title ;