import React, { useState, useEffect } from 'react';
import { Users, Play, Pause, X, Lock } from 'lucide-react';
import ReactPlayer from 'react-player';
import { v4 as uuidv4 } from 'uuid';
import { useCredits } from '../hooks/useCredits';

interface WatchTogetherProps {
  movieUrl?: string;
}

const WATCH_ROOM_COST = 10;

const WatchTogether: React.FC<WatchTogetherProps> = ({ movieUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }) => {
  const [roomId, setRoomId] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const { credits, addCredits } = useCredits();

  useEffect(() => {
    const savedRoomId = localStorage.getItem('watchTogetherRoomId');
    if (savedRoomId) {
      setRoomId(savedRoomId);
      setIsInRoom(true);
      setIsHost(localStorage.getItem('isHost') === 'true');
    }
  }, []);

  const createRoom = () => {
    if (credits < WATCH_ROOM_COST) {
      setError(`Insufficient credits. You need ${WATCH_ROOM_COST} credits to create a watch room.`);
      return;
    }

    const newRoomId = uuidv4().slice(0, 8);
    setRoomId(newRoomId);
    setIsHost(true);
    setIsInRoom(true);
    localStorage.setItem('watchTogetherRoomId', newRoomId);
    localStorage.setItem('isHost', 'true');
    
    // Deduct credits
    addCredits(-WATCH_ROOM_COST, 'Created watch room');
    setError('');
  };

  const joinRoom = () => {
    if (joinRoomId) {
      setRoomId(joinRoomId);
      setIsHost(false);
      setIsInRoom(true);
      localStorage.setItem('watchTogetherRoomId', joinRoomId);
      localStorage.setItem('isHost', 'false');
      setError('');
    }
  };

  const leaveRoom = () => {
    setRoomId('');
    setIsHost(false);
    setIsInRoom(false);
    localStorage.removeItem('watchTogetherRoomId');
    localStorage.removeItem('isHost');
    setError('');
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleSeek = (seconds: number) => {
    console.log(`Seeked to: ${seconds}s`);
  };

  return (
    <div className="bg-blue-900 rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="h-6 w-6 text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Watch Together</h2>
        </div>
        {isInRoom && (
          <button
            onClick={leaveRoom}
            className="text-blue-300 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Credits Info */}
      <div className="bg-blue-800/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-blue-300">Available Credits</div>
          <div className="text-white font-bold">{credits}</div>
        </div>
        <div className="text-sm text-blue-300 mt-2">
          Cost to create room: {WATCH_ROOM_COST} credits
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!isInRoom ? (
        <div className="space-y-6">
          <div>
            <button
              onClick={createRoom}
              disabled={credits < WATCH_ROOM_COST}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center ${
                credits < WATCH_ROOM_COST ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {credits < WATCH_ROOM_COST ? (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Insufficient Credits
                </>
              ) : (
                <>
                  <Users className="h-5 w-5 mr-2" />
                  Create Watch Room ({WATCH_ROOM_COST} Credits)
                </>
              )}
            </button>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="flex-1 bg-blue-800/50 border border-blue-700 rounded-lg px-4 py-2 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={joinRoom}
              disabled={!joinRoomId}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-800/50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm">Room ID</p>
              <p className="text-white font-mono">{roomId}</p>
            </div>
            <div className="text-blue-300 text-sm">
              {isHost ? 'Host' : 'Participant'}
            </div>
          </div>

          <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
            <ReactPlayer
              url={movieUrl}
              width="100%"
              height="100%"
              playing={playing}
              controls={true}
              onPlay={handlePlay}
              onPause={handlePause}
              onProgress={handleProgress}
              onSeek={handleSeek}
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setPlaying(!playing)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center"
            >
              {playing ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Play
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchTogether;