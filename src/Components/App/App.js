// import logo from './logo.svg';
import React from 'react'
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [
        {
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
          id: 15
        },
        {
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          id: 16
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: 17
        }
      ],
      playlistName: 'Pop',
      playlistTracks: [
        {name: 'name4',artist: 'artist4',album: 'album4', id: 35},
        {name: 'name5',artist: 'artist5',album: 'album5', id: 45},
        {name: 'name6',artist: 'artist6',album: 'album6', id: 65}
      ]
    }

  }

  addTrack(track){
    let currentId = track.id;
    for(let item of this.state.playlistTracks){
      if(item.id === currentId){
        return;
      }
    }
    this.setState(prevState => ({
      playlistTracks: [...prevState.playlistTracks,track]
    }))
  }

  removeTrack(track){
    let itemId = track.id
    let newTracks = this.state.playlistTracks.filter(item => item.id !== itemId);
    this.setState({
      playlistTracks: newTracks
    })
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    let name = this.state.playlistName
    let playlistTracks = this.state.playlistTracks;
    Spotify.savePlaylist(name,playlistTracks)

    this.setState({
      playlistName: '',
      playlistTracks: []
    })
  }

  search(searchTerm){
    Spotify.getAccessToken();
    let data = Spotify.search(searchTerm).then(result =>{
      this.setState({
        searchResults: result
      })

    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
      );
  }

}

export default App;
