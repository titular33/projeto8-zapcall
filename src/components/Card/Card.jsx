
import { useState } from 'react';
import './card.css';

import turnArrow from '../assets/imgs/setinha.png';

export default function Card({ id, question, answer, answersState, icons }) {
	const [height, setHeight] = useState(0);
	const [rotated, setRotated] = useState(false);
	const [answeredStatus, setAnsweredStatus] = useState('unanswered');

	function toggleExpand(e) {
		if (!rotated && answeredStatus === 'unanswered') setHeight(height === 0 ? 'auto' : 0);
	}

	function turnCard(e) {
		e.stopPropagation();
		setRotated(true);
	}

	return (
		<div
			className={rotated ? 'card rotateRight' : 'card'}
			onClick={rotated ? null : (e) => toggleExpand(e)}
		>
			{height === 0 ? <CardHeader /> : ''}


				{rotated ? <CardBackFace /> : <CardFrontFace />}

		</div>
	);

	function CardHeader() {
		return (
			<header className={answeredStatus}>
				<h3>
					<span
						className={answeredStatus !== 'unanswered' ? 'strike-animation' : ''}
					>{`Pergunta ${id}`}</span>
				</h3>
				<img src={icons[answeredStatus]} alt="" />
			</header>
		);
	}

	function CardFrontFace() {
		return (
			<div>
				<h2>{question}</h2>
				<img className="turn-arrow" onClick={turnCard} src={turnArrow} alt="set" />
			</div>
		);
	}

	function CardBackFace() {
		return (
			<div className="card-back-face">
				<h2>{answer}</h2>
				<div className="recall-buttons">
					<button className="wrong" onClick={() => setAnswer('wrong')}>
						Não lembrei
					</button>
					<button className="maybe" onClick={() => setAnswer('maybe')}>
						Quase não lembrei
					</button>
					<button className="right" onClick={() => setAnswer('right')}>
						Zap!
					</button>
				</div>
			</div>
		);
	}

	function setAnswer(status) {
		setRotated(false);
		setHeight(0);
		setAnsweredStatus(status);
		answersState.set([...answersState.array, { status: status }]);
	}
}