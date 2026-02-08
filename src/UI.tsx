import { useGameStore } from './store'
import './UI.css'

export function UI() {
    const { introComplete, bowlingScore, showControls, toggleControls, resetPlayer } = useGameStore()

    if (!introComplete) return null

    return (
        <div className="ui-container">
            {/* Control hints - toggle visibility */}
            {showControls && (
                <div className="control-hints">
                    <div className="hint-keys">
                        <span className="hint-key">W</span>
                        <div className="hint-key-row">
                            <span className="hint-key">A</span>
                            <span className="hint-key">S</span>
                            <span className="hint-key">D</span>
                        </div>
                    </div>
                    <span className="hint-text">Move</span>
                </div>
            )}

            {/* Score display */}
            {bowlingScore > 0 && (
                <div className="score-display">
                    <span className="score-label">Pins:</span>
                    <span className="score-value">{bowlingScore}</span>
                </div>
            )}

            {/* Bottom buttons */}
            <div className="ui-buttons">
                <button className="ui-btn" onClick={toggleControls} title="Toggle Controls">
                    {showControls ? '🎮' : '❓'}
                </button>
                <button className="ui-btn reset-btn" onClick={resetPlayer} title="Reset Position">
                    🔄
                </button>
            </div>



            {/* Social Links Panel */}
            <div className="socials-panel">
                <h3>Socials</h3>
                <ul>
                    <li><a href="mailto:abhilanshuvittolia22@gmail.com">Email Me</a></li>
                    <li><a href="https://x.com/abhilanshu" target="_blank" rel="noreferrer">My X (Twitter)</a></li>
                    <li><a href="https://github.com/Abhilanshu" target="_blank" rel="noreferrer">My GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/abhilanshu-vittolia-33a161359/" target="_blank" rel="noreferrer">My LinkedIn</a></li>
                    <li><a href="https://element-3.com" target="_blank" rel="noreferrer">Elements</a></li>
                </ul>
            </div>
        </div>
    )
}
