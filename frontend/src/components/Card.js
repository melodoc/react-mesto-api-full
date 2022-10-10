import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card({ card, onClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const handleImageClick = () => {
    onClick(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isOwn = card.owner?._id === currentUser?._id;
  const isLiked = card.likes.some((i) => i?._id === currentUser?._id);

  const cardDeleteButtonClassName = isOwn
    ? 'card__trash-button'
    : 'card__trash-button_state_hidden';

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_state_active' : ''
  }`;

  return (
    <>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        title="Удалить"
        onClick={handleDeleteClick}
      />
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={handleImageClick}
      />
      <div className="card__description">
        <h2 className="card__header">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            title="Нравится"
            onClick={handleCardLike}
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </>
  );
}
