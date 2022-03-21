import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './recall.css';

import unansweredIcon from '../assets/imgs/unanswered-icon.png';
import rightIcon from '../assets/imgs/right-icon.png';
import maybeIcon from '../assets/imgs/maybe-icon.png';
import wrongIcon from '../assets/imgs/wrong-icon.png';

import partyIcon from '../assets/imgs/party.png';
import sadIcon from '../assets/imgs/sad.png';

const icons = {
	unanswered: unansweredIcon,
	right: rightIcon,
	maybe: maybeIcon,
	wrong: wrongIcon,
};

export default function Recall({ setRecallState, cards, goal, zapImg }) {
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		shuffleArray(cards);
	}, []);

	return (
		<div className="container-recall">
			<header>
				<img src={zapImg} alt="zap img" />
				<h1>ZapRecall</h1>
			</header>

			<main>
				{cards.map((card, index) => (
					<Card
						key={card.toString + index}
						id={index + 1}
						question={card.question}
						answer={card.answer}
						answersState={{ array: answers, set: setAnswers }}
						icons={icons}
					/>
				))}
			</main>

			<footer>
				{answers.length < cards.length ? <ProgressTracker /> : <FinishedMessage />}
				<div className="answer-icons">{answers.map((answer) => getAnswerIcon(answer))}</div>
				<RestartButton />
			</footer>
		</div>
	);


	function ProgressTracker() {
		return <h2>{`${answers.length}/${cards.length} Concluídos`}</h2>;
	}

	function FinishedMessage() {
		const correct = correctAnsersCount();
		const won = correct >= goal;
		return (
			<>
				<div className="finished-message">
					<img src={won ? partyIcon : sadIcon} alt="img" />
					<h3>{won ? 'PARABÉNS!' : 'PUTZ!'}</h3>
				</div>
				<p>
					{won
						? `Você acertou ${correct} zaps!`
						: 'Ainda faltaram alguns... Mas não desanime!'}
				</p>
			</>
		);
	}

	function RestartButton() {
		return (
			<>
				{answers.length === cards.length ? (
					<button className="restart" onClick={restartRecall}>
						Reiniciar Recall
					</button>
				) : (
					''
				)}
			</>
		);
	}


	function correctAnsersCount() {
		return answers.filter((answer) => answer.status === 'right').length;
	}

	function restartRecall() {
		setRecallState(false);
		setAnswers([]);
	}

	function getAnswerIcon(answer) {
		return <img src={icons[answer.status]} alt="icon" />;
	}

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
}
