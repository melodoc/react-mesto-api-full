import { inputType } from '../constants';

export function Input({ name, handleChange, value, type }) {
  return (
    <label className="entry__field">
      <input
        id={name}
        onChange={handleChange}
        value={value}
        name={name}
        className="entry__input"
        placeholder={name}
        autoComplete="off"
        required
        minLength={2}
        maxLength={type === inputType.EMAIL ? 200 : 40}
        type={type}
      />
      <span className={`${name}-error`} />
    </label>
  );
}
