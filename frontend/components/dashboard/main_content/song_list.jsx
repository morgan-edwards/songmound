import React from 'react';
import SongListItemContainer from './song_list_item_container';

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const songs = Object.values(this.state.songs).map(song => {
      if (song) return <SongListItemContainer key={song.id} song={song} />;
      }
    );

    return (
      <div className="song-list">
        <ul>
          {songs}
        </ul>
      </div>
    );
  }
}

export default SongList;
