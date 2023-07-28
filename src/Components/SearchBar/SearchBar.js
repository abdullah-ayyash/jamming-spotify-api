import './SearchBar.css';
import React from 'react';

export class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = {
            term: ''
        }
    }
    
    search(){
        this.props.onSearch(this.state.term);
        this.setState({
            term: ''
        })
    }
    
    handleTermChange(e){
        this.setState({
            term: e.target.value
        },()=>{
            localStorage.setItem('searchTerm',this.state.term);
        })
        
    }
    componentDidMount(){
        this.setState({
            term: localStorage.getItem('searchTerm')
        })
    }

    
    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} value={this.state.term} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}