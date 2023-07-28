import React from 'react'
import './TrackList.css'
import {Track} from '../Track/Track'

export class TrackList extends React.Component{

    render(){
        if(this.props.tracks.length){
            return (
                <div className="TrackList">
                    {
                    this.props.tracks.map(item => <Track track={item} key={item.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />)
                    }

                </div>
            )
        }
        else{
            
        }
    }
}