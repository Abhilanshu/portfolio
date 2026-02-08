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

            {/* Credits */}
            <div className="credits">
                <span>Inspired by </span>
                <a href="https://bruno-simon.com" target="_blank" rel="noopener noreferrer">
                    Bruno Simon
                </a>
            </div>

            {/* Social Links Panel */}
            <div className="socials-panel">
                <h3>Socials</h3>
                <ul>
                    <li><a href="mailto:simon.bruno.77@gmail.com">Mail</a></li>
                    <li><a href="https://x.com/bruno_simon" target="_blank" rel="noreferrer">X (Twitter)</a></li>
                    <li><a href="https://github.com/brunosimon" target="_blank" rel="noreferrer">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/simonbruno77/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                    <li><a href="https://element-3.com" target="_blank" rel="noreferrer">Elements</a></li>
                </ul>
            </div>
        </div>
    )
}
