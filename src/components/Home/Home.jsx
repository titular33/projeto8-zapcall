import { useState } from 'react';
import Recall from '../Recall/Recall';

import './home.css';
import zapImg from '../assets/imgs/zap.png';

import { decks } from '../../decks';

export default function Home() {
	const [recallStarted, setRecallStarted] = useState(false);
	const [deck, setDeck] = useState(decks[0]);
	const [zapGoal, setZapGoal] = useState(0);

	const cards = deck.cards;

	const startRecall = () => {
		if (zapGoal > 0 && zapGoal <= cards.length) {
			setRecallStarted(true);
		}
	};

	return (
		<>
			{recallStarted ? (
				<Recall
					setRecallState={setRecallStarted}
					cards={cards}
					goal={zapGoal}
					zapImg={zapImg}
				/>
			) : (
				<Greeting />
			)}
		</>
	);

	function Greeting() {
		return (
			<div className="container">
				<img src={zapImg} alt="zap img" />
				<h1>ZapRecall</h1>

				<select name="deck-select" id="deck-select" onChange={handleDeckSelect}>
					<DeckOptions />
				</select>

				<input
					type="text"
					id="zap-goal-input"
					value={zapGoal > 0 ? zapGoal : ''}
					placeholder="Digite sua meta de zaps"
					onChange={handleZapInputChange}
				/>
				<button onClick={startRecall}>Iniciar Recall</button>
			</div>
		);
	}

	function DeckOptions() {
		return (
			<>
				{decks.map((deckIt, index) => {
					{
						return deck.title === deckIt.title ? (
							<option selected id={index} value={JSON.stringify(deckIt)} key={index}>
								{deckIt.title}
							</option>
						) : (
							<option id={index} value={JSON.stringify(deckIt)} key={index}>
								{deckIt.title}
							</option>
						);
					}
				})}
			</>
		);
	}

	function handleZapInputChange(event) {
		setZapGoal(event.target.value);
	}

	function handleDeckSelect(event) {
		setDeck(JSON.parse(event.target.value));
	}
}