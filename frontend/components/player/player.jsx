import React from 'react';
import ReactPlayer from 'react-player';
import { ProgressBar, VolumeSlider, FormattedTime } from 'react-player-controls';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: this.props.playbackData.progress.played };
    this.setVolume = this.setVolume.bind(this);
    this.ref = this.ref.bind(this);
    this.onSeekEnd = this.onSeekEnd.bind(this);
    this.seeking = this.seeking.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentWillRecieveProps(nextProps) {
    this.setState
  }

  updateProgress(p){
    this.props.updateProgress(p);
    if (!this.state.seeking) {
      this.setState({progress: p.played});
    }
  }

  onSeekEnd() {
    this.player.seekTo(this.state.progress);
    this.setState({ seeking: false });
  }

  seeking(value) {
    this.setState({ progress: value, seeking: true });
  }

  setVolume(volume) {
    this.props.setVolume(parseFloat(volume));
  }

  ref(player) {
    this.player = player;
  }

  render() {
    const { playing, volume, progress, duration } = this.props.playbackData;
    const { playSong, togglePause, setVolume, updateProgress, setDuration } = this.props
    const currentSong = this.props.currentSong;
    const playButton = (this.props.playbackData.playing) ?
                        <i className="fa fa-pause" aria-hidden="true"></i> :
                        <i className="fa fa-play" aria-hidden="true"></i>;

    if (this.props.currentSong) {
      return (
        <div className="player-container animated slideInUp">
          <div className="player">

            <div className="playback-controls">
              <button onClick={togglePause}
                className="play-btn">
                {playButton}
              </button>
            </div>

            <FormattedTime numSeconds={progress.playedSeconds}
              className="elapsed"/>

              <div className="slider-background">
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.0001"
                  value={this.state.progress}
                  onInput={e => this.seeking(parseFloat(e.target.value))}
                  onMouseUp={() => this.onSeekEnd()}
                  />
                <div className="slider-progress" style={{ width: `${this.state.progress * 100}%` }}>
                </div>
              </div>

            <FormattedTime numSeconds={duration}
              className="duration" />


            <div className="volume-nav">
              <div className="volume-popup">
                <VolumeSlider
                  volume={volume}
                  onVolumeChange={v => this.setVolume(v)}
                  isEnabled={true} />
              </div>

              <button className="volume-btn">
                <i className="fa fa-volume-down" aria-hidden="true"></i>
              </button>
            </div>

            <ReactPlayer url={currentSong.trackUrl}
              ref={this.ref}
              progressFrequency={50}
              playing={playing}
              onDuration={(d) => setDuration(d)}
              onProgress={(p) => this.updateProgress(p)}
              volume={volume}
              height={0}
              width={0}/>

          <div className="player-song-details">
            <img className="player-art" src={currentSong.imageUrl} />
            <div className="player-info">
              <div className="artist-name">{currentSong.artist}</div>
              <div className="song-name">{currentSong.title.slice(0,35)}</div>
            </div>
          </div>
        </div>
      </div>
      );
    } else {
      return <div></div>;
    }
  }
}



export default Player;
